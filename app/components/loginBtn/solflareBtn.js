import React, { useState } from "react";
import { Button } from "@web3uikit/core";
import { signIn } from "next-auth/react";
import { apiPost } from "../../utils/apiPost";
import base58 from "bs58";

export default function SolflareBtn() {
  const [error, setError] = useState(null);

  const authenticate = async () => {
    try {
      if (!window.solflare) {
        setError("No wallet detected");
        return;
      }

      const provider = window.solflare;
      const resp = await provider.connect();
      const address = provider.publicKey.toString();
      const chain = "devnet";
      const account = {
        address: address,
        chain: chain,
        network: "solana",
      };

      const { message } = await apiPost("api/auth/request-message", account);
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await provider.signMessage(encodedMessage, "utf8");
      const signature = base58.encode(signedMessage.signature);

      await signIn("credentials", {
        message,
        signature,
        redirect: false,
      });
      push("/");
    } catch (e) {
      setError("Error occurred while authenticating");
    }
  };

  return (
    <>
      {error && <p className="text-white">{error}</p>}
      <a
        href="#"
        className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
        onClick={() => authenticate()}
      >
        <span className="flex-1 ml-3 whitespace-nowrap">Solflare</span>
      </a>
    </>
  );
}

