import React from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/system';
import MainMenu from '../api/Mainmenu.json';
import SideMenu from '../api/SideMenu.json';

const MenuBox = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});
const MenuList = styled('div')({
  display: 'flex',
  maxWidth: 720,
});

const MenuTitle = styled('div')({
  fontSize: 14,
  paddingLeft: 15,
  paddingRight: 15,
});

const SubBox = styled('div')({
  display: 'flex',
});

const SubMenus = styled('div')({
  display: 'block',
  fontSize: 14,
});

export default function Gnb() {
  return (
    <>
      <Container maxWidth="xl" sx={{ pr: 80, pl: 80 }}>
        <MenuBox>
          <MenuList>
            {MainMenu.menuList.map((idx) => {
              return <MenuTitle key={idx.id}>{idx.title}</MenuTitle>;
            })}
          </MenuList>
          <SubBox>
            {SideMenu.SubTitle.map((idx) => {
              return <SubMenus key={idx.id}>{idx.sub}</SubMenus>;
            })}
          </SubBox>
        </MenuBox>
      </Container>
    </>
  );
}
