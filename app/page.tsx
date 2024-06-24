/* eslint-disable react/no-unescaped-entities */
"use client";
import CreateDocumentButton from "@/components/create-document-button";
import DocumentCard from "@/components/document-card";
import Navbar from "@/components/Navbar";
import { Spotlight } from "@/components/ui/Spotlight";
import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);
  return (
    <>
      <div className="h-full w-full  relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <Navbar />

          <div className=" pt-32 md:text-7xl flex flex-col  justify-items-center items-center mx-auto font-bold text-center bg-clip-text text-transparent  bg-gradient-to-b from-white to-slate-500 bg-opacity-50">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="text-xs  dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <span>
                why should competitive programmers have all the fun? building
                opensource.build 🚀
              </span>
            </HoverBorderGradient>

            <div className="max-w-[700px] pt-[16px] text-[60px]  ">
              Codeforces for Open Source developers <br />{" "}
              <p className="text-sm mx-auto pt-[16px] pb-[24px]  w-[400px]">
                the ultimate showdown for open-source devs! time to rank up,
                track your issues, and show'em who's boss
              </p>
            </div>
          </div>
          <div className="font-extralight  text-base text-slate-400 max-w-lg text-center mx-auto">
            <div className=" space-x-6">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Join Now
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
