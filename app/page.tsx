import Image from "next/image";
import { LoginForm } from "@/components/ui/formComponents/loginForm";
import UserLoginSignIn from "@/components/login&signUp/login";
import 'react-toastify/dist/ReactToastify.css';


import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    
    <div className="font-instrument-sans">
    <UserLoginSignIn />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </div>
    
  );
}
