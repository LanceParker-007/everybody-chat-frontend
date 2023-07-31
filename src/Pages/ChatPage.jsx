import axios from 'axios';
import { useChatContext } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';

const ChatPage = () => {
  const { user } = useChatContext();

  return (
    <div style={{ width: '100%' }}>
      {/* {user && <SideDrawer/>} */}
      <Box>
        {/* {user && <MyChats/>} */}
        {/* {user && <ChatBox/>} */}
      </Box>
    </div>
  );
};

export default ChatPage;
