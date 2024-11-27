"use client"
import React from 'react'
import { PreviewNavBar } from '@/components/ui/navBar/previewNavBar'
import { useState, useEffect } from 'react'
import { GetCookies } from '@/lib/cookies'
import { getAuth } from 'firebase/auth'
import { getInfo } from '../hooks/getUserInfo'
import { useSearchParams } from 'next/navigation'
import { UserImage, UserName, UserEmail, AllUserLinks, AllLinks } from "@/components/ui/skeletons";
import { Suspense } from "react";
import {useUserLinks, UserDetails} from "@/app/hooks/useUserLinks"; // Adjust the import path as needed
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  type QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase.config";

const Page = () => {
  const searchParams = useSearchParams(); // Hook to get query parameters
  const userId = searchParams.get('userId'); // Get userId from URL
  const [userRecord, setUserRecord] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
  // const { links, loading, error } = useUserLinks();
  const [owner, setOwener ] =  useState(false);
  console.log(userId)

  

  useEffect(() => {
   let userData : any;
    const fetchDetails = async () => {
      if (!userId) {
        console.error("User ID is not available");
        return; // Early return or handle the case where userId is not present
      }
      if (userId) {
        userData = await getInfo(userId); // Fetch user details using userId from URL
        console.log(userData);
        // const details = JSON.parse(userData)
        // setUserRecord(details)

        // const linksCollection = collection(db, "links");
        // const q = query(linksCollection, where("userId", "==", userId));
        
        // // Create an empty array to store the results
        // let linksArray : any = [];
        
        // // Fetch the documents from the query
        // getDocs(q).then((querySnapshot : QuerySnapshot) => {
        //   querySnapshot.forEach((doc : typeof DocumentData) => {
        //     // Push the document data into the array
        //     linksArray.push(doc.data());
        //   });
        //   // You can now use the linksArray as needed
        //   console.log(linksArray);
        // }).catch((error : Error) => {
        //   console.log("Error getting documents: ", error);
        // });
        
      } else {
        // Handle case where userId is not provided
        // userData = await GetCookies();
        // const details = JSON.parse(userData)
        // setUserRecord(details)
        // setOwener(true)
        console.log(userId)

      }
    }
    
    fetchDetails()
  }, [userId]);
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
console.log(userRecord)
  return (
    <div>
      <PreviewNavBar user={userRecord} owner = {owner} />
      <div className="h-[50vh] bg-purpleMain rounded-br-[20px] rounded-bl-[20px] w-[100%]"></div>
      {userRecord && (
        
        <div className='flex justify-center align-center items-center mt-[-25Vh] '>
         
     
      <div className=" w-[90%] md:w-[40%] rounded-[20px] shadow flex items-center bg-lightGary flex-col p-[20px] space-y-[56px]">
        <div className="space-y-[10px] flex items-center flex-col">
           <UserImage  imageSrc={userRecord.user.photoURL}/>  
          
          <div className="userinfor space-y-[0px] flex items-center flex-col">
            <UserName name ={userRecord.user.displayName} />
            <UserEmail email = {userRecord.user.email} />
          </div>
        </div>
        <div className="links w-full md:w-[70%]">
            {links.length > 0 ? ( <AllLinks  links={links}  loading={false}/>):(<AllUserLinks  />)}
         
        </div>
      </div>
      </div>
      )}
      
    </div>
  );
};

export default Page;