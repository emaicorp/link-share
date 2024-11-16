"use client"
import React from 'react'
import MockupPreview from '../createLink/mockScreen'
import ImageUploader from './imageUploader'

const Profile = () => {
  return (
    <div className='flex gap-[24px]  p-[24px] pt-0'>
    <div className="p-[24px]  w-[560px] rounded-[12px] bg-white items-center flex justify-center">
        <MockupPreview />
    </div>
    <div className="rounded-[12px] bg-white w-[808px] p-[40px] flex flex-col gap-[40px]">
      <div className='w-full space-y-0'>
        <h1 className='font-[700] text-[32px]  w-full h-fit  '>Profile Details</h1>
        <p className='font-[200]'>Add your details to create a personal touch to your profile.</p>
      </div>
      <div className='h-[200px]  rounded-[10px]'>
        <ImageUploader/>
      </div>
        
        
    </div>

</div>
  )
}

export default Profile