import { Box, IconButton } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import bcdata from '../api/bcdata.json';
import { useState } from 'react';
import styled from '@emotion/styled';

const Menu = styled('li')({
  cursor: 'pointer',
  color: 'gray',
  margin: '0 35px',
});

const activeStyle = {
  color: 'black',
};

const a = 3;
const onClickTab = () => {
  return 1;
};
// a -> 3
// onClickTab -> 함수를 담고 있는 변수 === 함수 ===  () => {return 1}
// onClickTab() -> 숫자 = 1

export default function BCbestTab() {
  const [tab, setTab] = useState('BRAND BEST');

  const onClickTab = (tab) => {
    setTab(tab);
  };

  // const func = () => {... return 1}
  return (
    <Box sx={{ marginTop: '110px' }}>
      <Box
        /*     onClick={() => {func()}}
        onClick={func}
        // onClick={onClickTab()}  x */
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          margin: '0 auto 40px',
        }}
      >
        <ul style={{ display: 'flex', listStyle: 'none' }}>
          <li>
            <h2 style={{ display: 'flex' }}>
              <Menu
                onClick={() => {
                  onClickTab('BRAND BEST');
                }}
                style={tab === 'BRAND BEST' ? activeStyle : {}}
              >
                BRAND BEST
              </Menu>
              <li> | </li>
              <Menu
                onClick={() => {
                  onClickTab('CATEGORY BEST');
                }}
                style={tab === 'CATEGORY BEST' ? activeStyle : {}}
              >
                CATEGORY BEST
              </Menu>
            </h2>
          </li>
        </ul>
        <Box sx={{ position: 'absolute', right: '0', padding: '0 80px' }}>
          <span>전체보기</span>
          <IconButton>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ margin: '0 auto', padding: '0 80px' }}>
        <Box sx={{ overflow: 'hidden', height: '58px' }}>
          <ul style={{ display: 'flex', listStyle: 'none' }}>
            {bcdata[0].brand.map((value, idx) => {
              return (
                <li
                  style={{
                    margin: '10px 25px 20px 0',
                    fontSize: '16px',
                    paddingBottom: '7px',
                  }}
                  key={idx}
                >
                  {value.name}
                </li>
              );
            })}
          </ul>
        </Box>
      </Box>
    </Box>
  );
}
