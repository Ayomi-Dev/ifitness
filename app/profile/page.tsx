"use client"
import { PageWrapper } from '../../utils/PageWrapper' 
import { useUserContext } from '../../context/UserContext'
import Link from 'next/link';


const ProfilePage = () => {
    const { user} = useUserContext();

    if (!user) {
      
      return <p>You are not logged in. <Link href={'/login'}>Login</Link></p>; // <-- protect against null
    }
    
  return (
    <PageWrapper>
        <div className="flex w-full">
            <h1>Welcome, { user.name} </h1>
            <h1>ID, { user.id} </h1>
            <h1>ADMIN, { user.isAdmin ? "Yes" : "no"} </h1>
        </div>
    </PageWrapper>
  )
}

export default ProfilePage;