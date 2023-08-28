
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "./Nav"


export default function Layout({children}) {
  const { data: session } = useSession()
  if(session) {
    return (
    <div className="bg-blue-500 h-screen flex">
      <Nav/>
      <div className="bg-white flex-grow rounded-lg px-4">
        {children}
       
      </div>
      
    </div>
    )
  }
  return <>
    Not signed in <br/>
    <button onClick={() => signIn('google')}>Sign in</button>
  </>
}

