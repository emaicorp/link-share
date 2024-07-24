import React from "react";
import { IPhoneMockup } from "react-device-mockup";
import styles from "./createLink.module.css";
import { db } from "@/firebase.config";
import {
  UserImage,
  UserName,
  UserEmail,
  AllUserLinks,
} from "@/components/ui/skeletons";
import { Suspense } from "react";

function MockupPreview() {
    // Assuming you have a reference to your Firestore database

  return (
    <IPhoneMockup
      screenWidth={237}
      screenType="notch"
      frameColor="CaptionText"
      isLandscape={false}
      hideStatusBar={true}
      frameOnly={true}
    >
      <div className="mt-[5vh] w-full  flex items-center flex-col p-[20px] space-y-[56px]">
        <div className="space-y-[25px] flex items-center flex-col">
          <UserImage />
          <div className="userinfor space-y-[13px] flex items-center flex-col">
            <UserName />
            <UserEmail />
          </div>
        </div>
        <div className="links w-full">
            <Suspense fallback={<AllUserLinks />}>
              <AllUserLinks />
            </Suspense>
        </div>
      </div>
    </IPhoneMockup>
  );
}

export default MockupPreview;
