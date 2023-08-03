import { ViewIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useChatContext } from '../../Context/ChatProvider';

const ProfileModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useChatContext();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: 'flex' }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      {/* Iske upar tak hamne dikhaya ki ye Profile model kya return karega */}
      {/* Iske neeche Modal code jo btnClick event pe dikhega */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={'40px'}
            display={'flex'}
            justifyContent={'center'}
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Image
              borderRadius={'full'}
              boxSize={'150px'}
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{ base: '28px', md: '30px' }}
              fontFamily={'cursive'}
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
