import { Box, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const SearchBar = ({onSearch, errorFilter, query}) => {
console.log(`TESTEEEEEEE: ${query}`)
  const handleInputChange = (event) => {
    const query = event.target.value;
    onSearch(query);  // This calls the function passed as a prop
};


  return (
    <InputGroup width="300px" mx="auto" borderBottom="2px solid black">
        <InputLeftElement
        height="auto"
        pointerEvents="none"
        children={<FontAwesomeIcon icon={faSearch} style={{ color: "#808080", fontSize: '18px' }} />}
      />
      <Input 
        variant="unstyled" 
        placeholder="Search..." 
        _placeholder={{ color: "#808080" }} 
        paddingLeft="40px" 
        value={query}
        onChange={handleInputChange} 
        />
        {errorFilter && (
        <Text color="red.500" mt="2">
          {errorFilter}
        </Text>
      )}
    </InputGroup>
  );
};

export default SearchBar;
