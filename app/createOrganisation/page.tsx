"use client"

import { z } from "zod"
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { useRouter } from "next/navigation"
type Props = {}

interface OrganizationDetails {
  name: string;
  description: string;
  public_repos: number;
  followers: number;
  html_url: string;
}

const CreateOrg = (props: Props) => {
    const createOrganisation = useMutation(api.organizations.createOrganization)
     const router = useRouter();
     const [query, setQuery] = useState('');
     const [results, setResults] = useState<OrganizationDetails | null>(null);

     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);

     useEffect(() => {
      const fetchData = async () => {
        const sanitizedQuery = query.replace(/\s+/g, ''); 
        if (sanitizedQuery.length < 3) {
          setResults(null);
          setError('');
          return;
        }
  
        setLoading(true);
        setError('');
        try {
          const response = await fetch(`https://api.github.com/orgs/${sanitizedQuery}`, {
            headers: {
              'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
              
            }
          });
  
          if (!response.ok) {
            console.log(response);
            throw new Error('Organization not found');
          }
  
          const data = await response.json();
          setResults(data);
          setError('');
        } catch (error) {
          setResults(null);
          setError('Organization not found');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [query]);

    const formSchema = z.object({
        orgName: z.string().min(2).max(50),
        orgGithub: z.string().min(2).max(50),
        orgDescription: z.string().min(2).max(50),

    })
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            orgName: '',
            orgGithub: '',
            orgDescription: ''
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        values.orgGithub = values.orgGithub.replace(/\s+/g, '');

        console.log(values); // Debugging: Check the trimmed values

        createOrganisation(values);
        router.push('/');
    // 
    }


    return (
      <> 
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="orgName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>orgName</FormLabel>
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
        name="orgGithub"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Github repositry name</FormLabel>
            <FormControl>
              <Input 
              {...field} 
              placeholder="shadcn" 
              type="search"
              onChange={(e) => {
                field.onChange(e);
                setQuery(e.target.value);
              }}/>
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
          
        )}
      />
      <Button type="submit">{
            !results ? 'Invalid' : 'Valid Organisation'
          }</Button>
      <FormField
        control={form.control}
        name="orgDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
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
      <Button disabled={!results} type="submit">Submit</Button>
    </form>
  </Form>

  <div className="mt-4 w-full">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {results && (
          <div>
            <h3 className="text-lg font-bold">Organization Details</h3>
            <p><strong>Name:</strong> {results.name}</p>
            <p><strong>Description:</strong> {results.description}</p>
            <p><strong>Public Repos:</strong> {results.public_repos}</p>
            <p><strong>Followers:</strong> {results.followers}</p>
            <a href={results.html_url} target="_blank" className="text-blue-500">View on GitHub</a>
          </div>
        )}
      </div>

</>
    )
}

export default CreateOrg