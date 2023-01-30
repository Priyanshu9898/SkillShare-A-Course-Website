import React from 'react'
import {Grid, Box, Text, Heading, Stack, HStack} from "@chakra-ui/react";
import { RiArrowDownFill, RiArrowUpFill } from 'react-icons/ri';


const DataBox = (props) => {
  return (
    <>
        <Box w={['full', '20%']} boxShadow={"-2px 0 10px rgba(107, 70, 193, 0.5)"} p="8" borderRadius={"lg"}>
            <Text fontWeight={"bold"}>{props.title}</Text>
            <HStack spacing={"6"}>
                <Text fontSize={"2xl"}>{props.qty}</Text>
                <HStack >
                    <Text>{props.qtyPercent}</Text>
                    {props.profit ? (
                        <RiArrowUpFill color="green"/>
                    ): (
                        <RiArrowDownFill color="red"/>
                    )}
                </HStack>
            </HStack>
            <Text opacity={0.6}>Since Last Month</Text>
        </Box>
    </>
  )
}

export default DataBox