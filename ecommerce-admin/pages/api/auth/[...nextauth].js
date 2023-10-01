import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from '@/lib/mongodb';

const arr=['siaassshane@gmail.com','sayakbasak842@gmail.com','sayakbasakhack@gmail.com'];

export const authOptions = {
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  secret:process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    session: ({session,token,user}) => {
      // console.log(session);
      // console.log(token);
      if (arr.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },

}

export default NextAuth(authOptions);


export async function isAdminRequest(req, res) {
  const session=await getServerSession(req, res,authOptions);
  if (!arr.includes(session?.user?.email) ) {
      res.status(401);
      res.end();
      throw 'not an admin request'
  }
}