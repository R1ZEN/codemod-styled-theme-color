import React from 'react';
import styled from 'styled';
import { theme } from '@root/theme';

const Button = styled.button`
   color: ${theme.defaultTextColor};
   border-color: ${theme.hintColor};
`;

const Text1 = styled.p`
   background: ${theme.defaultTextColor};
   ${props => props.value ? 'one' : 'two'}
`
