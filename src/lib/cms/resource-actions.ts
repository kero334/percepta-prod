"use server";

import { createClient } from "@/lib/supabase/server";
import { verifyAdminAccess } from "./auth";
import crypto from "crypto";

export async function saveResourceRevision(data: any) {
  const { authorized, user } = await verifyAdminAccess();
  if (!authorized) throw new Error("Unauthorized");

  const supabase = await createClient();
  const isNew = data.isNew;
  delete data.isNew;

  // Insert or Update the resource
  let resource;
  if (isNew) {
    const { data: newRes, error } = await supabase
      .from("resources")
      .insert({
        title: data.title,
        slug: data.slug,
        content_type: data.content_type,
        theme: data.theme,
        evidence_level: data.evidence_level,
        status: data.status,
        is_hidden: data.is_hidden,
        is_featured: data.is_featured,
        author: data.author,
        description: data.description,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        rich_content: data.rich_content,
        published_at: data.status === "published" ? new Date().toISOString() : null,
      })
      .select()
      .single();
    
    if (error) throw error;
    resource = newRes;
  } else {
    // Determine if slug changed for resource_redirects
    const { data: oldRes } = await supabase.from("resources").select("slug, version_hash").eq("id", data.id).single();
    
    // OPTIMISTIC CONCURRENCY CHECK
    if (oldRes && oldRes.version_hash && data.version_hash && oldRes.version_hash !== data.version_hash) {
      throw new Error("CONCURRENCY_CONFLICT");
    }

    if (oldRes && oldRes.slug !== data.slug) {
      // Insert redirect
      const { data: newRedirect } = await supabase.from("resource_redirects").insert({
        resource_id: data.id,
        old_slug: oldRes.slug,
        new_slug: data.slug
      }).select().single();

      if (newRedirect) {
        // Audit log
        await supabase.from("audit_logs").insert({
          user_id: user?.id,
          action_type: "CREATE_AUTO_REDIRECT",
          table_name: "resource_redirects",
          record_id: newRedirect.id,
          new_data: { old_slug: oldRes.slug, new_slug: data.slug, resource_id: data.id }
        });
      }
    }

    const { data: updatedRes, error } = await supabase
      .from("resources")
      .update({
        title: data.title,
        slug: data.slug,
        content_type: data.content_type,
        theme: data.theme,
        evidence_level: data.evidence_level,
        status: data.status,
        is_hidden: data.is_hidden,
        is_featured: data.is_featured,
        author: data.author,
        description: data.description,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        rich_content: data.rich_content,
        updated_at: new Date().toISOString(),
        published_at: data.status === "published" ? new Date().toISOString() : null,
      })
      .eq("id", data.id)
      .select()
      .single();
      
    if (error) throw error;
    resource = updatedRes;
  }

  // Revision handling: Only create if meaningful changes occurred
  // We'll compare the hash of the new rich_content + title to the latest revision
  const snapshotData: any = { ...resource };
  // Remove fields that constantly change or aren't meaningful for content history
  delete snapshotData.updated_at;
  delete snapshotData.created_at;
  delete snapshotData.last_reviewed_at;
  
  const contentHash = crypto.createHash('sha256').update(JSON.stringify(snapshotData)).digest('hex');

  const { data: lastRevision } = await supabase
    .from("resource_revisions")
    .select("snapshot")
    .eq("resource_id", resource.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  let isIdentical = false;
  if (lastRevision && lastRevision.snapshot) {
    const oldSnapshotData = { ...(lastRevision.snapshot as any) };
    delete oldSnapshotData.updated_at;
    delete oldSnapshotData.created_at;
    delete oldSnapshotData.last_reviewed_at;
    const oldHash = crypto.createHash('sha256').update(JSON.stringify(oldSnapshotData)).digest('hex');
    if (oldHash === contentHash) {
      isIdentical = true;
    }
  }

  if (!isIdentical || isNew) {
    // Generate an automatic version number simply based on time or UUID for now
    const version = isNew ? "v1.0" : `v1.${Date.now()}`;
    
    // Create new revision
    await supabase.from("resource_revisions").insert({
      resource_id: resource.id,
      created_by: user?.id,
      snapshot: resource,
      version: version,
      change_type: isNew ? "major" : "minor",
      commit_message: isNew ? "Initial creation" : "Content update"
    });

    // Update version_hash on the main record
    await supabase.from("resources").update({ version_hash: contentHash }).eq("id", resource.id);
    resource.version_hash = contentHash;
  }

  return resource;
}

export async function getResourcesWithAdvancedSearch(query: string, filters: any = {}) {
  const supabase = await createClient();
  let dbQuery = supabase.from("resources").select("*");

  // Basic filters
  if (filters.status) dbQuery = dbQuery.eq("status", filters.status);
  if (filters.content_type) dbQuery = dbQuery.eq("content_type", filters.content_type);
  if (filters.theme) dbQuery = dbQuery.eq("theme", filters.theme);
  if (filters.evidence_level) dbQuery = dbQuery.eq("evidence_level", filters.evidence_level);
  if (filters.author) dbQuery = dbQuery.ilike("author", `%${filters.author}%`);

  if (query) {
    // ts_rank search using websearch_to_tsquery for simple human input
    // The query syntax in Supabase JS for ranking requires either RPC or using the textSearch modifier carefully.
    // Note: standard Supabase textSearch does not sort by rank automatically unless configured in an RPC.
    // We will use standard textSearch which orders by rank under the hood or we fetch and sort.
    dbQuery = dbQuery.textSearch("search_vector", query, { type: "websearch" });
  }

  const { data, error } = await dbQuery.order("published_at", { ascending: false, nullsFirst: false });
  if (error) throw error;
  
  return data;
}
