import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import useImageSlider from '../utils/useImageSlider'

//이렇게 자주 쓰일 법한 것들은 변수에 넣어 사용하면 작성하는게 보다 편해짐
const IMAGE_WIDTH = 300;
const buttonStyle = {
  height: '30px',
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '&:active': {
    backgroundColor: 'transparent',
  },
};
export default function ImageSlider({ images }) {
  const { handleClickArrow,currentIdx,setCurrentIdx } = useImageSlider({length: images.length, isAutoPlay: false})

  const handleClickIndicator = (idx) => {
    // currentIdx를 클릭한 idx로 바꿔준다
    setCurrentIdx(idx);
  };
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton sx={buttonStyle} onClick={() => handleClickArrow(true)}>
          <ArrowBackIosIcon />
        </IconButton>
        <Box className="image-container" sx={{ overflow: 'hidden' }}>
          <Box
            className="image-list"
            component={'ul'}
            sx={{
              p: 0,
              display: 'flex',
              listStyle: 'none',
              transform: `translateX(${-IMAGE_WIDTH * currentIdx}px)`,
              transition: '1s transform ease-in-out',
            }}
            width={600}
            height={600}
          >
            {images.map((image, idx) => {
              return (
                <Box key={idx} component={'li'}>
                  <Box
                    component={'img'}
                    src={image}
                    width={IMAGE_WIDTH}
                    height={600}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
        <IconButton sx={buttonStyle} onClick={() => handleClickArrow(false)}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box
        className="indicator"
        sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
      >
        {images.map((image, idx) => {
          return (
            <Box
              onClick={() => handleClickIndicator(idx)}
              key={idx}
              sx={{
                width: 10,
                height: 10,
                backgroundColor: idx === currentIdx ? 'gray' : 'orange',
                borderRadius: '50%',
                ml: 1,
                cursor: 'pointer',
                /* idx === currentIdx && (backgroundColor:'pink') */
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
