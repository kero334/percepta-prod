import { mutation } from "./_generated/server";
export const seedInitialTeam = mutation({
    args: {},
    handler: async (ctx) => {
        // Get existing team members
        const existing = await ctx.db
            .query("teamMembers")
            .withIndex("by_order")
            .collect();
        // Get max order
        const maxOrder = existing.reduce((max, member) => Math.max(max, member.order), 0);
        // Only seed if we have fewer than 4 members
        if (existing.length >= 4) {
            return {
                message: "Team already has 4+ members. Skipping seed.",
                count: existing.length
            };
        }
        // Initial team members to add (excluding any that might already exist)
        const initialTeam = [
            {
                name: "Dr. Sarah Chen",
                role: "Co-Founder & CEO",
                bio: "AI researcher with 10+ years in computer vision and industrial safety systems. Previously led safety AI initiatives at a major manufacturing technology company.",
                expertise: ["Strategic Vision", "Product Direction", "Industrial Partnerships"],
                imageUrl: "",
                linkedinUrl: "",
                order: maxOrder + 1,
            },
            {
                name: "Alex Kumar",
                role: "Co-Founder & CTO",
                bio: "Software architect specializing in edge computing and real-time systems. Built scalable vision systems for autonomous operations in complex environments.",
                expertise: ["System Architecture", "Edge Computing", "Software Engineering"],
                imageUrl: "",
                linkedinUrl: "",
                order: maxOrder + 2,
            },
            {
                name: "Dr. Michael Torres",
                role: "Lead AI/ML Engineer",
                bio: "Ph.D. in Machine Learning with focus on explainable AI and contextual reasoning. Published researcher in spatial risk assessment and predictive safety systems.",
                expertise: ["Machine Learning", "Computer Vision", "Explainable AI"],
                imageUrl: "",
                linkedinUrl: "",
                order: maxOrder + 3,
            },
            {
                name: "Rachel Johnson",
                role: "Safety Systems Specialist",
                bio: "Industrial safety expert with 15+ years in manufacturing environments. Deep understanding of workplace hazards, compliance, and human factors in safety.",
                expertise: ["Industrial Safety", "Risk Assessment", "Compliance & Standards"],
                imageUrl: "",
                linkedinUrl: "",
                order: maxOrder + 4,
            },
        ];
        // Only add members we need
        const membersToAdd = initialTeam.slice(0, 4 - existing.length);
        const ids = [];
        for (const member of membersToAdd) {
            const id = await ctx.db.insert("teamMembers", member);
            ids.push(id);
        }
        return {
            message: "Successfully seeded team members",
            added: ids.length,
            total: existing.length + ids.length,
            ids,
        };
    },
});
export const clearAllTeamMembers = mutation({
    args: {},
    handler: async (ctx) => {
        const members = await ctx.db.query("teamMembers").collect();
        for (const member of members) {
            await ctx.db.delete(member._id);
        }
        return {
            message: "All team members cleared",
            count: members.length,
        };
    },
});
