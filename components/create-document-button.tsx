import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'
import CreateDocumentForm from './createDocumentForm'
  
const CreateDocumentButton = () => {
    const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
    <DialogTrigger asChild>
        <Button>Create Document</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create new Document</DialogTitle>
        <DialogDescription>
          <CreateDocumentForm onUpload={() => setIsOpen(false)}/>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  
  )
}

export default CreateDocumentButton
