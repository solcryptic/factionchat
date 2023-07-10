import { useState, useEffect } from 'react'
import Gun from 'gun'
import { useSession } from "next-auth/react";

const gun = Gun({
  peers: [
    'https://peer.wallie.io/gun'
  ]
})

const Addfriend = ({ username }) => {
  const [friendSearch, setFriendSearch] = useState('')
  const { data: session, status } = useSession();
  const [friendList, setFriendList] = useState(null);
  const [error, setError] = useState(null); // Add an error state

  const handleFriendSearchButton = (event) => {
    event.preventDefault();

    if (friendSearch === session?.user.address) {
      setError('Cannot Add Yourself!'); // Set the error message
      setFriendSearch('')
    }
    else {
      let friendAlreadyExist = false;
      gun.get(session?.user.address + 'friends').on(data => {
        for (const prop in data) {
        //   console.log(prop);
          if (friendSearch === prop) {
            // console.log(prop);
            friendAlreadyExist = true;
            break;
          }
          else {
            friendAlreadyExist = false;
          }
        }
      })

      if (friendAlreadyExist) {
        setError('Friend Already Exists!'); // Set the error message
      }

      else {
        gun.get("allusers").once(data => {
          let userExists = false;
          for (const prop in data) {

            // console.log(prop);

            if (friendSearch === prop) {

              let friendObject = {}
              let friendObjectForYourFriend = {}
              let messageDBNameObject = {}
              let messageDBNameObjectForYourFriend = {}
              friendObject[friendSearch] = data[prop];
              messageDBNameObject[friendSearch + 'dbname'] = (session?.user.address + friendSearch)
              gun.get("currentUsername").once(data => {
                for (const prop in data.username) {
                  const currentUserName = data.username;
                  friendObjectForYourFriend[session?.user.address] = currentUserName;
                //   console.log(friendObjectForYourFriend)
                }
              });

              messageDBNameObjectForYourFriend[session?.user.address + 'dbname'] = (session?.user.address + friendSearch)
              gun.get(session?.user.address + 'friends').put(friendObject)
              gun.get(friendSearch + 'friends').put(friendObjectForYourFriend)
              gun.get(session?.user.address + 'messagesdbnames').put(messageDBNameObject)
              gun.get(friendSearch + 'messagesdbnames').put(messageDBNameObjectForYourFriend)

              // gun.get(md5(address + friendSearch)).put({ null: { address: null, message: null, time: null } })
              userExists = true;
              setFriendSearch('')
              setError(null); // Clear the error state
              break;
            }
            else {
              // console.log('i was here')
              userExists = false;
            }
          }
          if (!userExists) {
            setError("User Doesn't Exist!"); // Set the error message
            setFriendSearch('')
          }
          else {
            setError('Friend Added Successfully!!'); // Set the success message
            setFriendSearch('')
          }
        })
      }
    }
  }

  gun.get(session?.user.address + 'friends').once(data => {
    let userExists = false;
    for (const prop in data) {
    //   console.log(prop);
    }
  })

  useEffect(() => {
    // This code will be executed only on the client
    // and not during server-side rendering
    const closePopup = (event) => {
      if (event.target.classList.contains('popup-overlay')) {
        setError(null); // Clear the error state when clicked anywhere else on the screen
      }
    };

    document.addEventListener('click', closePopup);

    return () => {
      document.removeEventListener('click', closePopup);
    };
  }, [])

//   console.log(username)
  return (
    <form className="flex items-center" onSubmit={handleFriendSearchButton}>
      <label className="sr-only"></label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
          </svg>
        </div>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder='add friends... [wallet address]'
          name="name"
          value={friendSearch}
          onChange={(e) => { setFriendSearch(e.target.value) }}
        />
      </div>
      <button
        className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <span className="sr-only">Search</span>
      </button>
      {error && (
        <div className="fixed inset-0 flex items-center justify-center popup-overlay backdrop-filter backdrop-blur-sm" onClick={() => setError(null)}>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-white">{error}</p>
            <button
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300"
              onClick={() => setError(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  )
}

export default Addfriend;


