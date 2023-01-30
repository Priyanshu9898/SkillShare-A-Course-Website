import React from 'react'
import {Link} from "react-router-dom";
import { Button } from '@chakra-ui/react';

const IconBox = (props) => {
  return (
    <>
        <Link to={`/admin/${props.url}`}>
                    
            <Button variant="ghost" fontSize={"larger"} colorScheme={props.active ? "purple": ""} >
                <props.Icon style={{margin : "6px"}}/>
                {props.title}
            </Button>
        </Link>
    </>
  )
}

export default IconBox