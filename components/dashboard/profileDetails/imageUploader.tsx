import { useState } from "react";

const ImageUploader = ({imageFile, setImageFile}:{imageFile:File | null, setImageFile:React.Dispatch<React.SetStateAction<File | null>>}) => {
  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      
    } else {
      alert("Please upload a valid image file (PNG or JPG).");
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-100  rounded">
      <div className="flex flex-col md:flex-row justify-between w-full p-5 items-center  ">
        {/* Profile Picture Text */}
        <div className="text-gray-700 font-medium">Profile picture</div>

        {/* Upload Box */}
        <div
          className={`relative w-[150px] h-[150px] rounded-[10px] ${
            imagePreview ? "" : "bg-purple-100"
          } flex items-center justify-center border-2 border-dashed border-purple-400 cursor-pointer`}
          style={{
            backgroundImage: imagePreview ? `url(${imagePreview})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleImageUpload}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-12 w-12 ${imagePreview ? "text-white" : "text-purple-500"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16s1-1 4-1 4 1 4 1m0-5a3 3 0 11-6 0 3 3 0 016 0zm6-6v3m0 0v3m0-3h3m-3 0H9"
                />
              </svg>
             
              {!imagePreview ? (
              <span className="mt-2 text-sm text-purple-500">
                + Upload Image
              </span>
            
          ):(
            <span className="mt-2 text-sm text-white">
              + Change Image
            </span>
          
        )}
           </label>
        </div>

        {/* Info Text */}
        <div className="text-sm text-gray-500 text-center md:text-left">
          Image must be below 1024x1024px. <br /> Use PNG or JPG format.
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
