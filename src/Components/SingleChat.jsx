import React from 'react';
import { useChatContext } from '../Context/ChatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/chatLogics';
import ProfileModal from './miscellaneous/ProfileModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = useChatContext();

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
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                {/* <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/> */}
              </>
            )}
          </Text>
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
