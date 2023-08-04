import { useEffect, useState } from 'react';
import { useChatContext } from '../Context/ChatProvider.js';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading.jsx';
import { getSender } from '../config/chatLogics.js';
import GroupModalChat from './miscellaneous/GroupModalChat.jsx';

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();
  const { user, chats, setChats, selectedChat, setSelectedChat } =
    useChatContext();

  //I updated it made my own changes
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
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
    fetchChats();
  }, [setChats, toast, user.token, fetchAgain]); //Why fetchAgain here

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
        width={'100%'}
      >
        <span>My Chats</span>
        <GroupModalChat>
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
            New Group
          </Button>
        </GroupModalChat>
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
