import React from 'react'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { RedirectToSignIn } from '@clerk/nextjs';
type Props = {}


export default async function Page() {
    const user = await currentUser();

    if(!user) {
        return <RedirectToSignIn/>
    }
    console.log(user);
  
    if (!user) return <div>Not signed in</div>;
  
    return <div>Hello {user?.firstName}</div>;
  }