import React from 'react';
import MockupPreview from './mockScreen';
import LinkTab from './linkTab';

const Link = () => {
  return (
    <div className='flex gap-[24px]  p-[24px] pt-0'>
        <div className="p-[24px]  w-[560px] rounded-[12px] bg-white items-center flex justify-center">
            <MockupPreview />
        </div>
        <div className="rounded-[12px] bg-white w-[808px]">
            
            <LinkTab />
        </div>

    </div>
  )
}

export default Link