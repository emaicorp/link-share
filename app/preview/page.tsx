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
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { useRouter } from 'next/navigation'
import { FaSpinner } from 'react-icons/fa6'

const Page = () => {
  const searchParams = useSearchParams(); // Hook to get query parameters
  const userId = searchParams.get('userId'); // Get userId from URL
  const [userRecord, setUserRecord] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]); // Add state for links
  const [owner, setOwener ] =  useState(false);
  const router = useRouter()
  const link = useUserLinks().links


  

  useEffect(() => {
   let userData : any;
    const fetchDetails = async () => {
    
      if (userId) {
        userData = await getInfo(userId); // Fetch user details using userId from URL
        // console.log(userData)
        if(userData.error) router.push('/')
        const details = {"user" : userData}

        setUserRecord(details)

        const linksCollection = collection(db, "links");
        const q = query(linksCollection, where("userId", "==", userId));
        
        // Create an empty array to store the results
        let linksArray : any = [];
        
        // Fetch the documents from the query
        getDocs(q).then((querySnapshot: QuerySnapshot<DocumentData>) => {
          querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            linksArray.push(doc.data());
          });
          setLinks(linksArray);
          // You can now use the linksArray as needed
        }).catch((error: Error) => {
          router.push('/')
        });
      

        
      } else {
        // Handle case where userId is not provided
        //  links =  useUserLinks().links;

        userData = await GetCookies();
        if(!userData) router.push('/')
        const details = JSON.parse(userData)
        setUserRecord(details)
        setLinks(link); // Update links state
        setOwener(true)

      }
    }
    
    fetchDetails()
  }, [userId, router, link]);

  return (
    <div>
      {userRecord ? (
        <div className="">
              <PreviewNavBar user={userRecord} owner = {owner} />
              <div className="h-[50vh] bg-purpleMain rounded-br-[20px] rounded-bl-[20px] w-[100%]"></div>
        
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
      </div>
      ): (
        <div className="w-[100%] h-[100%] absolute flex justify-center items-center align-center">
          <FaSpinner className="custom-spinner size-[3.5rem]" />
        </div>
      )}
      
    </div>
  );
};

export default Page;