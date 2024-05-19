
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"
import styled from 'styled-components'
import Button, { ButtonStyle } from "./Button"


const BackgroundWrapper = styled.div`
    background-color: #afecfa;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`
export default function Layout({ children }) {
    const [showNav, setShowNav] = useState(false);
    const { data: session } = useSession();

    if (session) {
        return (
            <div>
                <div className="flex p-4 block md:hidden" >

                    {/* <button onClick={() => { setShowNav(true) }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </button> */}

                </div>


                <div className="bg-gray-100  min-h-screen flex">
                    <div className="p-2 flex-grow">
                        {children}

                    </div>
                </div>
            </div>

        )
    }
    return (
        <BackgroundWrapper>
            <div className="text-center w-full">
                {/* <button onClick={() => signIn('google')} >Login with Google</button> */}
                <Button onClick={() => signIn('google')} >Login with Google</Button>
            </div>
        </BackgroundWrapper>
    );
}
