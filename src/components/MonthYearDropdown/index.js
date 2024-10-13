import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import '../../styles/MonthYearDropDown.scss';

const MonthYearDropDown = ({ onMonthChange }) => { 
    const months = [
        "Transações mais recentes",
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const [selectedMonth, setSelectedMonth] = useState(months[0]); // Estado local para o dropdown

    const handleDropdownChange = (month) => {
        setSelectedMonth(month);  // Atualiza o mês localmente
        onMonthChange(month);  // Chama a função do componente pai para atualizar o estado do mês
    };

    return (
        <Menu>
            <MenuButton as={Button} bg='#2A2F3B' color='white' rightIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                {selectedMonth}
            </MenuButton>
            <MenuList className="custom-scrollbar" bg='#2A2F3B' maxHeight="200px" overflowY="auto">
                {months.map((month, index) => (
                    <MenuItem key={index} onClick={() => handleDropdownChange(month)} bg='#2A2F3B'
                    color='white' fontSize='sm'>
                        {month}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default MonthYearDropDown;
