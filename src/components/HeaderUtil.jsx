import React from 'react';
import { Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import Lg from '../img_logo.png';

const UtilBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
const Nav = styled('ul')({
  display: 'flex',
  listStyle: 'none',
});
export default function HeaderUtil() {
  const utilNav = [
    {
      id: 1,
      title: '찾기',
    },
  ];
  return (
    <>
      <Container fixed maxWidth="xl">
        <UtilBox>
          <Box>
            <Link to="/">H FASHION MALL</Link>
          </Box>
          <Nav>
            <li>찾기</li>
            <li>로그인</li>
            <li>회원가입</li>
            <li>마이페이지</li>
            <li>장바구니</li>
          </Nav>
        </UtilBox>
      </Container>
    </>
  );
}
