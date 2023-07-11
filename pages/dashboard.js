import React, { useEffect, useState, useTransition } from "react";
import styles from "../styles/User.module.css";
import { getSession, useSession, signOut } from "next-auth/react";
import UserData from "../app/components/userData/userData";
import LogoutBtn from "../app/components/logoutBtn/logoutBtn";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Addfriend from "../app/components/Addfriend";
import Gun from 'gun';
import EnterUsername from "../app/components/EnterUsername";
import AnotherComponent from "../app/components/AnotherComponent";
import Layout from "../app/components/Layout"
import Link from "next/link";
import FriendList from "../app/components/FriendList";

require("@solana/wallet-adapter-react-ui/styles.css");
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return { redirect: { destination: "/" } };
  }
  return {
    props: { userSession: session },
  };
}



export default function Home({ userSession }) {
  const { publicKey, disconnecting } = useWallet();
  const [isPending, startTransition] = useTransition();



  useEffect(() => {
    startTransition(() => {
      publicKey && console.log(publicKey.toBase58());
    });
  }, [publicKey]);

  useEffect(() => {
    startTransition(() => {
      disconnecting && signOut();
    });
  }, [disconnecting]);

  useEffect(() => {
    startTransition(() => {
      console.log({ disconnecting });
    });
  }, [disconnecting]);



  if (userSession) {
    return (

      // <div className={styles.body}>
      //   {!isPending && (
      //     <div>
      //       <Layout/>
      //     <div className={styles.card}>

      //       <>



      //         <UserData />
      //         <div className={styles.buttonsRow}>
      //           {publicKey ? (
      //             <WalletDisconnectButton />
      //           ) : (
      //             !disconnecting && <LogoutBtn />
      //           )}
      //         </div>
      //         <div>

      //         </div>

      //       </>
      //       </div>
      //     </div>

      //   )}
      // </div>
      <div>
        <div>  <Layout /> </div>
 
        {/* <div className={styles.buttonsRow}>
                {publicKey ? (
                  <WalletDisconnectButton />
                ) : (
                  !disconnecting && <LogoutBtn />
                )}
              </div> */}
        {/* <WalletDisconnectButton/>
              <LogoutBtn/> */}
      </div>
    );
  }
}
