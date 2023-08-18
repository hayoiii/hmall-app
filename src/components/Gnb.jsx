import React from 'react';
import { styled } from '@mui/system';
import MainMenu from '../api/Mainmenu.json';
import SideMenu from '../api/SideMenu.json';
import SubMenu from '../api/SubMenu.json';
import { useState } from 'react';

const MenuBox = styled('div')({
  height:'60px',
  display: 'flex',
  justifyContent: 'space-between',
  
  color:'white'
});
const MenuList = styled('a')({
  display: 'flex',
});

const MenuTitle = styled('div')({
  fontSize: 14,
  marginRight: '8px',
  cursor:'pointer',
  ':hover':{
    color:"orange"
  }

});

const SubBox = styled('div')({
  display: 'flex',
});

const SideMenus = styled('a')({
  display: 'block',
  fontSize: 14,
  marginLeft:'10px',

  cursor:'pointer'
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

const SubTitle = styled('a')({
  cursor:'pointer',
  display:'flex',

})
export default function Gnb() {
  const [mouseEnter, setMouseEnter] = useState();
  
  const handleMouseEnter = (menuKey) => {
    setMouseEnter(menuKey)
  }
  const handleMouseLeave = () => {
    setMouseEnter(undefined)
  }
      
  return (
    <>
      <div style={{backgroundColor:'black',top:0, position:'sticky',zIndex:10,}}>
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
              return <SideMenus key={idx.id}>{idx.sub}</SideMenus>;
            })}
          </SubBox>
        </MenuBox>
        
        {mouseEnter!== undefined && SubMenu[mouseEnter]!== undefined && <SubMenuList onMouseLeave={handleMouseLeave}>
          {/* [{id:1, title:'여성 메인'}, {}, {}, ...] */}
          <div style={{display:'flex', flexDirection:'column', flexWrap:'wrap', height:"340px"}}>
            {SubMenu[mouseEnter].map((value,idx)=>{
              if(value.type==="category" || value.type === undefined){
                return <SubTitle style={{color: 'red'}} key={idx}>{value.title}</SubTitle>
              }
            })
            } 
          </div>
          
          <div style={{display:'flex', flexDirection:'column', flexWrap:'wrap', height:"340px"}}> 
            {SubMenu[mouseEnter].map((value,idx)=>{
            if(value.type==="brand"){
              return <SubTitle key={idx}>{value.title}</SubTitle>
            }
            // 브랜드이면 <li style={{color: 'red'}} key={idx}>{value.title}</li>
            // 카테고리이면 <li key={idx}>{value.title}</li>
          })
          }</div>
         
          
        </SubMenuList>}
      </div>
    </>
  );
}
