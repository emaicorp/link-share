"use client"
import React from 'react'
import { PreviewNavBar } from '@/components/ui/navBar/previewNavBar'
import { useState, useEffect } from 'react'
import { GetCookies } from '@/lib/cookies'
import { getAuth } from 'firebase/auth'
import { getInfo } from '../hooks/getUserInfo'
import { useParams } from 'next/navigation'
import { UserImage, UserName, UserEmail, AllUserLinks, AllLinks } from "@/components/ui/skeletons";
import { Suspense } from "react";
import {useUserLinks, UserDetails} from "@/app/hooks/useUserLinks"; // Adjust the import path as needed
import {
  collection,
  query,
  where,
  onSnapshot,
  type QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase.config";

const Page = () => {
  const { userId } = useParams<{ userId?: string }>(); // Get userId from URL
  const [userRecord, setUserRecord] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
  const { links, loading, error } = useUserLinks();
  

  

  useEffect(() => {
   let userData : any;
    const fetchDetails = async () => {
      if (userId) {
        userData = await getInfo(userId); // Fetch user details using userId from URL
        console.log(userData);
      } else {
        // Handle case where userId is not provided
        userData = await GetCookies();
        const details = JSON.parse(userData)
        setUserRecord(details)
        const userId = details.user.uid;

        const linksCollection = collection(db, "links");
        const q = query(linksCollection, where("userId", "==", userId));
        console.log(q)
        // console.log(userData);
      }
    }
    
    fetchDetails()
  }, [userId]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
console.log(userRecord)
  return (
    <div>
      <PreviewNavBar user={userRecord} />
      <div className="h-[50vh] bg-purpleMain rounded-br-[20px] rounded-bl-[20px] w-[100%]"></div>
      <h1>User Profile</h1>
      {userRecord && (
        
        <div>
          <p>Name: {userRecord.user.displayName || "emma"}</p>
          <p>Email: {userRecord.user.email || "john doe"}</p>
          <p>User ID: {userRecord.user.uid || "12345"}</p>
          {/* Add more user details as needed */}
        </div>
      )}
      {/* <div className="mt-[5vh] w-full flex items-center flex-col p-[20px] space-y-[56px]">
        <div className="space-y-[10px] flex items-center flex-col">
           <UserImage  imageSrc={userRecord.user.photoURL}/>  
          
          <div className="userinfor space-y-[0px] flex items-center flex-col">
            <UserName name ={userRecord.user.displayName} />
            <UserEmail email = {userRecord.user.email} />
          </div>
        </div>
        <div className="links w-full">
            {links.length > 0 ? ( <AllLinks  links={links}  loading={false}/>):(<AllUserLinks  />)}
         
        </div>
      </div> */}
    </div>
  );
};

export default Page;