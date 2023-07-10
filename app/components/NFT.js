import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Indexxx from "./Metadata";
import Settings from "./Settings";

const Indexx = () => {
  const [contractAddresses, setContractAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: session, status } = useSession();
  const address = session?.user.address || "";
  const network = "mainnet";

  useEffect(() => {
    if (address) {
      fetchAddress();
    }
  }, [address]);

  const fetchAddress = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/getNFTs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, network }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch NFTs");
      }

      const data = await response.json();
      console.log("Data:", data); // Log the response to inspect the data structure

      // Extract the relevant properties from the data object
      const extractedNFTs = data.map((item) => ({
        associatedTokenAddress: item.associatedTokenAddress,
        mint: item.mint,
      }));

      setContractAddresses(extractedNFTs);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
   
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {nfts.length > 0 && (
        <div>
          <ul>
            {nfts.map((nft, index) => (
              <li key={index}>
                <p>contract address: {nft.mint}</p>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      <div >
        {/* <Indexxx nftMintValues={nfts.length > 0 ? nfts[0].mint : ""} /> */}

        <Settings nftMintValues={contractAddresses.length > 0 ? contractAddresses[0].mint : ""} />
      </div>
    </div>
  );
};

export default Indexx;
