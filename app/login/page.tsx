"use client"
import { useState } from "react"
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { InputComponent } from "../../utils/InputComponent";
import { PageWrapper } from "../../utils/PageWrapper";
import { useUserContext } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import LoadingOverlay from "../../utils/LoadingOverlay";
import Notification from "../../utils/Notification";



const LoginPage = () => {
    const router = useRouter();
    const { getUser , user} = useUserContext();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("");
    const [passwordType, setPasswordType] = useState<"password" | "text">("password");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [showModal, setShowModal] = useState(false); //displays notification modal
    const [modalType, setModalType] = useState<"success" | "error" | "info">(
    "success"
  );
    const [message, setMessage] = useState("");

    const showPassword = () => {
        setPasswordType( passwordType === "password" ? "text" : "password")  //toggles password visibility
    }
  

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    
        setLoading(true);
        setError("");
    
        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json();
            
            if(!res.ok){
                setModalType("error")
                setMessage("Login failed!")
                setError(data.error || "Login failed, please try again")
            }
            else{
                await getUser();
                setModalType("success");
                setMessage("You're now signed in!")
                
                setTimeout(async() => {
                    router.push('/profile')
                }, 3000);
            }
        } 
        catch (error) {
            console.log(error);
            setError("An error occured. Please try again");
            setModalType("error");
            setMessage("An error occured. Please try again!")
        }
        finally{
            setLoading(false);
            setShowModal(true)
        }
 
    }

    
  return (
    <PageWrapper>
        <form action="" onSubmit={handleLogin} className='shadow-lg rounded-md w-[500px] mx-auto py-3 px-2 flex flex-col items-center justify-center'>
            <div className="flex items-center w-full">
                <FaEnvelope />
                <InputComponent id='email' label='Email Address' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex items-center w-full">
                <FaLock />
                <InputComponent id='password' label='Password' type={passwordType} value={password} onChange={(e) => setPassword(e.target.value)} />

                {passwordType === "password" 
                ? 
                    (<FaEye onClick={ showPassword } className="cursor-pointer" />)
                :
                    (<FaEyeSlash onClick={ showPassword } className="cursor-pointer" />)
                }
            </div>

            <button type="submit" className='px-3 py-2 bg-blue-500 rounded-md text-white'>Login</button>

            { error && ( <p className="text-red-500"> { error }</p>)}
        </form>

        <LoadingOverlay show={loading} message="Sigining in, please wait..." />

        <Notification
        show={showModal}
        type={modalType}
        message={message}
        onClose={() => setShowModal(false)}
      />
    </PageWrapper>
  )
}

export default LoginPage