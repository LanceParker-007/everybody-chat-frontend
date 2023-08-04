import React from 'react';
import { useChatContext } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  // In chat provider we have user, his/her chats, his/her selectedChat
  const { selectedChat } = useChatContext();

  return (
    <Box
      display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems={'center'}
      flexDir={'column'}
      p={3}
      bg={'white'}
      w={{ base: '100%', md: '68%' }}
      borderRadius={'lg'}
      borderWidth={'1px'}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
