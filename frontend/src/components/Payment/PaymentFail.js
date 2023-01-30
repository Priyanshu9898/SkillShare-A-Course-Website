import React from 'react';
import {Container, VStack, Heading, Button} from "@chakra-ui/react";
// import {AiFillCloseCircle} from "react-icons/ai";
import {Link} from "react-router-dom";
import {VscChromeClose} from "react-icons/vsc";

const PaymentFail = () => {
  return (

    <>
    <Container h={"80ch"}>

        <VStack my={10} h={"full"} alignItems="center" spacing={8}>
            <Heading textAlign={"center"} >
                {/* <VscChromeClose size={"5rem"} color="red"/> */}
                <VscChromeClose size={"5rem"} color="red"/>
            </Heading>
            
            <Heading textAlign={"center"}>
                Payment Failed
            </Heading>


            <Link to="/" width={"100%"}>
                <Button colorScheme='teal' p="12px" >
                            Go to Profile
                </Button>
            </Link>
        </VStack>
    </Container>

    </>
  )
}

export default PaymentFail