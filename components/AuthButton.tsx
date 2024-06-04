import React from 'react'
import { Button } from './ui/button'
import { SignedIn, UserButton, SignedOut, SignInButton } from '@clerk/nextjs'

const AuthButton =  () => {
 
    return (
        <>
            <SignedOut>
                <Button>
                <SignInButton />
                </Button>
                
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </>
    )
}

export default AuthButton