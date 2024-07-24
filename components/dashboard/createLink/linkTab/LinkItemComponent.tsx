// components/LinkTab/LinkItemComponent.tsx
import React from "react";
import { FaGripLines, FaLink } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import clsx from "clsx";

interface LinkItemProps {
  link: { id: number; url: string; platform: string; error: string };
  index: number;
  onInputChange: (index: number, value: string) => void;
  onPlatformChange: (index: number, platform: string) => void;
}

const LinkItemComponent: React.FC<LinkItemProps> = ({ link, index, onInputChange, onPlatformChange }) => (
  <div className="bg-lightGary p-[20px] rounded-[12px] space-y-[12px]">
    <div className="flex w-full justify-between items-center">
      <span className="flex items-center gap-2">
        <FaGripLines />
        {`Link #${link.id}`}
      </span>
      <span>Remove</span>
    </div>

    <div className="select w-full">
      <Label>Platform</Label>
      <Select
        onValueChange={(value) => onPlatformChange(index, value)}
        value={link.platform}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={<span className="flex gap-2 items-center"><TbBrandGithubFilled /> {link.platform}</span>} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Github">Github</SelectItem>
          <SelectItem value="Twitter">Twitter</SelectItem>
          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="link">
      <Label>Link</Label>
      <div className={clsx(
        "flex items-center bg-white focus-within:shadow-custom-shadow-purpleMain rounded-[8px] px-3 gap-[12px] focus-within:border-purpleMain focus-within:border-[1px] border",
        { "border-red-500": link.error }
      )}>
        <FaLink />
        <Input
          value={link.url}
          onChange={(e) => onInputChange(index, e.target.value)}
          placeholder="https://example.com/your-profile"
          className="link-input"
        />
        <span className="link-input-error text-bodySmall w-[162px] text-redMain">{link.error}</span>
      </div>
    </div>
  </div>
);

export default LinkItemComponent;
