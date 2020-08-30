import { theme } from '@root/theme';

const Text1 = styled.p`
   background: ${theme.defaultTextColor};
   ${props => props.value ? 'one' : 'two'}
`
