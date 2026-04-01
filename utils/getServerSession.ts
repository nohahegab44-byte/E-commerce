// // utils/getServerSession.ts
// import { getServerSession } from "next-auth/next";
// import { nextAuthConfig } from "@/lib/nextauth.confg";

// export async function getMyServerSession() {
//   const session = await getServerSession(nextAuthConfig);
//   console.log("SESSION FROM SERVER ", session);
//   return session;
// }


//useSession is a client side hook to get the session in the client side
//getServerSession is a server side function to get the session in the server side (in page.tsx or in route handler) and it can be used in the client side if we want to get the session in the client side but we need to call it in the server side and pass the session to the client side through props or context or any state management library
// getToken => proxy ,api handler need (REQ).
//server comp ,sever action => getMyToken => decode => get the real token from backend => use it in the server comp or server action to do any logic with it (like fetching data from backend with this token in the header) without sending the real token to the client side and without using getServerSession in the page.tsx to avoid the problem of calling getServerSession in the client side and to avoid the problem of sending the real token to the client side through props or context or any state management library


// useSession => hook => client side only
// getServerSession => function => server side only (can be used in the client side if we call it in the server side and pass the session to the client side through props or context or any state management library)
// getMyToken => function => server side only (can be used in the client side if we call it in the server side and pass the token to the client side through props or context or any state management library)