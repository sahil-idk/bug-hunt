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
    <p>Card Footer</p>
  </CardFooter>
</Card>

  )
}

export default DocumentCard
