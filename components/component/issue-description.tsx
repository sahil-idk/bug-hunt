'use client'

import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

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
  const { data } = useQuery({ queryKey: ['IssueDetails'],
    queryFn:() =>
    fetch(`https://api.github.com/repos/${params.orgName}/${params.repoName}/issues/${params.issueId}`,
      {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      }
    ).then((response) => response.json()),
  })

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
              <h1 className="text-xl font-semibold">{data.title}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Opened by
                <span className="font-medium">{data.user.login}</span> on <time dateTime="2023-06-12">{data.created_at}</time>
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">#1{data.number}</div>
        </div>
        <div className="prose prose-gray dark:prose-invert">
          <p>{data.body}</p>
          <p>This will involve the following steps:</p>
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
            <h2 className="text-sm font-medium mb-2">Labels</h2>
            <div className="flex flex-wrap gap-2">
              <Badge>enhancement</Badge>
              <Badge variant="secondary">bug</Badge>
              <Badge variant="outline">documentation</Badge>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium mb-2">Assignees</h2>
            <div className="flex space-x-2">
              <img
                alt="Avatar"
                className="rounded-full"
                height={32}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width={32}
              />
              <img
                alt="Avatar"
                className="rounded-full"
                height={32}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width={32}
              />
              <img
                alt="Avatar"
                className="rounded-full"
                height={32}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width={32}
              />
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium mb-2">Milestone</h2>
            <Badge>v1.0.0</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
