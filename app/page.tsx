'use client'
import CreateDocumentButton from "@/components/create-document-button";
import DocumentCard from "@/components/document-card";
import Navbar from "@/components/Navbar";
import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useMutation ,useQuery} from "convex/react";
import Markdown from "markdown-to-jsx";


export default function Home() {
const documents = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);
  return (
    <>
    <Navbar/>
  
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
 
        {/* <Content /> */}
        <h1 className="tracking-tighter">Codeforces but for Open Source Developers</h1>
        <Markdown >
        # Heck Yes\n\nThis is great!
        </Markdown>
        {/* <button onClick={() => {
          createDocument({
            title: "Hello World"
          });
        }}>
          clickme
        </button> */}
        {/* <CreateDocumentButton/> */}
        {/* <div className="grid grid-cols-10 gap-4">
          {documents?.map((doc) => (
            <div  key={doc._id}>
              <DocumentCard document={doc} />
            </div>
          ))}
        </div> */}
     
    </main>
    </>
  );
}
