import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPlaylist, updateProfilePicture } from '../../redux/actions/profile';
import { cancelSubscription, myProfile } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';

const Profile = ({user}) => {


  
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);
  
  const {
    loading: subscriptionLoading,
    message: subscriptionMessage,
    error: subscriptionError,
  } = useSelector(state => state.subscription);

  const removeFromPlaylistHandler = async id => {
    await dispatch(removeFromPlaylist(id));
    dispatch(myProfile());
  };

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();

    console.log(image);
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));

    dispatch(myProfile());
  };

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription());
  };
 

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch({ type: 'clearMessage' });
      dispatch(myProfile());
    }

    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: 'clearError' });
    }
    
  }, [dispatch, error, message, subscriptionError, subscriptionMessage]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#ECC94B',
    backgroundColor: 'white',
  };

  return (
    <>
    <Container minH={"80vh"} maxW="container.sm" py="10">

      <Heading m="4" textAlign={['center', 'left']}  >Profile</Heading>
      <Stack direction={['column', 'row']} alignItems="center" justifyContent={['center', 'flex-start']} spacing={["8", "16"]} padding={"8"} >

        <VStack spacing={"4"}>
          <Avatar src={user.avatar.url} size='2xl' />
          <Button onClick={onOpen}  colorScheme='teal' variant='solid'>Change Photo</Button>
        </VStack>


        <VStack spacing={"4"} alignItems={['flex-start', 'flex-start']}>
          <HStack spacing={"3"}>
            <Text fontWeight={"bold"}>Name</Text>
            <Text >{user.name}</Text>
          </HStack>
          <HStack spacing={"3"}>
            <Text fontWeight={"bold"}>Email</Text>
            <Text >{user.email}</Text>
          </HStack>
          <HStack spacing={"3"}>
            <Text fontWeight={"bold"}>Created At</Text>
            <Text >{user.createdAt.split("T")[0]}</Text>
          </HStack>
          
          {user.role !== "admin" ? (
            <>
              <HStack spacing={"3"}>
                <Text fontWeight={"bold"}>Subscription</Text>
                { user.subscription &&  user.subscription.status === "active" ? (
                  <>

                    <Button  colorScheme='teal' variant='ghost' onClick= {cancelSubscriptionHandler}>Cancel Subscription</Button>
                  </>
                ): (
                
                <>
                  <Link to='/subscribe'>
                    <Button  colorScheme='teal' variant='ghost'>Subscribe</Button>
                  </Link>
                </>)}
                
              </HStack>
            </>
          ) : (
            <>
            </>
          )}
          
          <Stack direction={['column', 'row']} spacing={"3"} alignItems="center" px={["8", "0"]} justifyContent={['center', 'center']} my={"4"}>
              <Link to='/updateprofile'>
                <Button  colorScheme='teal' variant='solid'>Update Profile</Button>
              </Link>

              <Link to='/changepassword'>
                <Button  colorScheme='teal' variant='solid'>Change Password</Button>
              </Link>
          </Stack>

        </VStack>

      </Stack>

      <ChangePhotoBox
        changeImageSubmitHandler={changeImageSubmitHandler}
        isOpen={isOpen}
        onClose={onClose}
        loading={loading}
      />

    </Container>
    
    
    
    </>
  )
}

export default Profile

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {


  const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#ECC94B',
    backgroundColor: 'white',
  };
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImage}
                />

                <Button
                  isLoading={loading}
                  w="full"
                  colorScheme={'teal'}
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
