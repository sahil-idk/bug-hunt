"use client";
import { RepositoryDashboard } from "@/components/repository-dashboard";
import { useQuery, QueryCache } from "@tanstack/react-query";
import React from "react";

type Props = {};

const RepoPage = ({
  params,
}: {
  params: {
    orgName: string;
    repoName: string;
  };
}) => {
  console.log(params.orgName, params.repoName);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["repoDetails", params.orgName, params.repoName],
    queryFn: () =>
      fetch(
        `https://api.github.com/repos/${params.orgName}/${params.repoName}`,
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
      <RepositoryDashboard
        orgName={params.orgName}
        repoName={params.repoName}
        watchers={data.watchers_count}
        forks={data.forks_count}
        description={data.description}
        language={data.language}
      />
    </div>
  );
};

export default RepoPage;
