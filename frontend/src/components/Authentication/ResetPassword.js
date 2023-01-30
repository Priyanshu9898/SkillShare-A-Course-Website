import { Container, VStack, Heading , Box, FormControl, FormLabel, Input, Button} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';


const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");


    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleCPassword = (e) => {
        setCPassword(e.target.value);
    }

    const params = useParams();
  const navigate = useNavigate();

  const { loading, message, error } = useSelector(state => state.profile);

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      navigate('/login');
    }
  }, [dispatch, error, message]);

  return (



    <>
        <Container h={"90vh"}>
          <VStack h={"full"} spacing={"8"} >
            <Heading my={6}  fontSize={"28"} textAlign={["center", "left"]}>Reset Password</Heading>
            <form style={{width: "100%"}} onSubmit={submitHandler}>
              <Box my={"4"}>
                <FormControl isRequired>
                    <FormLabel htmlFor="password" >New Password</FormLabel>
                    <Input placeholder='Enter New Password' focusBorderColor='teal.400' id="password" value={password} onChange={handlePassword} type={"password"} />
                </FormControl>
      
              </Box>  

              <Box my={"4"}>
                <FormControl isRequired>
                    <FormLabel htmlFor="password" >Confirm New Password</FormLabel>
                    <Input placeholder='Enter New Password Again' focusBorderColor='teal.400' id="cpassword" value={cpassword} onChange={handleCPassword} type={"password"} />
                </FormControl>
      
              </Box> 
              <Box my={"6"}>
                
                <Button width="100%" isLoading={loading} type="submit" colorScheme='teal' variant='solid' >Update Password</Button>
                
              </Box>
            </form>
          </VStack>
        </Container>
    </>
  )
}

export default ResetPassword