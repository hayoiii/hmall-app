import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Translate } from '@mui/icons-material';
import breakLine from '../utils/breakLine';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const IMAGE_WIDTH = 1164;
const IMAGE_HEIGHT = 720;
const buttonStyle = {
  position: 'absolute',
  height: `${IMAGE_HEIGHT}px`,
  width: `calc((100vw - ${IMAGE_WIDTH}px) / 2 - 10px )`,
  zIndex:1,
  background:'rgba(0,0,0,0.7)',
  borderRadius:0,
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  '&:active': {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
};

const TitleBox =styled('div')({
  position:'absolute',
  top:'40%',
  left:'100px',
})

const ImageTitle = styled('p')({
  transform:'scale(0.7)',
  fontSize: '50px',
  opacity:0,
  transition: 'all .5s ease',
  transitionDuration: '.5s'
})

const ImageSubTitle = styled('p')(({
  opacity:0,
  transition:'all .5s ease'
}))

export default function MainSlider({images}) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const [timer, setTimer] = useState(null);
    
  
    useEffect(()=>{
      if(autoPlay === true && timer === null){
        // 2초마다 currentIdx를 1 증가시킨다.
        // 0, 1, ..., images.length - 1
        const timer = setInterval(() => {
          const lastIndex = images.length - 1;
          setCurrentIdx(prev => {
            if(prev >= lastIndex) {
              return 0
            }
            return prev + 1
          })}, 3 * 1000)
        setTimer(timer)
      } else {
        // 타이머를 취소한다
        clearInterval(timer)
      }
    },[timer, autoPlay, currentIdx, images.length])
    
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

    const handleClickPlay = () =>{
      setAutoPlay(!autoPlay)
      // setAutoPlay((previous) => !previous)
    }

    const calculateTranslateX = () => {
      const left = -IMAGE_WIDTH * currentIdx

      const offset = `calc(${left}px + (100vw - ${IMAGE_WIDTH}px) / 2 )`
      return offset
    }

    const activeStyle = {
      transform:'scale(1)',
      opacity:1,
    }

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{...buttonStyle }} onClick={() => handleClickArrow(true)}>
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
                transform: `translateX(${calculateTranslateX()})`,
                transition: '1s transform ease-in-out',
              }}
              width={'100vw'}
              height={IMAGE_HEIGHT}
            >
              {/* images = ['src1', 'src2', ...] */}
              {/* images = [{src: 'src1'}, {src: 'src2'}, ...] */}
              {images.map((image, idx) => {
                return (
                  <Box key={idx} sx={{position:'relative'}}>
                   
                    <TitleBox>
                      <ImageSubTitle style={currentIdx === idx? activeStyle : undefined}>{image.type}</ImageSubTitle>
                      <ImageTitle style={currentIdx === idx ? activeStyle : undefined}>{breakLine(image.title)}</ImageTitle>
                      <ImageSubTitle style={currentIdx === idx? activeStyle : undefined}>{image.subTitle}</ImageSubTitle>
                     </TitleBox>
                    <Box
                      component={'img'}
                      src={image.src}
                      width={IMAGE_WIDTH}
                      height={IMAGE_HEIGHT}
                      sx={{padding:'0 10px'}}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
          <IconButton sx={{...buttonStyle,right:0, }} onClick={() => handleClickArrow(false)}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        <Box
          className="indicator"
          sx={{ display: 'flex', justifyContent: 'center', alignItems:'center', mb: 2 }}
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
           <IconButton onClick={handleClickPlay}>
         {autoPlay === false ? <PlayArrowIcon/> : <PauseIcon/>}
        </IconButton>
        </Box>
       
      </Box>
    );
}