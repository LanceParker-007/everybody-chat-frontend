import axios from "axios";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`/api/chat`);
      setChats(data.chats);
      console.log(chats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <h1 key={chat._id}>{chat.chatName}</h1>
      ))}
    </div>
  );
};

export default ChatPage;
