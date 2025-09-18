"use client"

import Link from 'next/link';
import { useUserContext } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingOverlay from '../utils/LoadingOverlay';

const NavBar = () => {
  const { user, logOut } = useUserContext()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();
  
      const handleLogout = async() => {
        setLoading(true)

        setTimeout(async() => {
          await logOut();
          setLoading(false)
        }, 3000);
        

        
      }
  return (
    <>
      <nav className='flex px-3 justify-between'>
          <div className="font-bold italic">iFitness</div>
          <ul className="flex">
              <Link href={`/`}>Home</Link>
              <Link href={`/about`}>About</Link>
              {user ? (<p onClick={handleLogout}>Log out</p>) : <p>not logged in</p>}
          </ul>
          <div className="flex gap-2">
            <Link href={`/login`} className='px-3 py-1 bg-blue-500 rounded-md text-white'>Login</Link>
            <p className='px-3 py-1 bg-blue-500 rounded-md text-white cursor-pointer' onClick={handleLogout}>Logout</p>
          </div>
      </nav> 
      <LoadingOverlay show={loading} message="Logging out, please wait..." />
    </>
    
  )
}

export default NavBar;