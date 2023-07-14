import { useEffect, useState, useRef } from 'react';
import Gun from 'gun';
import { useSession } from 'next-auth/react';
import EmojiPicker from 'emoji-picker-react';
import { tmpdir } from 'os';

const tmpDirectory = tmpdir();

const gun = Gun({
  peers: [
    'https://peer.wallie.io/gun'
  ],
  file: `${tmpDirectory}/radata`
})


function Chat({ userAddress, friend }) {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [friendAddress, setFriendAddress] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friendProfilePicture, setFriendProfilePicture] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const isUserMessage = (from) => from === session?.user.address;

  const chatId = [session?.user.address, friendAddress].sort().join('-');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (friend && friend.address) {
      setFriendAddress(friend.address);
      setFriendName(friend.name);
    }
  }, [friend]);

  useEffect(() => {
    if (!friendAddress) return;
  
    const friendProfilePictureUrl = gun.get(friendAddress).get('pfp');
    friendProfilePictureUrl.on((data) => {
      setFriendProfilePicture(data);
      // console.log(data);
    });
  
    return () => {
      setFriendProfilePicture('');
    };
  }, [friendAddress]);
  

  useEffect(() => {
    if (!friendAddress) return;

    const chatId = [session?.user.address, friendAddress].sort().join('-');
    const chat = gun.get(chatId).map();

    const onMessage = (message, id) => {
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some((prevMessage) => prevMessage.id === id);
    
        if (!messageExists) {
          const newMessages = [...prevMessages, { id, ...message }];
          return newMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        }
    
        return prevMessages;
      });
    };
    

    chat.on(onMessage);

    return () => {
      chat.off(onMessage);
      setMessages([]);
    };
  }, [session?.user.address, friendAddress]);

  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target) &&
        event.target.getAttribute('aria-label') !== 'emoji-picker-button'
      ) {
        setShowEmojiPicker(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutsideDropdown);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    const newMessage = {
      content: message,
      timestamp: new Date().toISOString(),
      from: session?.user.address,
    };
    gun.get(chatId).set(newMessage);
    setMessage('');
  };

  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div className="bg-gray-900 min-h-screen h-screen text-white">
    <div className="container mx-auto py-4 flex flex-col h-full">

    {/* <div className="flex items-center">
{friendProfilePicture && (
  <img src={friendProfilePicture} alt="Profile" className="w-12 h-12 rounded-full bg-white mx-4 -mt-2" />
)}
<h1 className="text-2xl text-3xl font-extrabold bg-gray-900 -mt-4  px-4 text-white">
  {friendName}
</h1>
</div> */}

<div className="flex items-center px-12 -mt-2 ">
{friendProfilePicture && (
  <img src={friendProfilePicture} alt="Profile" className="w-12 h-12 rounded-full" />
)}
<h1 className="px-4 text-3xl font-extrabold ">
  {friendName}
</h1>
</div>






      <ul className="mx-2 text-lg flex-1 overflow-y-auto no-scrollbar">
        {messages.map((message, index) => (
          <li key={index} className="mb-4">
            <div className={`flex ${isUserMessage(message.from) ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`rounded shadow ${
                  isUserMessage(message.from)
                    ? 'bg-blue-500 rounded-br-none ml-4'
                    : 'bg-black rounded-bl-none mr-4'
                }`}
              >
                <p className="p-2 break-all">{message.content}</p>
              </div>
            </div>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <form onSubmit={sendMessage} className="flex items-center px-3 py-2 -my-2 rounded-lg bg-gray-50 dark:bg-gray-700">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full outline-none text-white bg-transparent placeholder-gray-500 pr-5"
          />
        </div>
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 ml-2 text-2xl text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            onClick={toggleEmojiPicker}
            aria-label="emoji-picker-button"
          >
            😀
          </button>
          <button
            type="submit"
            className={`ml-2 inline-flex justify-center p-2 text-white rounded-lg cursor-pointer hover:text-gray-900 dark:hover:text-white ${message.trim() !== '' ? 'bg-blue-600' : 'text-gray-500'}`}
          >
            Send
          </button>
        </div>
      </form>
      {showEmojiPicker && (
        <div className="absolute bottom-14 right-4" ref={chatContainerRef}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  </div>
  );
}

export default Chat;




















































