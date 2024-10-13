import React, { useEffect } from 'react';
import { Box, Flex, Link, Button, useColorMode, Image } from '@chakra-ui/react';
import logoImage from '../../assets/images/default_transparent_765x625.png';
import { faMoon, faRightFromBracket, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoutConfirmation from './logout_confirmation';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const icon = colorMode === 'light' ? faMoon : faSun;
    const iconColor = colorMode === 'light' ? 'grey' : 'grey'; // Muda a cor do ícone de acordo com o modo de cor

    useEffect(() => {
        // Aplica o fundo de acordo com o modo de cor
        document.body.style.backgroundColor = colorMode === 'light' ? '#F0F0F0' : '#1F1717';
    }, [colorMode]);

    return (
        <Box bg='#1F1717' px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Box>
                    <Link href="/">
                        <Image 
                            src={logoImage} 
                            alt='logo.png' 
                            boxSize={{ base: '100px', md: '150px', lg: '200px' }}
                            borderRadius='lg'
                            objectFit='cover'
                        />
                    </Link>
                </Box>
                <Flex alignItems={'center'}>
                    <Button borderRadius='20px' onClick={toggleColorMode} mr={4}>
                        <FontAwesomeIcon icon={icon} color={iconColor} />
                    </Button>
                    <LogoutConfirmation />
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;
