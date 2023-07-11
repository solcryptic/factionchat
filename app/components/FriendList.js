import { useEffect, useState, Suspense, useRef } from 'react';
import Gun from 'gun';
import { useSession } from 'next-auth/react';
import Chat from './Chat';
import Addfriend from './Addfriend';
import Settings from './Settings';
import { useWallet } from "@solana/wallet-adapter-react";
import LogoutBtn from './logoutBtn/logoutBtn';
import EnterUsername from './EnterUsername';

const gun = Gun({
  peers: ['https://peer.wallie.io/gun'],
});

function FriendList() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState({ name: '', address: '' });
  const [showSettings, setShowSettings] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [friendProfilePicture, setFriendProfilePicture] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const friendList = gun.get(session?.user.address + 'friends');
    friendList.map().on((data, key) => {
      const address = key;
      const name = data;
  
      setFriends((prevFriends) => {
        const friendIndex = prevFriends.findIndex((f) => f.address === address);
        if (friendIndex !== -1) {
          // Update the existing friend's name
          const updatedFriend = { ...prevFriends[friendIndex], name };
          const updatedFriends = [...prevFriends];
          updatedFriends[friendIndex] = updatedFriend;
          return updatedFriends;
        } else {
          // Add a new friend
          const friend = { address, name };
          return [...prevFriends, friend];
        }
      });

      

      // Fetch the profile picture for each friend
      const friendProfilePictureUrl = gun.get(address).get('pfp');
      friendProfilePictureUrl.on((data) => {
        setFriends((prevFriends) => {
          const friendIndex = prevFriends.findIndex((f) => f.address === address);
          if (friendIndex !== -1) {
            const updatedFriend = { ...prevFriends[friendIndex], profilePicture: data };
            const updatedFriends = [...prevFriends];
            updatedFriends[friendIndex] = updatedFriend;
            return updatedFriends;
          }
          return prevFriends;
        });
      });
    });
  
    // Unsubscribe from friend list updates when the component unmounts
    return () => {
      friendList.off();
    };
  }, [session]);
  

  useEffect(() => {
    // Listen for changes in the friend's name continuously
    const friend = gun.get(selectedFriend.address);
    friend.get('username').on((name) => {
      setFriends((prevFriends) => {
        const friendIndex = prevFriends.findIndex((f) => f.address === selectedFriend.address);
        if (friendIndex !== -1) {
          // Update the existing friend's name
          const updatedFriend = { ...prevFriends[friendIndex], name };
          const updatedFriends = [...prevFriends];
          updatedFriends[friendIndex] = updatedFriend;
          return updatedFriends;
        }
        return prevFriends;
      });
    });

    // Unsubscribe from the friend's name updates when the component unmounts
    return () => {
      friend.get('username').off();
    };
  }, [selectedFriend]);

  useEffect(() => {
    // Fetch the profile picture data from Gun.js
    gun.get(session?.user.address).get('pfp').on((data) => {
      setProfilePicture(data);
    });

    if (session?.user?.address) {
      gun.get(session.user.address).get('username').on((data) => {
        setUsername(data);
      });
    }
  }, [session]);

  const handleFriendClick = (e) => {
    const name = e.currentTarget.getAttribute('name');
    const address = e.currentTarget.getAttribute('address');
    setSelectedFriend({ name, address });

  
  };

  

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  const handleClickOutsideDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideDropdown, true);
    return () => {
      document.removeEventListener('click', handleClickOutsideDropdown, true);
    };
  }, []);

  return (
    <div className="flex flex-row">
      <div className="sidebar w-1/4 bg-gray-200 h-screen text-center dark:text-white dark:bg-gray-800">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="py-2 ">
              <Addfriend />
            </div>
            <h1 className="p-4 font-bold text-lg font-extrabold">My Friends</h1>
            
            {friends.map((friend) => (
  <div
    key={friend.address}
    name={friend.name}
    address={friend.address}
    onClick={handleFriendClick}
    className="p-4 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 cursor-pointer text-center hover:rounded-lg "
  >
    <div className="flex items-center justify-center mb-2">
      {friend.profilePicture ? (
        <img className="w-8 h-8 rounded-full mr-2" src={friend.profilePicture} alt="friend photo" />
      ) : (
        <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
      )}
      <p className="font-semibold">{friend.name}</p>
    </div>
    <p className="text-gray-600">{`${friend.address.substring(0, 4)}...${friend.address.slice(-4)}`}</p>
  </div>
))}

          
          </div>
          <div className="flex flex-row justify-center items-center p-2 py-4">
            <div className="relative" ref={dropdownRef}>
              <button
                id="dropdownAvatarNameButton"
                data-dropdown-toggle="dropdownAvatarName"
                className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
                type="button"
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                {profilePicture ? (
                  <img className="w-8 h-8 mr-2 rounded-full" src={profilePicture} alt="user photo" />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                )}
                {username}
                <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
              </button>
              {showDropdown && (
              <div
              id="dropdownAvatarName"
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow text-center absolute px-2 bottom-full mt-2 bottom-11 left-1/2 transform -translate-x-1/2 dark:bg-gray-700 dark:divide-gray-600 w-44"
            >
            
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="font-medium">{username}</div>
                    <div className="truncate"> {`${session?.user.address.substring(0, 4)}...${session?.user.address.slice(-4)}`} </div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownAvatarNameButton">
                    {/* <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li> */}
                    <li>
                      <a href="#" 
                onClick={toggleSettings}
                className="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    {/* <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li> */}
                  </ul>
                  <div className="py-2">
      <LogoutBtn
        href="#"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
      >
        Sign out
      </LogoutBtn>
    </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4">
        {!selectedFriend.address ? (
          <div className="flex items-center justify-center h-full bg-gray-900 text-white">
            <p>Select a chat to talk</p>
          </div>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <Chat userAddress={session?.user.address} friend={selectedFriend} />
          </Suspense>
        )}
      </div>
      {showSettings && <Settings onClose={handleSettingsClose} />}
    </div>
  );
}


export default FriendList;


















