'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createDocument } from '@/convex/documents'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { LoadingButton } from './loading-button'
import { Id } from '@/convex/_generated/dataModel'

const formSchema = z.object({
  title: z.string().min(2).max(250),
  file: z.instanceof(File)
})

const CreateDocumentForm = ({
  onUpload,
}: {
  onUpload: () => void
}) => {
  const createDocument = useMutation(api.documents.createDocument);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    //a wait for 10 secomd 


    console.log(values)
    const uploadUrl = await generateUploadUrl()
    console.log(uploadUrl)
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": values.file.type },
      body: values.file,
    });

    const {storageId} = await result.json()
    await createDocument({
      title: values.title,
      fileId:storageId as Id<'_storage'>
    })
    onUpload()
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Name </FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={({ field : {value,onChange, ...fieldProps} }) => (
              <FormItem>
                <FormLabel>File </FormLabel>
                <FormControl>
                  <Input 
                  
                  type='file'
                  accept='.xml,.doc,.txt' 
                  {...fieldProps} 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                  } }
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            isLoading={form.formState.isSubmitting}
            loadingText="Uploading..."
          >
            Upload
          </LoadingButton>
        </form>
      </Form>

    </div>
  )
}

export default CreateDocumentForm
