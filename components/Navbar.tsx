"use client"

import Link from 'next/link';
import { useUserContext } from '../context/UserContext';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const { user, logOut } = useUserContext()
  const router = useRouter();
  
      const handleLogout = async() => {
        await logOut();
        console.log('log out')

        // router.push('/login')
      }
  return (
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
  )
}

export default NavBar;