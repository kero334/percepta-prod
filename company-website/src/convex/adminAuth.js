import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
export const isAdmin = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            return false;
        }
        const user = await ctx.db.get(userId);
        return user?.role === "admin";
    },
});
export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            return null;
        }
        return await ctx.db.get(userId);
    },
});
