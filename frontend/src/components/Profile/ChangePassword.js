import { Container, VStack, Heading , Box, FormControl, Input, Button} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { changePassword } from '../../redux/actions/profile';


const ChangePassword = () => {


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
  


    const handleOldPassword = (e) => {
        setOldPassword(e.target.value);
    }

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const btn = {
        display: "flex", 
        alignItems:"center", 
        justifyContent: "center",
        width: "100%",
        marginTop: "12px",
    }

    const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
  };

  const { loading, message, error } = useSelector(state => state.profile);

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
        <Container h={"80vh"}>
            
            <VStack h={"full"} alignItems={["center", "center"]} justifyContent={["center", "center"]} spacing="6">
                <Heading  fontSize={"32"} textAlign="center">Change Password</Heading>

                <form onSubmit={submitHandler} style={{width: '100%'}} my={"4"}>
                    <Box>
                        <FormControl isRequired>
                            
                            <Input placeholder='Enter Old Password' css={{border: "1px solid teal"}} focusBorderColor='teal.400' id="email" value={oldPassword} onChange={handleOldPassword} type={"password"} />
                        </FormControl>
                    </Box>
                    <Box my={"4"}>
                        <FormControl isRequired>
                            
                            <Input placeholder='Enter New Password' css={{border: "1px solid teal"}} id="password" focusBorderColor='teal.400' value={newPassword} onChange={handleNewPassword} type={"password"} />
                        </FormControl>
                    </Box>
                    
                    

                    
                    <Box my={"4"} css = {btn}>
                        
                        <Button colorScheme='teal' isLoading={loading} type="submit" variant='solid'  width={"50%"} >Change Password</Button>
                        
                    </Box>

                    <Box my={"4"} css = {btn}>
                        <Link to="/profile">
                            <Button variant="link" color={"teal"}  className="forgot-password" style={{textDecoration: "none"}}>Go to Profile</Button>
                        </Link>
                    </Box>
                    

                </form>
            </VStack>
        </Container>
    </>
  )
}

export default ChangePassword