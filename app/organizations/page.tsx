'use client'
import OrgTable from '@/components/OrgTable'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


type Props = {}

const Organizations = (props: Props) => {
    const organizations = useQuery(api.organizations.getOrganizations)


    if(!organizations){
        return <div>loading...</div>
    }

    return (
    <>

            <Table>
                
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">OrgName</TableHead>
                        <TableHead>Org Github</TableHead>
                        <TableHead>Org description</TableHead>
                        {/* <TableHead className="text-right">Amount</TableHead> */}
                    </TableRow>
                </TableHeader>
                {

                    organizations?.map((org) => (
                    


                            <OrgTable orgId={org._id} orgName={org.orgName} orgGithub={org.orgGithub} orgDescription={org.orgDescription} />
                        
                    ))
                }
                </Table >
            </>
            )
}

            export default Organizations