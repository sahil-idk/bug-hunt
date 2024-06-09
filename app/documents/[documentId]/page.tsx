'use client'
import ChatPanel from '@/components/ChatPanel';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import React from 'react'

const page = ({params} : {
    params: {
        documentId: Id<'documents'>
    }
}) => {
    
    console.log(params.documentId);
   const document = useQuery(api.documents.getDocument, {documentId: params.documentId});

   if(!document){
       return <div>Document not found</div>
   }
  return (
    <div>
      Document description 
      <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">{document?.title}</h1>
            </div>
            <div>
            {document.fileUrl && (
                    <iframe
                      className="w-full h-full"
                      src={document.fileUrl}
                    />
                  )}

            </div>
            <ChatPanel documentId={document._id}/>
    </div>
  )
}

export default page
