
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


{/* <h1 className=" ml-10">Signed in as {session.user.email}</h1> */}

{/* <br/> */}
      // <button className="bg-orange-400 text-white p-1 h-10 " onClick={() => signOut()}>Sign out</button>