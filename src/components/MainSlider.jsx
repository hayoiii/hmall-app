import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import breakLine from '../utils/breakLine';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useRef } from 'react';
import useImageSlider from '../utils/useImageSlider'

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

function ImageBox({idx, currentIdx, image, activeStyle }) {

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
  )
}

export default function MainSlider({images}) {
    const {handleClickArrow, currentIdx, setCurrentIdx,autoPlay,setAutoPlay,style} = useImageSlider({length: images.length, isAutoPlay:true, imageWidth:IMAGE_WIDTH})
  
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
                ...style
                // transform: `translateX(${calculateTranslateX()})`,
                // transition: '1s transform ease-in-out',
              }}
              width={'100vw'}
              height={IMAGE_HEIGHT}
            >
              {/* images = ['src1', 'src2', ...] */}
              {/* images = [{src: 'src1'}, {src: 'src2'}, ...] */}
              {/* images[0] images[1] */}
              <ImageBox idx={0} currentIdx={currentIdx} image={images[images.length - 1]} activeStyle={activeStyle}/>
              {images.map((image, idx) => {
                return (
                  <ImageBox 
                    key={idx + 1}
                    idx={idx + 1}
                    currentIdx={currentIdx}
                    image={image}
                    activeStyle={activeStyle}
                   />
                );
              })}
              <ImageBox idx={images.length + 2} currentIdx={currentIdx}
              image={images[0]} activeStyle={activeStyle}/>
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
                  backgroundColor: idx === currentIdx ? 'gray' : 'orange',
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