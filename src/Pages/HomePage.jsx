import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Heading,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Login from '../Components/Auth/Login';
import SignUp from '../Components/Auth/SignUp';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    //If user not logged in push it to "/" route
    if (user) {
      return navigate('/chats');
    }
  }, [navigate]);

  return (
    <Container maxW={'xl'} centerContent>
      <Box
        display={'flex'}
        justifyContent={'center'}
        p={3}
        bg={'white'}
        w={'100%'}
        m={'40px 0 15px 0'}
        borderRadius={'lg'}
        borderWidth={'1px'}
      >
        <Heading
          fontFamily={'cursive'}
          fontSize={'4xl'}
          color={'black'}
          children={'Everybody-Chat'}
        />
      </Box>
      <Box
        bg={'white'}
        w={'100%'}
        p={4}
        borderRadius={'lg'}
        borderWidth={'1px'}
      >
        <Tabs variant="unstyled" color={'black'}>
          <TabList mb={'1em'}>
            <Tab
              _selected={{ color: 'white', bg: 'green.400' }}
              width={'50%'}
              p={2}
              borderRadius={'lg'}
            >
              Login
            </Tab>
            <Tab
              _selected={{ color: 'white', bg: 'blue.500' }}
              width={'50%'}
              p={2}
              borderRadius={'lg'}
            >
              SignUp
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
