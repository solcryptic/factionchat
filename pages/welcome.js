import React, { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Gun from 'gun';
import axios from 'axios';
import Image from 'next/image';
import { tmpdir } from 'os';

const tmpDirectory = tmpdir();
  
const gun = Gun({
  peers: [
    'https://peer.wallie.io/gun'
  ],
  file: `${tmpDirectory}/radata`
})

function Welcome() {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [removeProfilePicture, setRemoveProfilePicture] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  // useEffect(() => {
    
  //     if (session) {
  //       const gun = Gun();
  //       gun.get("allusers").put({ username: session?.user?.address });
  //     }
   
  // }, [session]);

  useEffect(() => {
    const user = gun.get("allusers").get(session?.user.address);
    user.once((data) => {
      if (data) {
        setIsRegistered(true);
      } else {
        setIsLoading(false);
        setCurrentSlide(1);
      }
    });
  }, [session]);
  

  useEffect(() => {
    if (isRegistered) {
      router.push("/dashboard");
    }
  }, [isRegistered, router]);
  
  

  const handleSubmitUsername = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setErrorMessage('Username cannot be empty');
      return;
    }

    const user = gun.get(session?.user.address);
    user.get('username').put(username.trim());
  gun.get("allusers").get(session?.user.address).put(username.trim());
  console.log( gun.get("allusers").get(session?.user.address).put(username.trim()))
    setCurrentSlide(2);
  };

  useEffect(() => {
    // Set default profile picture on component mount
    if (session) {
      const user = gun.get(session.user.address);
      user.get('pfp').once((data) => {
        if (!data) {
          // Set the default profile picture here
          const defaultProfilePicture = '/user.png';
          user.get('pfp').put(defaultProfilePicture);
          setProfilePicture(defaultProfilePicture); // Update the state with the default picture
        } else {
          setProfilePicture(data); // Set the existing profile picture in the state
        }
      });
    }
  }, [session]);

  const handleSaveProfilePicture = () => {
    const user = gun.get(session?.user.address);
    user.get('pfp').put(profilePicture);
    router.push("/dashboard");
  };

  function handleProfilePictureChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setProfilePicture(base64Image);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleRemoveProfilePicture() {
    // Check if the profile picture is the default
    if (profilePicture === '/user.png') {
      return; // Do nothing if it's the default picture
    }

    const user = gun.get(session?.user.address);
    user.get('pfp').put('/user.png'); // Set default profile picture immediately
    setRemoveProfilePicture(true);
  }

  const network = 'mainnet';

  const [contractAddresses, setContractAddresses] = useState([]);
  const contractAddress = contractAddresses.length > 0 ? contractAddresses[0].mint : '';

  const [selectedNFT, setSelectedNFT] = useState(null);

  const address = session?.user.address || '';

  const fetchAddress = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('/api/getNFTs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, network }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch NFTs');
      }
  
      const data = await response.json();
  
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
  
  useEffect(() => {
    if (address) {
      fetchAddress();
    }
  }, [address]);

  const fetchNFTs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/getNFTMetdata', { contractAddress, network });

      if (response.status !== 200) {
        throw new Error('Failed to fetch NFTs');
      }

      const data = response.data;
    //   console.log('Data:', data); 

      if (typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Invalid data format: response data is not an object');
      }

      const processedNFTs = [];

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const nft = data[key];
          const { metadataUri, ...rest } = nft;

          try {
            console.log('Metadata URI:', metadataUri); // Log the metadata URI
            const metadataResponse = await axios.get(metadataUri, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const processedNFT = { ...rest, metadata: metadataResponse.data };
            processedNFTs.push(processedNFT);
          } catch (error) {
            console.error('Failed to fetch metadata:', error);
            // You can handle the error as per your requirements
          }
        }
      }

      setNFTs(processedNFTs);
    } catch (error) {
      setError(error.message);
      console.error('Fetch NFTs error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contractAddress) {
      fetchNFTs();
    }
  }, [contractAddress, fetchNFTs]);
  

  

  useEffect(() => {
    fetchNFTs();
  }, []);

  const handleNFTSelection = (nft) => {
    if (selectedNFT === nft) {
      setSelectedNFT(null); // Unselect the NFT if it was already selected
    } else {
      setSelectedNFT(nft); // Select the NFT if it was not already selected
    }
  };
  

  function handleSetProfilePicture() {
    if (selectedNFT) {
      const user = gun.get(session?.user.address);
      user.get('pfp').put(selectedNFT.metadata.image); // Save selected NFT image as profile picture in Gun.js
      setProfilePicture(selectedNFT.metadata.image); // Update the profile picture state
      setSelectedNFT(null); // Reset selectedNFT state
      setIsNFTModalOpen(false); // Close the popup
    }
  }

  


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleDropdownToggle() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const [isNFTModalOpen, setIsNFTModalOpen] = useState(false);


  function openNFTSelection() {
    setIsNFTModalOpen(true);
  }

  function handleNFTModalClose() {
    setIsNFTModalOpen(false);
  }

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="max-w-md w-full">
        {currentSlide === 1 && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-center">
              Welcome, <span className="text-sm">{session?.user.address}!</span>
            </h1>
            <form onSubmit={handleSubmitUsername} className="space-y-4">
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  @
                </span>
                <input
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Next
                </button>
                </div>
            </form>
          </div>
        )}

        {currentSlide === 2 && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              Welcome, <span className="text-xl">{username}!</span>
            </h1>
            <p className="text-center">Select a Profile Picture</p>
            {/* <p className="mb-4">Select a Profile Picture</p> */}
                  <div className="flex  mt-4 justify-center">
                    <label className="flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-full cursor-pointer"
                    >
                      {/* <input
                     className="hidden"
                     type="file"
                     accept="image/*"
                     onChange={handleProfilePictureChange}
                   /> */}









                      <div className="relative inline-block">
                        {profilePicture ? (
                         <Image src={profilePicture} alt="Profile" width={40} height={40} className="rounded-full hover:bg-gray-900" onClick={handleDropdownToggle} />
                        ) : (
                          <div></div>
                        )}
                        {profilePicture && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-gray-300 absolute bottom-2 right-5 bg-gray-400 rounded-full  cursor-pointer"
                            viewBox="0 0 24 24"
                            id="edit"
                          >
                            <path d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"></path>
                          </svg>
                        )}
                      </div>
                    </label>
                    {isDropdownOpen && (
                      <div
                        ref={dropdownRef} className="absolute mt-40 -mx-6 py-2 w-40 bg-white rounded-md shadow-lg divide-y divide-gray-100 shadow w-34 h-34 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200">
                        <button

                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded w-full"
                          onClick={openNFTSelection}
                        >
                          Select NFT
                        </button>
                        <label className="block px-4 py-2  hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">
                          Select from Gallery
                          <input
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                          />
                        </label>
                      </div>
                    )}

{isNFTModalOpen && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-900">
    <div className="bg-gray-700 text-white p-8 rounded-lg flex flex-col w-96 h-96">
      <p className="mb-4 text-xl">Select an NFT as Profile Picture</p>
      {loading ? (
        <div className="flex items-center justify-center">
          <svg
            aria-hidden="true"
            className="animate-spin w-8 h-8 mr-2 text-gray-200 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG path code */}
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {error ? (
            <p className="text-red-500 text-sm">Error: No NFTs found</p>
          ) : nfts.length === 0 ? (
            <p>No NFTs available.</p>
          ) : (
            <div className="flex flex-wrap">
              {nfts.map((nft) => (
                <div
                  key={nft.mint}
                  className={`flex items-center justify-center w-32 h-32 border-2 rounded-lg m-2 cursor-pointer ${
                    selectedNFT === nft ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  onClick={() => handleNFTSelection(nft)}
                >
                  <img src={nft.metadata.image} alt="NFT" className="w-full h-full rounded-lg" />
                </div>
              ))}
            </div>
          )}
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-4 mb-2"
            onClick={handleSetProfilePicture}
            disabled={!selectedNFT}
          >
            Set as Profile Picture
          </button>
          <button
            className="text-gray-400 hover:text-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
            onClick={handleNFTModalClose}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  </div>
)}


                  </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCurrentSlide(1)}
                className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mr-2"
              >
                Back
              </button>
              <button
                onClick={handleSaveProfilePicture}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Welcome; 