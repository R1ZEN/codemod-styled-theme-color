import React from 'react';
import styled from 'styled';
import { theme } from '@root/theme';

const Button = styled.button`
	color: #000;
`;

const Text1 = styled.p`
   background: #000;
   ${props => props.value ? 'one' : 'two'}
`
