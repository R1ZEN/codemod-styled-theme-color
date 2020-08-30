import React from 'react';
import styled from 'styled';
import { theme } from '@root/theme';

const Button = styled.button`
    color: ${theme.primary};
`;

const Text1 = styled.p`
   background: ${theme.primary};
   ${props => props.value ? 'one' : 'two'}`
