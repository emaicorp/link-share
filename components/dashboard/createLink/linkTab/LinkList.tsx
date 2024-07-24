// components/LinkTab/LinkList.tsx
import React from "react";
import LinkItemComponent from "./LinkItemComponent";
import Image from "next/image";

interface LinkListProps {
  links: { id: number; url: string; platform: string; error: string }[];
  showInitialContent: boolean;
  onInputChange: (index: number, value: string) => void;
  onPlatformChange: (index: number, platform: string) => void;
}

const LinkList: React.FC<LinkListProps> = ({ links, showInitialContent, onInputChange, onPlatformChange }) => (
  <div className="overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-purpleMain scrollbar-track-gray-100">
    {showInitialContent ? (
      <div className="dom text-center bg-lightGary p-[20px] flex flex-col justify-center items-center rounded-[12px]">
        <div className="dom-img">
          <Image src="/images/addLink.svg" width={200} height={200} alt="Demo" />
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
      <div className="links-list space-y-[20px]">
        {links.length > 0 ? (
          links.map((link, index) => (
            <LinkItemComponent
              key={link.id}
              link={link}
              index={index}
              onInputChange={onInputChange}
              onPlatformChange={onPlatformChange}
            />
          ))
        ) : (
          <p>No links added yet.</p>
        )}
      </div>
    )}
  </div>
);

export default LinkList;
