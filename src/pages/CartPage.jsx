import { Container, Typography } from '@mui/material';

import styled from '@emotion/styled';
import CartList from '../components/CartList';

const Cart = styled(Typography)`
  font-size: 24px;
  text-align: center;
`;

export default function CartPage() {

  return (
    <Container>
      <Cart>장바구니</Cart>

      <CartList />
    </Container>
  );
}
