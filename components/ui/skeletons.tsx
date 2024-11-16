import { FaGithub, FaLinkedin, FaFacebook, FaTwitter,FaArrowRight } from 'react-icons/fa';
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
export function UserImage() {
    return (
        <div className={`w-[59px] h-[59px] relative rounded-full overflow-hidden ${shimmer}`}>
        <div className="bg-skeletonGray w-full h-full">

        </div>
        </div>
    );
};
export function UserName(){
    return(
        <div className={`${shimmer} w-[160px] h-[16px] relative rounded-[104px] overflow-hidden`}>
            <div className="bg-skeletonGray w-full h-full"></div>
        </div>
    );
};
export function UserEmail (){
    return(
        <div className={`${shimmer} w-[74px] h-[8px] relative rounded-[104px] overflow-hidden`}>
            <div className="bg-skeletonGray w-full h-full"></div>
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
            <div className="bg-skeletonGray w-[100%] h-full flex justify-between align-center px-3 items-center">
              <div className="flex items-center">
                {link.platform === 'Github' && <FaGithub className="mr-2" size={24} />}
                {link.platform === 'LinkedIn' && <FaLinkedin className="mr-2" size={24} />}
                {link.platform === 'Facebook' && <FaFacebook className="mr-2" size={24} />}
                {link.platform === 'Twitter' && <FaTwitter className="mr-2" size={24} />}
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