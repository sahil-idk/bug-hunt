/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/4Aqwy8ZN080
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { JSX, SVGProps } from "react";


const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return format(date, "MMMM dd, yyyy hh:mm:ss a");
};
export function IssueDashboard({
  orgName,
  repoName,
  issuesData,
}: {
  orgName: string;
  repoName: string;
  issuesData: {
    id: number;
  
    state: string;
    number: number;
    title: string;
    assignee: {
      login: string | null;
    };
    assignees: [{
      login: string
    }] | null,
    created_at: string;
    updated_at: string;
    comments: number;
  }[];
}) {
 
  console.log(issuesData[0]);
  const isoTimestamp = "2024-06-12T02:46:25Z";
  const formattedDate = formatDate(isoTimestamp);
  // console.log(formattedDate);
  if(!issuesData || issuesData.length === 0 || issuesData === undefined){
    return <div>loading...</div>
  }
  
  return (
    <div className="flex min-h-screen">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 md:p-8 lg:p-10 w-64 hidden md:block">
        <nav className="space-y-2">
          <Link
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            href={`/repos/${orgName}/${repoName}`}
          >
            <HomeIcon className="h-5 w-5" />
            <span>Overview</span>
          </Link>
          <Link
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 transition-colors"
            href="#"
          >
            <DoorOpenIcon className="h-5 w-5" />
            <span>Issues</span>
          </Link>
          <Link
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            href="#"
          >
            <GitCommitVerticalIcon className="h-5 w-5" />
            <span>Commits</span>
          </Link>
          <Link
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            href="#"
          >
            <GitPullRequestIcon className="h-5 w-5" />
            <span>Pull Requests</span>
          </Link>
          <Link
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            href="#"
          >
            <SettingsIcon className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">
              <a className="text-orange-500">{repoName.toUpperCase()}</a> Issues
            </h1>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <RefreshCcwIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </Button>
              <Button size="icon" variant="ghost">
                <MoveHorizontalIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </Button>
            </div>
          </div>
          <div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto"
            style={{
              maxHeight: "500px",
            }}
          >
            <Table className="w-full border-collapse border-gray-200 dark:border-gray-700">
              <TableHeader>
                <TableRow className="border-b border-gray-200 dark:border-gray-700">
                  <TableHead className="py-3 px-4 text-left">Issue</TableHead>
                  <TableHead className="py-3 px-4 text-left">Status</TableHead>
                  <TableHead className="py-3 px-4 text-left">
                    Assignee
                  </TableHead>
                  <TableHead className="py-3 px-4 text-left">Created</TableHead>
                  <TableHead className="py-3 px-4 text-left">Updated</TableHead>
                  

                  <TableHead className="py-3 px-4 text-left">
                    Comments
                  </TableHead>
                  <TableHead className="py-3 px-4 text-left">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issuesData?.map((issue) => {
                  return (
                    <>
                    <TableRow className="border-b border-gray-200 dark:border-gray-700">
                      <TableCell className="py-3 px-4 max-w-sm ">
                        <Link className="font-medium hover:text-orange-500 " href={`https://github.com/${orgName}/${repoName}/issues/${issue.number}`}>
                          #{issue.number} - {issue.title}
                        </Link>
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <Badge>{issue.state}</Badge>
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        
                        <p className="ml-2">{issue.assignee === null ? <>No assignee</> : <>{issue.assignee.login}</>}</p>
                      </TableCell>
                      <TableCell className="py-3 px-4">{formatDate(issue.created_at)}</TableCell>
                      <TableCell className="py-3 px-4">{formatDate(issue.updated_at)}</TableCell>
                      <TableCell className="py-3 px-4 text-center">{issue.comments}</TableCell>
                      <TableCell className="py-3 px-4 text-center">
                        <Link href={`/repos/${orgName}/${repoName}/issues/${issue.number}`} className="hover:text-blue-500" >View</Link>
                      </TableCell>

                    </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

function DoorOpenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 4h3a2 2 0 0 1 2 2v14" />
      <path d="M2 20h3" />
      <path d="M13 20h9" />
      <path d="M10 12v.01" />
      <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z" />
    </svg>
  );
}

function GitCommitVerticalIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v6" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 15v6" />
    </svg>
  );
}

function GitPullRequestIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <line x1="6" x2="6" y1="9" y2="21" />
    </svg>
  );
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MoveHorizontalIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function RefreshCcwIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

function SettingsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
