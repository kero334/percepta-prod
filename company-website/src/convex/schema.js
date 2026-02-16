import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
// default user roles. can add / remove based on the project as needed
export const ROLES = {
    ADMIN: "admin",
    USER: "user",
    MEMBER: "member",
};
export const roleValidator = v.union(v.literal(ROLES.ADMIN), v.literal(ROLES.USER), v.literal(ROLES.MEMBER));
const schema = defineSchema({
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify
    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
        name: v.optional(v.string()), // name of the user. do not remove
        image: v.optional(v.string()), // image of the user. do not remove
        email: v.optional(v.string()), // email of the user. do not remove
        emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
        isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove
        role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify
    // Website content management tables
    pageContent: defineTable({
        pageId: v.string(),
        sectionId: v.string(),
        content: v.any(),
    })
        .index("by_page", ["pageId"])
        .index("by_page_and_section", ["pageId", "sectionId"]),
    teamMembers: defineTable({
        name: v.string(),
        role: v.string(),
        bio: v.string(),
        expertise: v.array(v.string()),
        imageUrl: v.optional(v.string()),
        linkedinUrl: v.optional(v.string()),
        websiteUrl: v.optional(v.string()),
        order: v.number(),
    }).index("by_order", ["order"]),
    materials: defineTable({
        title: v.string(),
        description: v.string(),
        contentType: v.union(v.literal("video"), v.literal("presentation"), v.literal("pdf")),
        url: v.string(),
        order: v.number(),
    }).index("by_order", ["order"])
}, {
    schemaValidation: false,
});
export default schema;
