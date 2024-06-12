'use client'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import Link from 'next/link'
import React from 'react'
import { useQuery } from '@tanstack/react-query'


import { IssueDashboard } from '@/components/component/issue-dashboard'

type Props = {}

const IssuesPage = ({
  params
}: {
  params:{
    repoName: string;
    orgName: string;

  }
}) => {
  console.log(params.orgName, params.repoName);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["issueDetails", params.orgName, params.repoName],
    queryFn: () =>
      fetch(
        `https://api.github.com/repos/${params.orgName}/${params.repoName}/issues`,
        {
          headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      ).then((response) => response.json()),
    refetchOnMount: true,
  });

  if (isLoading) {
    return <span>Loading Repositry details </span>;
  }
  if (isError) {
    return <span>Error loading repos: {error.message}</span>;
  }
  if (!data || data.length === 0) {
    return <div>No repos available</div>;
  }

  console.log(data);
  return (
    
    <div>
  <IssueDashboard
  orgName={params.orgName}
  repoName={params.repoName}
  issuesData={data}
  />
  </div>
  )
}

export default IssuesPage


