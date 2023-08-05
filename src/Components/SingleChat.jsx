import React, { useState } from 'react';
import { useChatContext } from '../Context/ChatProvider';
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/chatLogics';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const { user, selectedChat, setSelectedChat } = useChatContext();

  const sendMessage = () => {};

  const typingHandler = () => {};

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
              <div>{/* Messages */}</div>
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
