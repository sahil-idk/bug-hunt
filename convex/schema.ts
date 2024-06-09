import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        tokenIdentifier: v.optional(v.string()),
        fileId: v.id('_storage')

    }).index('by_tokenIdentifier', ['tokenIdentifier']),

    organizations: defineTable({
        orgName: v.string(),
        orgGithub: v.string(),
        orgDescription: v.string(),
      
        tokenIdentifier: v.string()
    }).index('by_tokenIdentifier', ['tokenIdentifier'])

})

