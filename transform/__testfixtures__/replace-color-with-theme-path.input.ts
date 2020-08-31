import React from 'react';
import styled from 'styled';
import { theme } from '@root/theme';

const Button = styled.button`
   color: #212B36;
   border-color: #637381;
`;

const Text1 = styled.p`
   background: '#212B36';
   ${props => props.value ? 'one' : 'two'}
`
