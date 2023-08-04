import { useChatContext } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../Components/miscellaneous/SideDrawer';
import ChatBox from '../Components/ChatBox';
import MyChats from '../Components/MyChats';
import { useState } from 'react';

const ChatPage = () => {
  const { user } = useChatContext();
  const [fetchAgain, setFetchAgain] = useState(false);

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
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
