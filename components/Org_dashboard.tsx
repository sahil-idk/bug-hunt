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
import { Button } from './ui/button'
import Link from 'next/link'
type Props = {}

const OrgDashboard = ({
    orgGithub
}: {
    orgGithub: string
}) => {


    const { data, isError, isLoading, error } = useQuery({

        queryKey: ['orgGithubDetails', orgGithub],
        queryFn: () => fetch(`https://api.github.com/orgs/${orgGithub}/repos?per_page=5`, {
            headers: {
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
         
            <div className='grid  grid-cols-3'>
                {
                    data ? data.map((repo: any) => {
                        return (
                            <div key={repo.id} className='  '>
                                <Card className='w-[350px]'>
                                    <CardHeader>
                                        <div className='flex flex-row justify-between items-center mb-5'>
                                        <CardTitle className='text-xl text-orange-500'>{repo.name}</CardTitle>
                                        <Link href={`/repos/${orgGithub}/${repo.name}`}>
                                        <Button className='text-xs '>View Repo</Button>
                                        </Link>
                                        </div>
                                        <CardDescription>{repo.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>Card Content</p>
                                    </CardContent>
                                    <CardFooter className='flex flex-row justify-between'>
                                        <p>{repo.language}</p>
                                        <p>Watchers: {repo.watchers}</p>
                                    </CardFooter>
                                </Card>


                            </div>
                        )
                    }) :
                        <div>No data</div>
                }
            </div>
        </div>
    )
}

export default OrgDashboard