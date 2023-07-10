import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Gun from 'gun';
import Addfriend from './Addfriend';

function EnterUsername() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');

  const gun = Gun({
    peers: ['https://peer.wallie.io/gun'],
  });

  useEffect(() => {
    gun.get(session?.user.address).get("username").on((data) => {
      setCurrentUsername(data);
    });
  }, [session]);

  function handleSubmit(event) {
    event.preventDefault();
    const user = gun.get(session?.user.address);
    user.put({ username: username });
  }

  function handleChange(event) {
    setUsername(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
       New Username
        <input type="text" value={username} onChange={handleChange} />
      </label>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 mr-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="submit">Submit</button>
      <p>
        Current Username: {currentUsername}
      </p>
      <p> Wallet address: {session?.user.address} </p>
    </form>
  );
}

export default EnterUsername;




