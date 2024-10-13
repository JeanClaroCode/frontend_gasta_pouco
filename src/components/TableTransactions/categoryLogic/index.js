import { Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { 
    faSackDollar, faBusinessTime, faMoneyBillTrendUp, 
    faCartShopping, faBusSimple, faHouse, faSchool, 
    faUmbrellaBeach, faSuitcaseMedical, faUtensils, 
    faBagShopping, faPlaneDeparture, faScrewdriverWrench 
} from "@fortawesome/free-solid-svg-icons";

const CategoryLogic = ({ transaction }) => {
    const typeIcons = {
        'Salário': faSackDollar,
        'Freelance': faBusinessTime,
        'Investimento': faMoneyBillTrendUp,
        'Mercado': faCartShopping,
        'Transporte': faBusSimple,
        'Aluguel': faHouse,
        'Educação': faSchool,
        'Lazer': faUmbrellaBeach,
        'Saúde': faSuitcaseMedical,
        'Restaurante': faUtensils,
        'Compras': faBagShopping,
        'Viagem': faPlaneDeparture,
        'Serviços': faScrewdriverWrench,
    };

    const categoryIcon = typeIcons[transaction.category];

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            {categoryIcon && (
                <FontAwesomeIcon icon={categoryIcon} style={{ marginRight: '8px' }} />
            )}
            {transaction.category}
        </Box>
    );
};

export default CategoryLogic;
