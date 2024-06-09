'use client'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'

import React from 'react'
import GetRepositries from '@/components/getRepositries'

type Props = {}

const OrganizationPage = ({
    params
}: 
{
    params: {
        orgId: Id<'organizations'>
    }
}
) => {
    const organisaton = useQuery(api.organizations.getOrganization, {orgId: params.orgId })
  
  
    return (
    <div>
        {organisaton?.orgName}
        <GetRepositries repo={organisaton?.orgName}/>
    </div>
  )
}

export default OrganizationPage