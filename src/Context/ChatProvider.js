import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  //state banate
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //If user not logged in push it to "/"
    if (!userInfo) {
      return navigate('/');
    } else {
      setUser(userInfo);
      return navigate('/chats');
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        //state pass kar dete
        user,
        setUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

//Custom useContext Hook, import karne mein ease kar deta hai
//export const ChatState = ()=>{
// return useContext(ChatContext);
// }
const useChatContext = () => {
  return useContext(ChatContext);
};

export { ChatContextProvider, useChatContext };
