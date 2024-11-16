"use client"
import React from "react";
import { IPhoneMockup } from "react-device-mockup";
import { UserImage, UserName, UserEmail, AllUserLinks, AllLinks } from "@/components/ui/skeletons";
import { Suspense } from "react";
import {useUserLinks} from "@/app/hooks/useUserLinks"; // Adjust the import path as needed

const MockupPreview: React.FC = () => {
  const { links, loading, error } = useUserLinks();
console.log(links)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <IPhoneMockup
      screenWidth={237}
      screenType="notch"
      frameColor="CaptionText"
      isLandscape={false}
      hideStatusBar={true}
      frameOnly={true}
    >
      <div className="mt-[5vh] w-full flex items-center flex-col p-[20px] space-y-[56px]">
        <div className="space-y-[25px] flex items-center flex-col">
          <UserImage />
          <div className="userinfor space-y-[13px] flex items-center flex-col">
            <UserName />
            <UserEmail />
          </div>
        </div>
        <div className="links w-full">
            {links.length > 0 ? ( <AllLinks  links={links}  loading={false}/>):(<AllUserLinks  />)}
         
        </div>
      </div>
    </IPhoneMockup>
  );
};

export default MockupPreview;
