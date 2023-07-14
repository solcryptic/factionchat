import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Gun from 'gun';
import Indexx from './NFT';
import axios from 'axios';
import Indexxx from './Metadata';
import { tmpdir } from 'os';

function Settings({ onClose, nftMintValues }) {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [removeProfilePicture, setRemoveProfilePicture] = useState(false);
  const [activeCategory, setActiveCategory] = useState('profile');
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const network = 'mainnet';

  const [contractAddresses, setContractAddresses] = useState([]);
  const contractAddress = contractAddresses.length > 0 ? contractAddresses[0].mint : '';

  const [selectedNFT, setSelectedNFT] = useState(null);

  const address = session?.user.address || '';

  useEffect(() => {
    if (address) {
      fetchAddress();
    }
  }, [address]);

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
      // console.log('Data:', data); 

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


  const tmpDirectory = tmpdir();
  
  const gun = Gun({
    peers: [
      'https://peer.wallie.io/gun'
    ],
    file: `${tmpDirectory}/radata`
  })

  useEffect(() => {
    gun.get(session?.user.address).get('username').on((data) => {
      setCurrentUsername(data);
    });
  }, [session]);

  useEffect(() => {
    gun.get(session?.user.address).get('pfp').on((data) => {
      setProfilePicture(data);
    });
  }, [session]);

  useEffect(() => {
    // Set default profile picture on component mount
    const user = gun.get(session?.user.address);
    user.get('pfp').once((data) => {
      if (!data) {
        // Set the default profile picture here
        const defaultProfilePicture = '/user.png';
        user.get('pfp').put(defaultProfilePicture);
      }
    });
  }, [session]);

  function handleSubmit(event) {
    event.preventDefault();
    const user = gun.get(session?.user.address);

    // Update the username
    if (username.trim() !== '') {
      user.get('username').put(username);
      setCurrentUsername(username);
    }
  }


  function handleChange(event) {
    setUsername(event.target.value);
  }

  function handleProfilePictureChange(event) {
    const file = event.target.files[0];
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        const user = gun.get(session?.user.address);
        user.get('pfp').put(base64Image);
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
    setProfilePicture('/user.png'); // Update the profile picture state
    setRemoveProfilePicture(true);
  }


  useEffect(() => {
    if (contractAddress) {
      fetchNFTs();
    }
  }, [contractAddress]);

  const fetchNFTs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/getNFTMetdata', { contractAddress, network });

      if (response.status !== 200) {
        throw new Error('Failed to fetch NFTs');
      }

      const data = response.data;
      // console.log('Data:', data); 

      if (typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Invalid data format: response data is not an object');
      }

      const processedNFTs = [];

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const nft = data[key];
          const { metadataUri, ...rest } = nft;

          try {
            // console.log('Metadata URI:', metadataUri); 
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

  const [walletAddress, setWalletAddress] = useState('');
  const walletAddressRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  
  useEffect(() => {
    if (session?.user?.address) {
      setWalletAddress(session.user.address);
    }
  }, [session]);

  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);
      // console.log('Wallet address copied to clipboard');
    } catch (error) {
      // console.error('Failed to copy wallet address to clipboard:', error);
    }
  };

  useEffect(() => {
    let timer;
    if (isCopied) {
      timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isCopied]);


  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
      <div className="bg-gray-700 text-white p-8 rounded-lg flex w-[1000px] min-h-[400px] h-[600px] relative">
        <button className="hover:text-gray-900 absolute top-2 right-2 p-2" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-1/4">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl font-bold mr-4 ">Settings</h2>
          </div>
          <ul className="space-y-2">
            <li
              className={`border-l-4 pl-2 ${activeCategory === 'profile' ? 'border-blue-500' : 'border-transparent'
                }`}
            >
              <a className="cursor-pointer" onClick={() => setActiveCategory('profile')}>
                Profile
              </a>
            </li>
            <li
              className={`border-l-4 pl-2 ${activeCategory === 'wallet' ? 'border-blue-500' : 'border-transparent'
                }`}
            >
              <a className="cursor-pointer" onClick={() => setActiveCategory('wallet')}>
                Wallet
              </a>
            </li>
            <li
              className={`border-l-4 pl-2 ${activeCategory === 'help' ? 'border-blue-500' : 'border-transparent'
                }`}
            >
              <a className="cursor-pointer" onClick={() => setActiveCategory('help')}>
                Help & Support
              </a>
            </li>
          </ul>
        </div>
        <div className="w-3/4 pl-8 py-10 overflow-y-auto">
          {activeCategory === 'profile' && (
            <div>
              <div>
                <p className="text-2xl font-bold mr-4 py-4">Profile</p>
                <form onSubmit={handleSubmit}>
                  <label className="mb-4">
                    New Username
                    <input
                      className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      value={username}
                      onChange={handleChange}
                    />
                  </label>

                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 mr-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="submit"
                  >
                    Submit
                  </button>
                  <p className="mb-4">Current Username: {currentUsername}</p>
                  {walletAddress && (
  <div className="flex items-center">
    <p className="mr-2">Wallet Address: {`${session?.user.address.substring(0, 8)}...${session?.user.address.slice(-8)}`}</p>
    <button onClick={copyWalletAddress}>
      <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2C7.44772 2 7 2.44772 7 3C7 3.55228 7.44772 4 8 4H10C10.5523 4 11 3.55228 11 3C11 2.44772 10.5523 2 10 2H8Z" fill={`${isCopied ? '#1E40AF' : '#000000'}`}/>
        <path d="M3 5C3 3.89543 3.89543 3 5 3C5 4.65685 6.34315 6 8 6H10C11.6569 6 13 4.65685 13 3C14.1046 3 15 3.89543 15 5V11H10.4142L11.7071 9.70711C12.0976 9.31658 12.0976 8.68342 11.7071 8.29289C11.3166 7.90237 10.6834 7.90237 10.2929 8.29289L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L10.2929 15.7071C10.6834 16.0976 11.3166 16.0976 11.7071 15.7071C12.0976 15.3166 12.0976 14.6834 11.7071 14.2929L10.4142 13H15V16C15 17.1046 14.1046 18 13 18H5C3.89543 18 3 17.1046 3 16V5Z" fill={`${isCopied ? '#1E40AF' : '#000000'}`}/>
        <path d="M15 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H15V11Z" fill={`${isCopied ? '#1E40AF' : '#000000'}`}/>
      </svg>
    </button>
  </div>
)}



                  <p className="mb-4 mt-4">Select a Profile Picture</p>
                  <div className="flex mt-4">
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
                          <img
                            src={profilePicture}
                            alt="Profile"
                            className="w-20 h-20 rounded-full hover:bg-gray-900 "
                            onClick={handleDropdownToggle}
                          />
                        ) : (
                          <div></div>
                        )}
                        {profilePicture && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-gray-300 absolute bottom-0 right-1 bg-gray-400 rounded-full  cursor-pointer"
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
                        ref={dropdownRef} className="absolute mt-20 -mx-6 py-2 w-40 bg-white rounded-md shadow-lg divide-y divide-gray-100 shadow w-34 h-34 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200">
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
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
    <div className="bg-gray-700 text-white p-8 rounded-lg flex w-[1000px] min-h-[400px] h-[600px] relative">
      <div className="mt-4">
        <p className="mb-4">Select an NFT as Profile Picture</p>
        <div className="py-2 mx-4">
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <>
             {error && <p className="text-red-500 text-sm ">Error: No NFTs found</p>}
{!error && nfts.length === 0 && <p>No NFTs available.</p>}
{!error && nfts.length > 0 && (
                <div className="flex flex-wrap">
                  {nfts.map((nft) => (
                    <div
                      key={nft.mint}
                      className={`flex items-center justify-center w-32 h-32 border-2 ${
                        selectedNFT === nft ? 'border-blue-500' : 'border-gray-300'
                      } rounded-lg m-2 cursor-pointer`}
                      onClick={() => handleNFTSelection(nft)}
                    >
                      <img src={nft.metadata.image} alt="NFT" className="w-full h-full rounded-lg" />
                    </div>
                  ))}
                </div>
              )}
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 mt-4 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={handleSetProfilePicture}
                disabled={!selectedNFT}
              >
                Set as Profile Picture
              </button>
              <button
                className="text-gray-400 hover:text-gray-300 font-medium rounded-lg text-sm px-2 py-1.5 mt-2 mb-1 focus:outline-none"
                onClick={handleNFTModalClose}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
)}


                  </div>
                  {profilePicture !== '/user.png' && (
                    <button
                      className="text-blue-500 focus:ring-4 font-medium rounded-lg text-sm px-4 mt-2"
                      onClick={handleRemoveProfilePicture}
                    >
                      Remove
                    </button>
                  )}
                </form>
                <button
                  className="text-blue hover:text-gray-700 absolute top-2 right-2 p-2"
                  onClick={onClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

            </div>
          )}
          {activeCategory === 'wallet' && (

            <div>
              <p className="text-2xl font-bold mr-4 py-4" >  Wallet </p>
              <div>
                <h2 className="text-2xl  mb-4">NFTs:</h2>
                {loading ? (
                  <div className="py-2 mx-4 ">
                    <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>

                  </div>
                ) : (
                  <>
                    {/* {error && <p>Error: {error}</p>} */}
                    {error && <p className="text-red-500 text-sm ">Error: No NFTs found</p>}
{!error && nfts.length === 0 && <p>No NFTs available.</p>}
{!error && nfts.length > 0 && (
                      <div>
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ">
                          {nfts.map((nft, index) => (
                            <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-md">
                              {nft.metadata && (
                                <img
                                  src={nft.metadata.image}
                                  alt="NFT"
                                  className="mx-auto max-w-full h-30 object-contain "
                                />
                              )}
                              <div className="mt-2 text-gray-500 ">
                                <p className="font-bold text-lg">{nft.metadata.name}</p>
                                <p className="">{nft.metadata.symbol}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {activeCategory === 'help' && (
            <div>
              <p className="text-2xl font-bold mr-4 py-4" > Help & Support </p>
              {/* <Indexx/> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;


