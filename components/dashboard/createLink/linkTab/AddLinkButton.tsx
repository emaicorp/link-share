// components/LinkTab/AddLinkButton.tsx
import React from "react";

interface AddLinkButtonProps {
  onAddLink: () => void;
}

const AddLinkButton: React.FC<AddLinkButtonProps> = ({ onAddLink }) => (
  <div className="addLinkBtn">
    <button
      className="w-full border border-purpleMain hover:bg-lightPurple text-purpleMain p-[11px] rounded-[8px]"
      onClick={onAddLink}
    >
      Add a new link
    </button>
  </div>
);

export default AddLinkButton;
