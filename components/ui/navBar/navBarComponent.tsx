"use client";
import React from "react";
import Image from "next/image";
import { FaLink } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import { Button } from "../button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const NavBarComponent = () => {
  const pathname = usePathname();
  const links = ["/dashboard", "/dashboard/profileDetails"];
  return (
    <div className="p-[24px]  w-full">
      <div className="rounded-[12px] bg-white p-[16px] flex justify-between items-center">
        <div className="imgae">
          <Image
            src="/images/logo.svg"
            className="max-[500px]:hidden"
            alt="LinkShare"
            priority={true}
            width={100}
            height={50}
          />
          <Image
            src="/images/logoSm.svg"
            className="hidden max-[500px]:block"
            alt="LinkShare"
            priority={true}
            width={100}
            height={50}
          />
        </div>
        <div className="flex gap-[16px]">
          <Link
            href={links[0]}
            className={clsx(
              "rounded w-[122px] max-[500px]:w-[74px] text-headingSmall pb-[11px] pt-[11px] font-[600] text-grayMain flex items-center justify-center gap-[8px] hover:text-purpleMain",
              { "bg-lightPurple text-purpleMain": pathname == links[0] }
            )}
          >
            <FaLink /> <span className="max-[500px]:hidden">Link</span>
          </Link>
          <Link
            href={links[1]}
            className={clsx(
              "rounded w-[187px] text-headingSmall max-[500px]:w-[74px] pb-[11px] pt-[11px] font-[600] text-grayMain flex items-center justify-center gap-[8px] hover:text-purpleMain",
              { "bg-lightPurple text-purpleMain": pathname == links[1] }
            )}
          >
            <FaRegCircleUser />{" "}
            <span className="max-[500px]:hidden ">Profile Details</span>
          </Link>
        </div>
        <div className="preview">
          <Button className="border-purpleMain text-purpleMain border outline-purpleMain bg-transparent hover:bg-purpleMain hover:text-white">
            <MdOutlineRemoveRedEye className="hidden max-[500px]:block" />
            <span className="max-[500px]:hidden">Preview</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBarComponent;
