// components/LinkTab/useLinks.ts
import { useState } from "react";
import * as z from "zod";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase.config";

interface LinkItem {
  id: number;
  url: string;
  platform: string;
  error: string;
}

export const useLinks = () => {
    const [links, setLinks] = useState<{ id: number; url: string; platform: string; error: string }[]>([]);
    const [showInitialContent, setShowInitialContent] = useState<boolean>(true);

  const handleAddLink = () => {
    setLinks((prevLinks) => [...prevLinks, { id: prevLinks.length + 1, url: "", platform: "Github", error: "" }]);
    setShowInitialContent(false);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index].url = value;
    updatedLinks[index].error = "";
    setLinks(updatedLinks);
  };

  const handlePlatformChange = (index: number, platform: string) => {
    const updatedLinks = [...links];
    updatedLinks[index].platform = platform;
    setLinks(updatedLinks);
  };

  const validateLinks = () => {
    const urlSchema = z.string().url();
    let allValid = true;

    const updatedLinks = links.map((link) => {
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
  const testSave = async () => {
    try {
      await addDoc(collection(db, "users", "testUserId", "links"), {
        links: [
          {
            id: 1,
            url: "https://example.com",
            platform: "Github",
          },
        ],
      });
      console.log("Test link saved successfully");
    } catch (error) {
      console.error("Error saving test link:", error);
    }
  };
  
  const handleSave = async () => {
    if (validateLinks()) {
      const user = getAuth().currentUser;
      if (user) {
        const userId = user.uid;
        testSave();
        // try {
        //   const linkData = {
        //     links: links.map((link) => ({
        //       id: link.id,
        //       url: link.url,
        //       platform: link.platform,
        //     })),
        //   };
        //   console.log("Data to be saved:", linkData);  // Log the data being saved
        //   await addDoc(collection(db, "users", userId, "links"), linkData);
        //   console.log("Links saved successfully");
        // } catch (error) {
        //   console.error("Error saving links:", error);
        // }
      } else {
        console.error("User not authenticated");
      }
    }
  };

  return {
    links,
    showInitialContent,
    handleAddLink,
    handleInputChange,
    handlePlatformChange,
    validateLinks,
    handleSave,
  };
};
