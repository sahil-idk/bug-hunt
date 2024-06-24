'use client'

import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Markdown from 'markdown-to-jsx'
import { Button } from "../ui/button"
import Link from "next/link"

interface label 
  {

    id: number,

    node_id: string,

    url: string,

    name: string,

    color: string,

    default: false,

    description: string,


}
export function IssueDescription(
  {
    params
  }: {
    params: {
      issueId: string;
      repoName: string;
      orgName: string;
    }
  }
) {
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['IssueDetails'],
    queryFn:() =>
    fetch(`https://api.github.com/repos/${params.orgName}/${params.repoName}/issues/${params.issueId}`,
      {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      }
    ).then((response) => response.json()),
  })
  if (isLoading) {
    return <span>Loading Issue details </span>;
  }
  if (isError) {
    return <span>Error loading issue: {error.message}</span>;
  }
  
  console.log(data);
  return (
    <div className="flex w-full max-w-5xl mx-auto py-8 px-4 md:px-6">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              alt="Avatar"
              className="rounded-full"
              height={40}
              src={data.user.avatar_url}
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width={40}
            />
            <div>
              <Link href={data.html_url}><h1 className="text-xl hover:text-orange-500 font-semibold">{data.title}</h1></Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Opened by
                <span className="font-medium">{data.user.login}</span> on <time dateTime="2023-06-12">{data.created_at}</time>
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">#{data.number}</div>
        </div>
        <div className="">
          <Markdown>{data.body}</Markdown>
        
          {/* <ul>
            <li>Install the necessary TypeScript dependencies</li>
            <li>Configure the TypeScript compiler options</li>
            <li>Update the codebase to use TypeScript syntax</li>
            <li>Ensure all tests pass with the new TypeScript setup</li>
          </ul>
          <p>Let me know if you have any questions or concerns about this implementation.</p> */}
        </div>
      </div>
      <div className="w-64 ml-8 hidden md:block">
        <div className="space-y-4">
         
          <div>
            <h2 className="text-sm font-medium mb-2">Assignees</h2>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium mb-2">Milestone</h2>
            <Badge>v1.0.0</Badge>
          </div>

          <div className="mt-10">
            <Button>Add to workspace</Button>
          </div>
        </div>
      </div>
    
  )
}
