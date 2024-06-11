'use client'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery as useConvexQuery } from 'convex/react'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { getRepositories } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { query } from '@/convex/_generated/server'

import OrgDashboard from '@/components/Org_dashboard'
  

type Props = {}
interface Organization {
    orgGithub: string;
  }
const OrganizationPage = ({
    params
}:
    {
        params: {
            orgId: Id<'organizations'>
        }
    }
) => {
    const organisationQuery = useConvexQuery(api.organizations.getOrganization, { orgId: params.orgId })
    
    useEffect(() => {
        // Log when orgId changes to ensure it triggers re-fetching
        console.log(`orgId has changed to: ${params.orgId}`)
    }, [params.orgId])
    if (!organisationQuery) {
        return <div>Loading...</div>
    }



    return (
        <div>

            <h1 className='font-bold text-5xl'>{organisationQuery?.orgName}</h1>
            <p>{organisationQuery?.orgDescription}</p>
            <div className=''>
            
                <OrgDashboard orgGithub={organisationQuery?.orgGithub}/>
            </div>
        </div>
    )
}

export default OrganizationPage