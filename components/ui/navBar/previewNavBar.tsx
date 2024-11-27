"use client"

import Link from "next/link"
import { useState, useEffect } from "react"


const PreviewNavBar = ({user, owner}:{user:any, owner:Boolean}) => {
    let userLink : string;
    if(user){
         userLink = `https://link-share-ochre.vercel.app/preview?userId=${user.user.uid}`

    }
    const copyLink = async () => {
        if (!userLink) return;
        
        try {
            await navigator.clipboard.writeText(userLink);
            alert('Link copied to clipboard!');
        } catch (err) {
            // console.error('Failed to copy link:', err);
            // Fallback for older browsers
            alert('Error copying to clipboard!');

            const textArea = document.createElement('textarea');
            textArea.value = userLink;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                alert('Link copied to clipboard!');
            } catch (err) {
                // console.error('Fallback: Failed to copy link:', err);
                alert('Failed to copy link. Please copy it manually.');
            }
            document.body.removeChild(textArea);
        }
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