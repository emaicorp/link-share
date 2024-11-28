import React from 'react'
import Link from '@/components/dashboard/createLink/link'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify'


const page = () => {
  
  return (
    <div>
      <Link/>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
  )
}

export default page
export const dynamic = 'force-dynamic'