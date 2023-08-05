import React, { useEffect, useState } from 'react';
import { useChatContext } from '../Context/ChatProvider';
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/chatLogics';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import axios from 'axios';
import './styles.css';
import ScrollableChat from './ScrollableChat';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const toast = useToast();

  const { user, selectedChat, setSelectedChat } = useChatContext();

  const sendMessage = async event => {
    if (event.key === 'Enter' && newMessage && newMessage.length !== 0) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage('');

        const { data } = await axios.post(
          '/api/message',
          { content: newMessage, chatId: selectedChat._id },
          config
        );

        console.log(data);

        setMessages([...messages, newMessage]);
      } catch (error) {
        toast({
          title: 'Error occured!',
          description: 'Failed to send message',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
    }
  };

  const fetchAllMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      console.log(messages);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error occured when fetching the chat!',
        description: 'Failed to fetch the chat!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  useEffect(() => {
    fetchAllMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  const typingHandler = e => {
    setNewMessage(e.target.value);

    //Typing indicator Logic
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            w="100%"
            fontFamily={'cursive'}
            display={'flex'}
            justifyContent={{ base: 'space-between' }}
            alignItems={'center'}
            color={'black'}
          >
            <IconButton
              colorScheme="blue"
              display={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat('')}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {/* Groupchat nahi hai to sender ki profile dikha rahe */}
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {/* Groupchat hai to uski settings dikha rahe */}
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchAllMessages={fetchAllMessages}
                />
              </>
            )}
          </Text>
          {/*Chat Box here */}
          <Box
            display={'flex'}
            flexDir={'column'}
            justifyContent={'flex-end'}
            p={3}
            bg={'#E8E8E8'}
            w={'100%'}
            h={'100%'}
            borderRadius={'lg'}
            overflowY={'hidden'}
          >
            {/* All chat messages here... */}
            {loading ? (
              <Spinner
                size={'xl'}
                w={20}
                h={20}
                alignSelf={'center'}
                margin={'auto'}
                color="black"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant={'filled'}
                backgroundColor={'white'}
                color={'black'}
                placeholder="Enter a message..."
                sx={{
                  '::placeholder': {
                    color: 'gray.400', // Specify the color of the placeholder text
                  },
                }}
                _hover={{
                  borderColor: 'blue.300', // Border color on hover
                }}
                onChange={typingHandler}
                value={newMessage}
                focusBorderColor="blue.500" // Specify the focus border color
                _focus={{
                  backgroundColor: 'white',
                  boxShadow: 'outline', // Apply a focus ring when the input is focused
                }}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          h={'100%'}
          w={'100%'}
        >
          <Text fontSize={'3xl'} pb={3} fontFamily={'cursive'} color={'black'}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
