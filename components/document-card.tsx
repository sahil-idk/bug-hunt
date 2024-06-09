import { Doc } from '@/convex/_generated/dataModel'
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
  
const DocumentCard = ({document}: {
    document:  Doc <'documents'>
}) => {
  return (
    
      <Card>
  <CardHeader>
    <CardTitle>{document.title}</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button asChild >
      <Link href={`/documents/${document._id}`}> View</Link>
    </Button>
 </CardFooter>
</Card>

  )
}

export default DocumentCard
