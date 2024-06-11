import { useQuery } from '@tanstack/react-query'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
type Props = {}

const OrgDashboard = ({
    orgGithub
}: {
    orgGithub: string
}) => {


    const {data,isError,isLoading,error} = useQuery({

        queryKey: ['orgGithubDetails'],
        queryFn:() => fetch(`https://api.github.com/orgs/${orgGithub}/repos?per_page=5`,{
            headers:{
                Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
            
            }
        }).then(response => response.json())
    })


    if (isLoading) {
        return <span>Loading repos...</span>;
      }
      if (isError) {
        return <span>Error loading repos: {error.message}</span>;
      }
      if (!data || data.length === 0) {
        return <div>No repos available</div>;
      }
    
    console.log(data)

  return (
    <div>
        {orgGithub}

            {
                        data ? data.map((repo: any) => {
                            return (
                                <div key={repo.id} className=''>
                                    <Card className='w-[350px]'>
                                        <CardHeader>
                                            <CardTitle>{repo.name}</CardTitle>
                                            <CardDescription>{repo.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Card Content</p>
                                        </CardContent>
                                        <CardFooter>
                                            <p>{repo.language}</p>
                                        </CardFooter>
                                    </Card>


                                </div>
                            )
                        }) :
                            <div>No data</div>
                    }
    </div>
  )
}

export default OrgDashboard