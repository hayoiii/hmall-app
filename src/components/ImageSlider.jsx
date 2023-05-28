import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';

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
  const [currentIdx, setCurrentIdx] = useState(0);
  const handleClickArrow = (isBack) => {
    //boolean -> true / false
    // currentIdx++
    if (isBack) {
      // 왼쪽으로 이동
      if (currentIdx === 0) return;
      setCurrentIdx(currentIdx - 1);
    } else if (!isBack) {
      // 오른쪽으로 이동
      const lastIdx = images.length - 1;
      if (currentIdx >= lastIdx) return;
      setCurrentIdx(currentIdx + 1);
    }
  };

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
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {images.map((image, idx) => {
          return (
            <Box
              onClick={() => handleClickIndicator(idx)}
              key={idx}
              sx={{
                width: 10,
                height: 10,
                backgroundColor: idx === currentIdx ? 'pink' : 'blue',
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
