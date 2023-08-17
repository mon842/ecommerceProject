import Layout from "@/components/Layout";
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  return(
    <Layout>
      <div className="flex justify-between">
        <div>
          hello {session?.user?.name}
        </div>
        
        <img className="h-8 w-8" src={session?.user?.image} alt=""  />
      </div>
      
    </Layout>
  )  
}
