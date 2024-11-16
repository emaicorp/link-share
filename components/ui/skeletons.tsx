import { FaGithub, FaLinkedin, FaFacebook, FaTwitter,FaArrowRight } from 'react-icons/fa';
import Image from 'next/image'; // Import the Image component from Next.js
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";
  interface Link {
    id: string; // Use Firestore document ID type
    url: string;
    platform: string;
  }
  
  interface AllUserLinksProps {
    links: Link[];
    loading: boolean;
  }

const getPlatformDetails = (platform: string) => {
    switch (platform) {
        case 'Github':
            return { bgColor: 'bg-gray-800', icon: <FaGithub className="mr-2" size={24} /> };
        case 'LinkedIn':
            return { bgColor: 'bg-blue-600', icon: <FaLinkedin className="mr-2" size={24} /> };
        case 'Facebook':
            return { bgColor: 'bg-blue-500', icon: <FaFacebook className="mr-2" size={24} /> };
        case 'Twitter':
            return { bgColor: 'bg-blue-400', icon: <FaTwitter className="mr-2" size={24} /> };
        default:
            return { bgColor: '', icon: null }; // Return default values if no matching platform
    }
};

export function UserImage({ imageSrc }: { imageSrc: string | null }) {
    return (
        <div className={`w-[59px] h-[59px] relative rounded-full overflow-hidden ${imageSrc ? "" : shimmer}`}>
            {imageSrc ? ( // Check if imageSrc is not null
                <Image src={imageSrc} alt="User" layout="fill" objectFit="cover" /> // Use Next.js Image component
            ) : (
                <div className="bg-skeletonGray w-full h-full"></div> // Show shimmer effect
            )}
        </div>
    );
};
export function UserName({ name }: { name: string | null }) {
    return (
        <div className={`${name ? "w-[80%] h-[30px]" : `w-[160px] h-[16px] ${shimmer}`} relative rounded-[104px] overflow-hidden`}>
            {name ? (
                <div className=" w-full h-full flex items-center justify-center">
                    {name}
                </div>
            ) : (
                <div className="bg-skeletonGray w-full h-full"></div>
            )}
        </div>
    );
};
export function UserEmail({ email }: { email: string | null }) {
    return (
        <div className={`${email ? "w-[80%] h-[30px]" : `w-[74px] h-[16px] ${shimmer}`}  relative rounded-[104px] overflow-hidden`}>
            {email ? (
                <div className=" w-full h-full flex items-center justify-center text-xs p-2">
                    {email}
                </div>
            ) : (
                <div className="bg-skeletonGray w-full h-full"></div>
            )}
        </div>
    ); 
}
export function UserLinks(){
    return(
        <div className={`${shimmer} w-[100%] h-[34px] relative rounded-[8px] overflow-hidden`}>
            <div className="bg-skeletonGray w-full h-full"></div>
        </div>
    );
}
export function AllUserLinks ( ){
    return(
        <div className="space-y-[15px]">
            <UserLinks />
            <UserLinks />
            <UserLinks />
            <UserLinks />
            <UserLinks />
        </div>
    );
}
export function AllLinks({ links }: AllUserLinksProps) {
    return (
      <div>
        {links.map(link => (
          <div key={link.id} className="w-[100%] h-[34px] relative rounded-[8px] overflow-hidden mb-3  ">
            <div className={`bg-skeletonGray w-[100%] h-full flex justify-between align-center px-3 items-center text-white ${getPlatformDetails(link.platform).bgColor}`}>
              <div className="flex items-center">
                {getPlatformDetails(link.platform).icon}
              </div>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="">
                {link.platform}
              </a>
             
                <FaArrowRight className="ml-2" size={14} /> 
            </div>
          </div>
        ))}
      </div>
    );
  } 