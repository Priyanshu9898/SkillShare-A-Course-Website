import React, {useEffect, useState} from 'react'
import { Container, VStack , Box, Input, Button, FormControl, FormLabel, Heading, Textarea } from '@chakra-ui/react';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { courseRequest } from '../../redux/actions/other';
import { toast } from 'react-hot-toast';

const Request = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const [name, setName] = useState("");


    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    const dispatch = useDispatch();
  const {
    loading,
    error,
    message: stateMessage,
  } = useSelector(state => state.other);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, message));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (stateMessage) {
      toast.success(stateMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, stateMessage]);

  return (
    <>
        <Container h={"95vh"}>
            
            <VStack h={"full"}  justifyContent="center">
                <Heading   fontSize={"28"} textAlign={["center", "left"]}>Course Request</Heading>
                
                <form style={{width: '100%'}} onSubmit={submitHandler}>
                    <Box my={"4"}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="name" >Name</FormLabel>
                            <Input placeholder='Enter your name' id="name" focusBorderColor='teal.400' value={name} onChange={handleName} type={"text"} />
                        </FormControl>
                    </Box>

                    <Box my={"4"}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="email" >Email Address</FormLabel>
                            <Input placeholder='abc@gmail.com' id="email" focusBorderColor='teal.400' value={email} onChange={handleEmail} type={"email"} />
                        </FormControl>
                    </Box>
                    <Box my={"4"}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="message" >Message</FormLabel>
                            <Textarea  placeholder='Your Course Request....' id="message" focusBorderColor='teal.400' value={message} onChange={handleMessage} type={"text"} />
                        </FormControl>
                    </Box>
                    
                    
                    <Box my={"4"}>
                        
                        <Button colorScheme='teal' variant='solid' type="submit">Submit</Button>
                        
                    </Box>
                    <Box my={"4"}>
                        <span>Have an Query, Contact Us? {' '}</span>
                        <Link to="/contact">
                            <Button variant="link" color={"teal"} className="registerTxt" style={{textDecoration: "none"}}>Click</Button>
                        </Link>
                        {" "}here
                    </Box>

                </form>
            </VStack>
        </Container>

    </>
  )
}

export default Request;