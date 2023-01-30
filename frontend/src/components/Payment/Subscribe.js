import React, { useEffect, useState } from 'react';
import {Container, Heading, Text, VStack, Button, Box} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { server } from '../../redux/Store';
import { buySubscription } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
// import logo from '../../assets/images/logo.png';

const Subscribe = ({ user }) => {

    const dispatch = useDispatch();
    const [key, setKey] = useState('');
  
    const { loading, error, subscriptionId } = useSelector(
      state => state.subscription
    );
    const { error: courseError } = useSelector(state => state.course);
  
    const subscribeHandler = async () => {
      const {
        data: { key },
      } = await axios.get(`${server}/razorpayKey`);
  
      setKey(key);
      console.log(key);

      dispatch(buySubscription());
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
      if (courseError) {
        toast.error(courseError);
        dispatch({ type: 'clearError' });
      }

      console.log(subscriptionId);

      if (subscriptionId) {
        const openPopUp = () => {
          const options = {
            key,
            name: 'SkillShare',
            description: 'Get access to all premium content',
            subscription_id: subscriptionId,
            callback_url: `${server}/verifyPayment`,
            prefill: {
              name: user.name,
              email: user.email,
              contact: "",
            },
            notes: {
              address: 'Priyanshu Malaviya from SkillShare',
            },
            theme: {
              color: '#FFC800',
            },
          };
  
          const razor = new window.Razorpay(options);
          razor.open();
        };
        openPopUp();
      }
    }, [
      dispatch,
      error,
      courseError,
      user.name,
      user.email,
      key,
      subscriptionId,
    ]);
  



  return (
    <>
        <Container h={"80vh"}>
            <VStack h={"full"} alignItems="center" justifyContent={"center"} boxShadow={"lg"} spacing={2} >
                <Heading my={4} textAlign="center">Welcome</Heading>

                <Box  bg={"#319795"} boxShadow={"lg"} p={"16px 30px"} borderRadius={6} width={"80%"}>
                    <Text textAlign="center" color="white">Pro Pack At Just ₹ 999.0</Text>
                </Box>

                <Box my={4}  p={"16px 30px"} boxShadow={"lg"} borderRadius={6} width={"80%"}>
                    <Text textAlign="center" >Buy Now and Get access to all the Courses for The Lifetime.</Text>
                    <Text textAlign="center" fontSize={"28"}>₹ 999.0</Text>
                </Box>

               
                <Button  onClick={subscribeHandler} isLoading={loading}  colorScheme='teal' variant='solid' width={"80%"} >
                    Subscribe Now
                </Button>
                
                <Box my="8"  bg="blackAlpha.500" p={"16px 30px"} color="white" borderRadius={6} width={"80%"}>
                    <Text  fontSize={15}>100% Refund at Cancellation</Text>
                    <Text fontSize={10}>Terms & Conditions Apply</Text>
                </Box>
        
            </VStack>
        </Container>
    </>
  )
}

export default Subscribe