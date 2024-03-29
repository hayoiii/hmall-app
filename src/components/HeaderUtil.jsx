import React from 'react';
import { Box, Container, colors } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import ImgLogo from '../assets/img_logo.png'

const UtilBox = styled('div')({

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor:'black',
  color:'white'
});

const Logo = styled('div')({
  backgroundImage: `url(${ImgLogo})`,
  width: '100px',
  height: '100px',
})

const Nav = styled('ul')({
  display: 'flex',
  listStyle: 'none',
});
export default function HeaderUtil() {
  return (
    <>
     
        <UtilBox>
          <Link to="/">
            <img src={'/assets/img_logo.png'} alt='로고' width='100px' height='100px'/>
          </Link>
          <Nav>
            <li>찾기</li>
            <li>로그인</li>
            <li>회원가입</li>
            <li>마이페이지</li>
            <li>장바구니</li>
          </Nav>
        </UtilBox>
      
    </>
  );
}
