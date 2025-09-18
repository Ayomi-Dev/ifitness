"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User{
    id: string;
    name:string;
    email: string;
    isAdmin: boolean;
}

interface UserContextType {
    user: User | null,
    getUser: () => Promise<void>
    logOut: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserContextProvider: React.FC<{children : ReactNode}> = ( { children } ) => {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)



    const getUser = async() => {
        
        try{
            setLoading(true)
        const res = await fetch("http://localhost:3000/api/auth/profile", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await  res.json();
        if(!res.ok){
            setError(data.error || "Couldn't find user at this time")
        }
        else{
            setUser(data.user || null)
        }
        }
        catch(error){
            console.log(error);
            setError("An error occured. Please try again")
            setUser(null)
        }
        finally{
            setLoading(false)
        }
    }
 
    const logOut = async() => {
        try {
            const res =  await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });
            if(!res.ok){
                console.log("route hit")
                throw new Error("Logout failed")
            }
            else{

                setUser(null);
            }
        } 
        catch (error) {
           console.log(error) 
        }
    }

    useEffect(() => {
        getUser();
    }, [])
   
    






    const values = {
        user,
        getUser,
        logOut
    }
    return(
        <UserContext.Provider value={ values }>
            { children }
        </UserContext.Provider>
    )

}

export const useUserContext = () => {
        const context = useContext(UserContext);
        if(!context){
            throw new Error("context must be within a provider");
            return;
        }

        return context;
}
