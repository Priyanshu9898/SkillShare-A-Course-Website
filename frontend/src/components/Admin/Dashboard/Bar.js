import React from 'react'
import {Grid, Box, Text, Heading, Stack, HStack, Progress} from "@chakra-ui/react";


const Bar = (props) => {
  return (
    <>
    <Box py="4" px={["0", "20"]}>
        <Heading size="sm" mb="2">{props.title}</Heading>
        <HStack width={"full"} alignItems={"center"}>
            <Text>{props.profit ? "0%" : `-${props.value}%`}</Text>
            <Progress colorScheme="purple" size='lg' width={"full"} value={props.profit ? `${props.profit}`: ""}/>
            <Text>100%</Text>
        </HStack>
    </Box>
    </>
  )
}

export default Bar