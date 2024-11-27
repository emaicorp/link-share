"use client"

import Link from "next/link"
import { useState, useEffect } from "react"


const PreviewNavBar = ({user, owner}:{user:any, owner:Boolean}) => {
    let userLink : string;
    if(user){
         userLink = `https://link-share.vercel.app/?userId=${user.user.uid}`

    }
    const copyLink = () => {
        alert(`Link copied to ${userLink}`)
    }
    return(
        <div className="flex justify-center items-center align-center transparent p-2 fixed w-[100%]  ">
            <div className="flex justify-between items-center align-center p-3 bg-lightGary rounded md:w-[90%] w-[100%]">
                {owner? <Link 
                href={"/dashboard"}
                className="border border-purpleMain p-2 rounded"
                >
                Back to Editor
                </Link> : <Link 
                href={"/"}
                className="border border-purpleMain p-2 rounded"
                >
                Login
                </Link> }
                
                <button 
                onClick={copyLink}
                className="border border-purpleMain text-white p-2 rounded bg-purpleMain hover:opacity-[0.7]"
                >
                Share Linnk
                </button>
            </div>

        </div>
    )

}

export {PreviewNavBar}