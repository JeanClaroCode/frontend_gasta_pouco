import { Box,Container, Flex, Image, VStack } from "@chakra-ui/react";
import React, { Fragment} from "react";
import logoImage from '../../../../assets/images/logo.png';
import LoginForm from "../../../../components/auth/login_form";
import '../../../../styles/login.scss'
import SwitchButton from "../../../../components/auth/home_button";

const LoginScreen = () =>  {
    return (
    <Fragment>
    <Flex justify="center" align="center" height="100vh" className="home">
        <Container centerContent>
            <VStack align="center" spacing={0}>
                <Box position="fixed" top="10px" left="50%" transform="translateX(-50%)">
                            <SwitchButton />
                </Box>
                <Box 
                    width="100%" 
                    padding="1rem" 
                    color="white"
                    mb={4}
                    maxW={{ base: "400px", md: "500px" }} 
                >
                    <Image 
                        src={logoImage} 
                        objectFit="cover" 
                        margin="0" 
                        width="100%" 
                        maxW={{ base: "300px", md: "400px" }}
                    />
                </Box>
                <Box 
                    p={2} 
                    fontSize='md'
                    width="50%" 
                    top="100px"
                    borderRadius="md" 
                    color="white" 
                    maxW={{ base: "300px", md: "400px" }} 
                >
                    <LoginForm />
                </Box>
            </VStack>
        </Container>
    </Flex>
</Fragment>

);
}

export default LoginScreen;
