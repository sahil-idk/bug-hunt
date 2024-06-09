import { ConvexError, v } from 'convex/values';
import { action, internalQuery, mutation, MutationCtx, query, QueryCtx } from './_generated/server';
import internal, { api } from './_generated/api'
import OpenAI from 'openai';
import { Id } from './_generated/dataModel';
import { AnthropicVertex } from '@anthropic-ai/vertex-sdk';
import Anthropic from '@anthropic-ai/sdk';


// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
});


export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getDocument = query({
  args: {
    documentId: v.id('documents')
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      return null;
    }

    if (document.tokenIdentifier !== userId) {
      return null;
    }

    return { ...document, fileUrl: await ctx.storage.getUrl(document.fileId) };

  }

})

export const getDocuments = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    console.log(userId);
    if (!userId) {
      return [];
    }



    return await ctx.db.query('documents').withIndex('by_tokenIdentifier', (q) => q.eq("tokenIdentifier", userId)).collect();
  }
})
export const createDocument = mutation({
  args: {
    title: v.string(),
    fileId: v.id('_storage')
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    console.log(userId);
    if (!userId) {
      throw new ConvexError('User not authenticated');
    }



    await ctx.db.insert('documents', {
      title: args.title,
      tokenIdentifier: userId,
      fileId: args.fileId

    });

  }
});


export const askQuestion = action({

  args: {
    question: v.string(),
    documentId: v.id('documents'),

  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    console.log(userId);
    if (!userId) {
      throw new ConvexError('User not authenticated');
    }
    const document = await ctx.runQuery(
      api.documents.getDocument,
      {
        documentId: args.documentId,
      }
    );
    if(!document){
      throw new ConvexError('Document not found');
    }

    const file = await ctx.storage.get(document.fileId);
    if(!file){
      throw new ConvexError('File not found');
    }
    const text = await file.text();
    console.log(text);

    
const msg = await anthropic.messages.create({
  model: "claude-3-opus-20240229",
  max_tokens: 1024,
  messages: [
    {
      role: "user",
      content: `please answer this question: ${args.question.trim()}`,
    },
    {
      role: "assistant",
      content: `Here is a text file: ${text.trim()}`,
    }
  ],
});


}
})

