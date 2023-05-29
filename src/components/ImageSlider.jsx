import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';

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
  const [currentIdx, setCurrentIdx] = useState(0);
  const handleClickArrow = (isBack) => {
    //boolean -> true / false
    // currentIdx++

    //isBack을 인자로 받아서 isBack이 true라면 setcurrentidx를 -1해서 한칸 왼쪾으로 이동하게함.
    //근데 currentidx가 0이랑 같다면? 이동하지 않고 반환해준다
    if (isBack) {
      // 왼쪽으로 이동
      if (currentIdx === 0) return;
      setCurrentIdx(currentIdx - 1);
    } else if (!isBack) {
      // 오른쪽으로 이동
      //length를쓰면 0부터가 아니라 1부터 세기때문에 -1을 해준값을 lastIdx에 넣어줌! 
      const lastIdx = images.length - 1;
      //currentIdx가 lastIdx와 같거나 크면 리턴
      if (currentIdx >= lastIdx) return;
      //그게 아니라면 setCurrentIdx에 +1을 해준다 
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
