import { mutation } from "./_generated/server";
export const seedInitialMaterials = mutation({
    args: {},
    handler: async (ctx) => {
        const existing = await ctx.db.query("materials").collect();
        if (existing.length >= 3) {
            console.log("Materials already seeded");
            return { message: "Materials already exist", count: existing.length };
        }
        const initialMaterials = [
            {
                title: "Concept Overview Video",
                description: "A short visual explanation of the Percepta concept, problem space, and proposed solution, created to clarify the idea for evaluators and partners.",
                contentType: "video",
                url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                order: 1,
            },
            {
                title: "Pitch Deck",
                description: "A structured presentation outlining the problem, solution approach, use case focus, and pilot vision behind Percepta.",
                contentType: "presentation",
                url: "https://docs.google.com/presentation/d/1example/edit",
                order: 2,
            },
            {
                title: "Technical & Research Document",
                description: "A detailed document covering system logic, design principles, safety considerations, and early technical assumptions. This document is intended for reviewers seeking deeper technical understanding.",
                contentType: "pdf",
                url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                order: 3,
            },
        ];
        const materialsToAdd = initialMaterials.slice(existing.length);
        for (const material of materialsToAdd) {
            await ctx.db.insert("materials", material);
        }
        return {
            message: "Initial materials seeded successfully",
            added: materialsToAdd.length,
            total: existing.length + materialsToAdd.length
        };
    },
});
