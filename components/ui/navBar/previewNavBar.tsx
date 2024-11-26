"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

const PreviewNavBar = ({user}:{user:any}) => {

    return(
        <div className="flex justify-center items-center align-center transparent p-2 fixed w-[100%] ">
            <div className="flex justify-between items-center align-center p-3 bg-lightGary md:w-[90%] w-[100%]">
                <Link 
                href={"/dashboard"}
                className="border border-purpleMain"
                >
                Back to Editor
                </Link>
                <Link 
                href={"/dashboard"}
                className="border border-purpleMain"
                >
                Back to Editor
                </Link>
            </div>

        </div>
    )

}

export {PreviewNavBar}