import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getOrganizations = query({

  async handler(ctx) {

    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    console.log(userId);
    if (!userId) {
      return [];
    }

    return await ctx.db.query('organizations').withIndex('by_tokenIdentifier', (q) => q.eq("tokenIdentifier", userId)).collect();

  }


})

export const getOrganization = query({
  args: {
    orgId: v.id('organizations')
  },
  async handler(ctx, args) {
  
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    const organization = await ctx.db.get(args.orgId);

    if(!organization){
      return null;
    }
    if(organization.tokenIdentifier !== userId){
      return null;
    }

    return organization;
}
})
export const createOrganization = mutation({
  args: {
    orgName: v.string(),
    orgGithub: v.string(),
    orgDescription: v.string(),

  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    console.log(userId);
    if (!userId) {
      throw new ConvexError('User not authenticated');
    }

    await ctx.db.insert('organizations', {
      orgName: args.orgName,
      orgGithub: args.orgGithub,
      orgDescription: args.orgDescription,

      tokenIdentifier: userId
    });



  }

})