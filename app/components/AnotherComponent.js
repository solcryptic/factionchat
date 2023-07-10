import { useState, useEffect } from 'react';
import Gun from 'gun';

function AnotherComponent() {
  const [allUsers, setAllUsers] = useState(null);

  useEffect(() => {
    const gun = Gun({
      peers: ['https://peer.wallie.io/gun'],
    });

    
    gun.get('allusers').on((data) => {
      setAllUsers(JSON.stringify(data));
    });
  }, []);

  return (
    <div>
        <p>
      {allUsers}
      </p>
    </div>
  );
}

export default AnotherComponent;


