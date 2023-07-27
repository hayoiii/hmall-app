import React from 'react';
import { styled } from '@mui/system';
import MainMenu from '../api/Mainmenu.json';
import SideMenu from '../api/SideMenu.json';
import SubMenu from '../api/SubMenu.json';
import { useState } from 'react';

const MenuBox = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  color:'white'
});
const MenuList = styled('div')({
  display: 'flex',
  maxWidth: 720,
});

const MenuTitle = styled('div')({
  fontSize: 14,
  marginRight: '8px'
});

const SubBox = styled('div')({
  display: 'flex',
});

const SubMenus = styled('div')({
  display: 'block',
  fontSize: 14,
});

const SubMenuList = styled('div')({
  background:'white',
  width:'100%',
  height:340,
  padding:'10px 80px 30px',
  display:'flex',
  flexDirection:'column',
  flexWrap:'wrap',
  columnGap: '12px',
  position:'absolute',

  fontSize:'13px',
  color:'#666'

})
export default function Gnb() {
  const [mouseEnter, setMouseEnter] = useState();
  
  const handleMouseEnter = (menuKey) => {
    setMouseEnter(menuKey)
  }

  return (
    <>
      <div style={{backgroundColor:'black',height:'20px',top:0, position:'sticky'}}>
        <MenuBox>
          <MenuList>
            {
              // [woman, man, kids]
              Object.keys(MainMenu).map((value, idx)=>{
                return <MenuTitle onMouseEnter={() => handleMouseEnter(value)} key={idx}>
                {MainMenu[value].title}
                </MenuTitle>
              })
            }
            {/* {MainMenu.menuList.map((value, idx) => {
              return <MenuTitle onMouseEnter={} key={value.id}>{value.title}</MenuTitle>;
            })} */}
          </MenuList>

          <SubBox>
            {SideMenu.SubTitle.map((idx) => {
              return <SubMenus key={idx.id}>{idx.sub}</SubMenus>;
            })}
          </SubBox>
        </MenuBox>
        
        {mouseEnter!== undefined && <SubMenuList>
          {/* [{id:1, title:'여성 메인'}, {}, {}, ...] */}
          {SubMenu[mouseEnter].map((value,idx)=>{
            console.log(value.type)
            if(value.type==="brand"){
              return <a style={{color: 'red'}} key={idx}>{value.title}</a>
            }else{
              return <a key={idx}>{value.title}</a>
            }
            // 브랜드이면 <li style={{color: 'red'}} key={idx}>{value.title}</li>
            // 카테고리이면 <li key={idx}>{value.title}</li>
          })
          }
          
        </SubMenuList>}
      </div>
    </>
  );
}
