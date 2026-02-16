import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const getPageContent = query({
    args: { pageId: v.string() },
    handler: async (ctx, args) => {
        const content = await ctx.db
            .query("pageContent")
            .withIndex("by_page", (q) => q.eq("pageId", args.pageId))
            .collect();
        const contentMap = {};
        for (const item of content) {
            contentMap[item.sectionId] = item.content;
        }
        return contentMap;
    },
});
export const getSectionContent = query({
    args: { pageId: v.string(), sectionId: v.string() },
    handler: async (ctx, args) => {
        const content = await ctx.db
            .query("pageContent")
            .withIndex("by_page_and_section", (q) => q.eq("pageId", args.pageId).eq("sectionId", args.sectionId))
            .unique();
        return content?.content ?? null;
    },
});
export const updateSectionContent = mutation({
    args: {
        pageId: v.string(),
        sectionId: v.string(),
        content: v.any(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("pageContent")
            .withIndex("by_page_and_section", (q) => q.eq("pageId", args.pageId).eq("sectionId", args.sectionId))
            .unique();
        if (existing) {
            await ctx.db.patch(existing._id, {
                content: args.content,
            });
            return existing._id;
        }
        else {
            const id = await ctx.db.insert("pageContent", {
                pageId: args.pageId,
                sectionId: args.sectionId,
                content: args.content,
            });
            return id;
        }
    },
});
export const getAllTeamMembers = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("teamMembers")
            .withIndex("by_order")
            .collect();
    },
});
export const createTeamMember = mutation({
    args: {
        name: v.string(),
        role: v.string(),
        bio: v.string(),
        expertise: v.array(v.string()),
        imageUrl: v.optional(v.string()),
        linkedinUrl: v.optional(v.string()),
        websiteUrl: v.optional(v.string()),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("teamMembers", args);
    },
});
export const updateTeamMember = mutation({
    args: {
        id: v.id("teamMembers"),
        name: v.string(),
        role: v.string(),
        bio: v.string(),
        expertise: v.array(v.string()),
        imageUrl: v.optional(v.string()),
        linkedinUrl: v.optional(v.string()),
        websiteUrl: v.optional(v.string()),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
        return id;
    },
});
export const deleteTeamMember = mutation({
    args: { id: v.id("teamMembers") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
// Materials CRUD functions
export const getAllMaterials = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("materials")
            .withIndex("by_order")
            .collect();
    },
});
export const createMaterial = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        contentType: v.union(v.literal("video"), v.literal("presentation"), v.literal("pdf")),
        url: v.string(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("materials", args);
    },
});
export const updateMaterial = mutation({
    args: {
        id: v.id("materials"),
        title: v.string(),
        description: v.string(),
        contentType: v.union(v.literal("video"), v.literal("presentation"), v.literal("pdf")),
        url: v.string(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
        return id;
    },
});
export const deleteMaterial = mutation({
    args: { id: v.id("materials") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
