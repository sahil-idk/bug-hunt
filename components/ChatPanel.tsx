'use client'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useAction } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

type Props = {}

const ChatPanel = ({
  documentId
}: {
  documentId: Id<'documents'>
}) => {
const askQuestion = useAction(api.documents.askQuestion);

  return (
    <div>
      <div className="dark:bg-gray-900 bg-slate-100 flex flex-col gap-2 p-6 rounded-xl">
        <div className="h-[350px] overflow-y-auto space-y-3">
          <div className="dark:bg-slate-950 rounded p-3">
            AI: Ask any question using AI about this document below:
          </div>
          {/* {chats?.map((chat) => (
          <div
            className={cn(
              {
                "dark:bg-slate-800 bg-slate-200": chat.isHuman,
                "dark:bg-slate-950 bg-slate-300": !chat.isHuman,
                "text-right": chat.isHuman,
              },
              "rounded p-4 whitespace-pre-line"
            )} */}
          {/* >
            {chat.isHuman ? "YOU" : "AI"}: {chat.text}
          </div>
        ))} */}
        </div>

        <div className="flex gap-1">
          <form action=""
            onSubmit={async (e) => {
              e.preventDefault()
              ///call convex 
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const text = formData.get('text') as string;
              await askQuestion({
                question: text,
                documentId: documentId
              }).then(console.log);
             
            }}>
            <Input required name='text' />
            <Button type='submit'>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatPanel



