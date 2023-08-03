import { useChatContext } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../Components/miscellaneous/SideDrawer';
import ChatBox from '../Components/ChatBox';
import MyChats from '../Components/MyChats';

const ChatPage = () => {
  const { user } = useChatContext();

  return (
    <div style={{ width: '100%' }}>
      {/* Pehle user load hone do phir vo component */}
      {user && <SideDrawer />}
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        width={'100%'}
        height={'91.5vh'}
        p={'10px'}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
