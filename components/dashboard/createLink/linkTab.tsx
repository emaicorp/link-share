"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaGripLines } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { FaLink } from "react-icons/fa6";
import * as z from "zod";
import { getAuth } from "firebase/auth";
import { 
  collection, 
  addDoc, 
  where ,
   getDocs , 
   doc, 
   query ,
    updateDoc ,
    QueryDocumentSnapshot ,
    type QuerySnapshot,
    type DocumentData,
  } from "firebase/firestore";
import { db } from "@/firebase.config";
import { toast } from 'react-toastify';

interface LinkTabProps {
  // Define any props your component might use here
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserLinks } from "@/app/hooks/useUserLinks";

const LinkTab: React.FC<LinkTabProps> = () => {
  const { links, loading, error } = useUserLinks();
  const [linksData, setLinks] = useState<{ id: number; url: string; platform: string; error: string }[]>([]);
  const [showInitialContent, setShowInitialContent] = useState<boolean>(true);

  useEffect(() => {
    if (!loading && links) {
      setLinks(links.map(link => ({ ...link, id: Number(link.id), error: "" })));
      setShowInitialContent(links.length === 0);
    }
  }, [loading, links]);

  const handleAddLink = () => {
    setLinks((prevLinks) => [...prevLinks, { id: prevLinks.length + 1, url: "", platform: "Github", error: "" }]);
    setShowInitialContent(false);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedLinks = [...linksData];
    updatedLinks[index].url = value;
    updatedLinks[index].error = "";
    setLinks(updatedLinks);
  };

  const handlePlatformChange = (index: number, platform: string) => {
    const updatedLinks = [...linksData];
    updatedLinks[index].platform = platform;
    setLinks(updatedLinks);
  };

  const validateLinks = () => {
    const urlSchema = z.string().url();
    let allValid = true;

    const updatedLinks = linksData.map((link) => {
      try {
        urlSchema.parse(link.url);
        return { ...link, error: "" };
      } catch {
        allValid = false;
        return { ...link, error: "Invalid URL" };
      }
    });

    setLinks(updatedLinks);
    return allValid;
  };

  const handleSave = async () => {
    if (validateLinks()) {
      let hasError = false; // Track if an error occurs
  
      try {
        const auth = getAuth();
        const user = auth.currentUser;
  
        if (!user) {
          throw new Error("No authenticated user found.");
        }
  
        const userId = user.uid;
        const linksCollectionRef = collection(db, "links");
  
        for (const link of linksData) {
          // Query Firestore for existing link by userId and platform
          const querySnapshot = await getDocs(
            query(
              linksCollectionRef, 
              where("userId", "==", userId),
              where("platform", "==", link.platform)
            )
          );
  
          if (!querySnapshot.empty) {
            // Update the existing document
            querySnapshot.forEach(async (doc :  QueryDocumentSnapshot<DocumentData>) => {
              const docRef = doc.ref;
              await updateDoc(docRef, { url: link.url, updatedAt: new Date() });
            });
          } else {
            // Add a new document if no match found
            await addDoc(linksCollectionRef, {
              userId,
              url: link.url,
              platform: link.platform,
              createdAt: new Date(),
            });
          }
        }
      } catch (error) {
        hasError = true; // Mark that an error occurred
        console.error("Error saving links to Firebase:", error);
        toast.error("Error saving links. Please try again.");
      } finally {
        // Show success toast only if no errors occurred
        if (!hasError) {
          toast.success("Links have been successfully saved.");
        }
      }
    }
  };
  
  

  return (
    <div className="">
      <div className="p-[40px] border-b h-[539px]">
        <div className="addLink space-y-[40px] ">
          <div className="header">
            <h2 className="text-headingMain font-[700]">Customize your links</h2>
            <p className="text-grayMain font-[400]">
              Add/edit/remove links below and then share all your profiles with the world!
            </p>
          </div>

          <div className="links space-y-[24px]">
            <div className="addLinkBtn">
              <button
                className="w-full border border-purpleMain hover:bg-lightPurple text-purpleMain p-[11px] rounded-[8px]"
                onClick={handleAddLink}
              >
                Add a new link
              </button>
            </div>
            <div className="overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-purpleMain scrollbar-track-gray-100">
              {showInitialContent ? (
                <div className="dom text-center bg-lightGary p-[20px] flex flex-col justify-center items-center rounded-[12px]">
                  <div className="dom-img">
                    <Image
                      src="/images/addLink.svg"
                      width={200}
                      height={200}
                      alt="Demo"
                    />
                  </div>
                  <div className="dom-text w-[448px] ">
                    <h3 className="text-headingMain font-[700]">Let’s get you started</h3>
                    <p className="text-bodySmall font-[400] w-[380px] text-grayMain">
                      Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them.
                      We’re here to help you share your profiles with everyone!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="links-list space-y-[20px] ">
                  {linksData.length > 0 ? (
                    
                    linksData.map((link, index) => (
                      <div key={link.id || index} className="bg-lightGary p-[20px] rounded-[12px] space-y-[12px]">
                        <div className="flex w-full justify-between items-center">
                          <span className="flex items-center gap-2">
                            <FaGripLines />
                            {`Link #${index + 1 }`}
                          </span>
                          <span>Remove</span>
                        </div>

                        <div className="select w-full">
                          <Label>Platform</Label>
                          <Select
                            onValueChange={(value) => handlePlatformChange(index, value)}
                            value={link.platform}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={<span className="flex gap-2 items-center"><TbBrandGithubFilled /> {link.platform}</span>} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Github">Github</SelectItem>
                              <SelectItem value="Twitter">Twitter</SelectItem>
                              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="link">
                          <Label>Link</Label>
                          <div className={clsx(
                            "flex items-center bg-white focus-within:shadow-custom-shadow-purpleMain rounded-[8px] px-3 gap-[12px] focus-within:border-purpleMain focus-within:border-[1px] border",
                            { "border-red-500": link.error }
                          )}>
                            <FaLink />
                            <Input
                              value={link.url}
                              onChange={(e) => handleInputChange(index, e.target.value)}
                              placeholder="https://example.com/your-profile"
                              className="link-input"
                            />
                            <span className="link-input-error text-bodySmall w-[162px] text-redMain">{link.error}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No links added yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="submit flex p-[20px]">
        <Button
          className="bg-purpleMain disabled:bg-purpleMain text-white ml-auto hover:shadow-custom-shadow-purpleMain hover:bg-purpleHover hover:border"
          disabled={linksData.length === 0}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default LinkTab;
