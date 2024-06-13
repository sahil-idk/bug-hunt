import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { IssueDescription } from "@/components/component/issue-description";
type Props = {};




export default async function  IssueDescriptionPage(
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
    const queryClient = new QueryClient()
  
    await queryClient.prefetchQuery({
      queryKey: ['IssueDetails'],
      queryFn: () =>
        fetch(`https://api.github.com/repos/${params.orgName}/${params.repoName}/issues/${params.issueId}`,
          {
            headers: {
              Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            },
          }
        ).then((response) => response.json()),
     
    })
  
   
    return (
      // Neat! Serialization is now as easy as passing props.
      // HydrationBoundary is a Client Component, so hydration will happen there.
      <HydrationBoundary state={dehydrate(queryClient)}>
     
        <IssueDescription params={params} />
      </HydrationBoundary>
    )
  }

// const IssueDescriptionPage = ({
//   params,
// }: {
//   params: {
//     issueId: string;
//     repoName: string;
//     orgName: string;
//   };
// }) => {
//   console.log(params.orgName, params.repoName, params.issueId);
//   return (
//     <div className="">
//       <IssueDescription />
//     </div>
//   );
// };

// export default IssueDescriptionPage;
