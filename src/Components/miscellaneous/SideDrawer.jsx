import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useChatContext } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';

const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, setSelectedChat, chats, setChats } = useChatContext();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  //Logout Handler
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    return navigate('/');
  };

  //Handle search
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please enter something',
        status: 'warning',
        duration: 1000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `api/user/allusers?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Error occured!',
        description: 'Failed to load the search results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
      setLoading(false);
    }
  };

  // Access chat funtion
  const accessChat = userId => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = axios.post('/api/chat', { userId }, config);

      //What is this doing
      if (!chats.find(c => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Error fetching the chat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
    }
  };

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={'100%'}
        bg={'blackAlpha.200'}
        p="5px 10px 5px 10px"
        borderWidth={'5px'}
      >
        {/* 1st part */}
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          {/* Jahan onOpen doge, jisko isOpen dia hoga(modal ya drawer vo khul jayega) */}
          <Button variant={'ghost'} onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text
              display={{ base: 'none', md: 'flex' }}
              children="Search User"
            />
          </Button>
        </Tooltip>
        {/* 2nd part */}
        <Text fontSize={'2xl'} children="Everybody-Chat" />
        {/* 3rd part */}
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={'2xl'} margin={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={'sm'}
                cursor={'pointer'}
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      {/* Below this is out drawer component  */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display={'flex'} padding={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  handleSearch();
                }}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {/* Displaying the search results */}
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult &&
              searchResult.map(user => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml={'auto'} display={'flex'} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
