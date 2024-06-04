import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/dist/server/api-utils';
import { RedirectToSignIn } from '@clerk/nextjs';
const page = ({params} : {
  params : {workspace : string} 
}) => {

  const {userId} = auth();
  
  if(!userId) {
    return <RedirectToSignIn />
  }

  return (
    <div>
     workspaceName : {params.workspace}
    </div>
  )
}

export default page
