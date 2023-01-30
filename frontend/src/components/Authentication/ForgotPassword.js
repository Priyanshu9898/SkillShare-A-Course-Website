import { Container, VStack, Heading , Box, FormControl, FormLabel, Input, Button} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useParams} from "react-router-dom";
import { forgetPassword } from '../../redux/actions/profile';

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const params = useParams();
  console.log(params.token);


  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const { loading, message, error } = useSelector(state => state.profile);

  const dispatch = useDispatch();
  
  const submitHandler = e => {
    e.preventDefault();
    dispatch(forgetPassword(email));
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
  }, [dispatch, error, message]);


  return (
    <>
        <Container h={"90vh"}>
          <VStack h={"full"} spacing={"8"} >
            <Heading my={6}  fontSize={"28"} textAlign={["center", "left"]}>Forgot Password</Heading>
            <form style={{width: "100%"}} onSubmit={submitHandler}>
              <Box my={"4"}>
                <FormControl isRequired>
                    <FormLabel htmlFor="email" >Email Address</FormLabel>
                    <Input placeholder='abc@gmail.com' focusBorderColor='teal.400' id="email" value={email} onChange={handleEmail} type={"email"} />
                </FormControl>
      
              </Box>  
              <Box my={"6"}>
                {/* <Link to={`/resetPassword/${params.token}`}> */}
                  <Button width="100%" type="submit" isLoading={loading} colorScheme='teal' variant='solid' >Send Reset Link</Button>
                {/* </Link> */}
              </Box>
            </form>
          </VStack>
        </Container>
    </>
  )
}

export default ForgotPassword