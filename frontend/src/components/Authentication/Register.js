import React, {useState} from 'react'
import { Container, VStack , Box, Input, Button, FormControl, FormLabel, Heading, Avatar} from '@chakra-ui/react';
import {Link} from "react-router-dom";
import "./auth.css";
import { useDispatch } from 'react-redux';
import { registerAction } from '../../redux/actions/user';

const fileUploadStyle = {
    "&::file-selector-button": {
        cursor: "pointer",
        marginLeft: "-5%",
        width: "110%",
        border: "none",
        height : "100%",
        color : "#319795",
        backgroundColor: "white"
    }
}

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [img, setImg] = useState('');
    const [imgPrev, setImgPrev] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleCPassword = (e) => {
        setCPassword(e.target.value);
    }

    const imageHandler = (e) => {
        const file = e.target.files[0];
        // console.log(file)
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImgPrev(reader.result);
            // console.log(imgPrev);
            setImg(file);
        }
    }

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("click");
        const myForm = new FormData();

        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("file", img);

        dispatch(registerAction(myForm));


    }

  return (
    <>
        <Container h={"95vh"}>
            
            <VStack h={"full"} my={["30px"]} justifyContent="center">
                <Heading   fontSize={"28"} textAlign={["center", "left"]}>Registration</Heading>
                <Box my={4} display={"flex"}  justifyContent="center">
                    <Avatar size={"2xl"} src={imgPrev}/>
                </Box>
                <form style={{width: '100%'}} onSubmit={handleSubmit}>
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
                            <FormLabel htmlFor="password" >Password</FormLabel>
                            <Input placeholder='Enter Your Password' id="password" focusBorderColor='teal.400' value={password} onChange={handlePassword} type={"password"} />
                        </FormControl>
                    </Box>
                    <Box my={"4"}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="confirm password" >Confirm Password</FormLabel>
                            <Input placeholder='Enter Your Password Again' id="cpassword" focusBorderColor='teal.400' value={cpassword} onChange={handleCPassword} type={"password"} />
                        </FormControl>
                    </Box>
                    <Box my={"4"}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="Choose Avatar" >Choose Avatar</FormLabel>
                            <Input  id="avatar" css={fileUploadStyle} focusBorderColor='teal.400' accept='image/*'  onChange={imageHandler} type={"file"} />
                        </FormControl>
                    </Box>
                    
                    <Box my={"4"}>
                        
                        <Button type="submit" colorScheme='teal' variant='solid' >Register</Button>
                        
                    </Box>
                    <Box my={"4"}>
                        <span>Existing User? {' '}</span>
                        <Link to="/login">
                            <Button variant="link" color={"teal"} className="registerTxt" style={{textDecoration: "none"}}>Login</Button>
                        </Link>
                        {" "}here
                    </Box>

                </form>
            </VStack>
        </Container>

    </>
  )
}

export default Register;