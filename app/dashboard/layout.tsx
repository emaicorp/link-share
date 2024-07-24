"use client"
import NavBarComponent from "@/components/ui/navBar/navBarComponent";
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
 
    return (
       
      <div className="bg-lightGary">
        <div className="w-full flex-none ">
          <NavBarComponent />
        </div>
        <div className="">{children}</div>
      </div>
      
    );
  }