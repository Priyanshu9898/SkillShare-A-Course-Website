import { Container, VStack, Heading , Box, FormControl, Input, Button} from '@chakra-ui/react'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { updateProfile } from '../../redux/actions/profile';
import { myProfile } from '../../redux/actions/user';


const UpdateProfile = ({user}) => {


    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    

    const btn = {
        display: "flex", 
        alignItems:"center", 
        justifyContent: "center",
        width: "100%",
        marginTop: "12px",
    }


const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(myProfile());
    navigate('/profile');
  };

  const { loading } = useSelector(state => state.profile);

  return (
    <>
        <Container h={"80vh"}>
            
            <VStack h={"full"} alignItems={["center", "center"]} justifyContent={["center", "center"]} spacing="6">
                <Heading  fontSize={"32"} textAlign="center">Update Profile</Heading>

                <form style={{width: '100%'}} my={"4"} onSubmit={submitHandler}>
                    <Box>
                        <FormControl isRequired>
                            
                            <Input placeholder='Enter Your Name' css={{border: "1px solid teal"}} focusBorderColor='teal.400' id="name" value={name} onChange={handleName} type={"text"} />
                        </FormControl>
                    </Box>
                    <Box my={"4"}>
                        <FormControl isRequired>
                            
                            <Input placeholder='Enter Your Email' css={{border: "1px solid teal"}} id="email" focusBorderColor='teal.400' value={email} onChange={handleEmail} type={"email"} />
                        </FormControl>
                    </Box>
                

                    
                    <Box my={"4"} css = {btn}>
                        
                        <Button type="submit" colorScheme='teal' isLoading={loading} variant='solid'  width={"50%"} >Change</Button>
                        
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

export default UpdateProfile