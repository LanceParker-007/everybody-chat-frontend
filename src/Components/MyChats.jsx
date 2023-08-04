import { useEffect, useState } from 'react';
import { useChatContext } from '../Context/ChatProvider.js';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading.jsx';
import { getSender } from '../src/chatLogics.js';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();
  const { user, chats, setChats, selectedChat, setSelectedChat } =
    useChatContext();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('/api/chat', config);
      setChats(data);
    } catch (error) {
      toast({
        title: 'Error occured',
        description: 'Failed to fetch the chats',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDir={'column'}
      alignItems={'center'}
      p={3}
      bg={'white'}
      w={{ base: '100%', md: '31%' }}
      borderRadius={'lg'}
      borderWidth={'1px'}
      color={'black'}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        My Chats
        <Button
          display={'flex'}
          fontSize={{
            base: '17px',
            md: '10px',
            lg: '17px',
          }}
          rightIcon={<AddIcon />}
          colorScheme="yellow"
        >
          New Group Chat
        </Button>
      </Box>
      <Box
        display={'flex'}
        flexDir={'column'}
        p={3}
        bg={'#f8f8f8'}
        w={'100%'}
        h={'100%'}
        borderRadius={'lg'}
        overflowY={'hidden'}
      >
        {chats ? (
          <Stack>
            {chats.map(chat => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor={'pointer'}
                bg={selectedChat === chat ? 'black' : '#e8e8e8'}
                color={selectedChat === chat ? 'white' : 'black'}
                px={3}
                py={2}
                borderRadius={'lg'}
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
