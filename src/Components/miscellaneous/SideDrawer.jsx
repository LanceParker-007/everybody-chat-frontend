import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useChatContext } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();
  const [loadinngChat, setLoadingChat] = useState();
  const { user } = useChatContext();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    return navigate('/');
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
          <Button variant={'ghost'}>
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
    </>
  );
};

export default SideDrawer;
