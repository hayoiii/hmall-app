import { useState } from "react"
import StyleSlideData from '../api/StyleSlideData.json'
import { Box, IconButton, styled } from "@mui/material";
import { useEffect, useRef } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const IMAGE_WIDTH = 696;

const StyleSlideBox = styled('div')({
    width:IMAGE_WIDTH+'px',
    height:'730px',

    display:'flex',
    overflow:'hidden',

    transition:'all 1s ease'
})

const StyleBox = styled('div')({
    width:'430px',
    marginRight:'80px',
    textAlign:'center'
})

const ImageBox = styled('img')({
    width:IMAGE_WIDTH+'px',
    height:'730px',
    objectFit: 'cover',

})

const IconBox = styled('div')({
    cursor:'poiner'
})

export default function StyleSlider(){
    const [currentIdx, setCurrentIdx]=useState(0);
    const refTimer = useRef(null);
    const [autoPlay, setAutoPlay]=useState(true)

    useEffect(()=>{
      if(autoPlay === true && refTimer.current === null){
          const slideTimer = setInterval(()=>{
              const lastIdx = StyleSlideData.length - 1
              setCurrentIdx(prev => {
                  if(prev >= lastIdx) {
                      return 0
                  }return prev + 1
              })
          },3000)
          refTimer.current = slideTimer
      }else if(autoPlay === false) {
        clearInterval(refTimer.current)
        refTimer.current = null;
      }
    },[autoPlay])

    const handleClickArrow = (isBack) => {
        if(isBack){
            if(currentIdx === 0 )return;
            setCurrentIdx(currentIdx - 1)
        }else if(!isBack){
            const lastIdx = StyleSlideData.length - 1
            if(currentIdx >= lastIdx) return
            setCurrentIdx(currentIdx + 1)
        }
    }
    
    const handleClickPlay = () => {
        setAutoPlay(!autoPlay)
    }

    return(
        <Box sx={{'display':'flex', 'padding':'0 80px'}}>
            <StyleBox>
                <Box sx={{'display':'flex','justifyContent':'space-between', 'cursor':'pointer'}}>
                    <span>STYLE</span>
                    <IconBox>
                        <IconButton onClick={()=>handleClickArrow(true)}>
                            <ArrowBackIcon/>
                        </IconButton>
                        <IconButton sx={{'marginLeft':'10px'}} onClick={()=>handleClickArrow(false)}>
                            <ArrowForwardIcon/>
                        </IconButton>
                        <IconButton sx={{'marginLeft':'10px'}} onClick={handleClickPlay}>
                            {autoPlay === false ? <PlayArrowIcon/> : <PauseIcon/>}
                        </IconButton>
                    </IconBox>                   
                </Box>
                <h2>SEASON IN THE SUN</h2>
                <img src="https://cdn.hfashionmall.com/display/trnd/40/6340/6340_KOR_20230713100844.jpg?RS=430" style={{'width':'430px', 'height':'430px'}} />
                <p>자연과 내가 온전히 하나 되는 순간.</p>
            </StyleBox>
            <StyleSlideBox>
                <ImageBox src={StyleSlideData[StyleSlideData.length - 1]}  />
                            {/* 마지막 사진 보여주기 */}
                {StyleSlideData.map((image, idx)=>{
                    return <ImageBox key={idx} src={image} style={{
                        transition:'1s transform ease-in-out',
                        transform:`translateX(${-IMAGE_WIDTH * currentIdx}px)`}}/>
                })}
                <ImageBox src={StyleSlideData[0]}/>
            </StyleSlideBox>

        </Box>
    
        )
}