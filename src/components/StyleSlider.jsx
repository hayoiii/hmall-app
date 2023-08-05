import { useState } from "react"
import HomeSlideImages from '../api/HomeSlideImages.json'
import { Box, styled } from "@mui/material";
import { useEffect, useRef } from "react";
import { Icon } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PauseIcon from '@mui/icons-material/Pause';


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

    useEffect(()=>{
      if(refTimer.current === null){
          const slideTimer = setInterval(()=>{
              const lastIdx = HomeSlideImages.length - 1
              setCurrentIdx(prev => {
                  if(prev >= lastIdx) {
                      return 0
                  }return prev + 1
              })
          },3000)
          refTimer.current = slideTimer
      }
    },[])
    
    return(
        <Box sx={{'display':'flex', 'padding':'0 80px'}}>
            <StyleBox>
                <Box sx={{'display':'flex','justifyContent':'space-between', 'cursor':'pointer'}}>
                    <span>STYLE</span>
                    <IconBox>
                        <Icon>
                            <ArrowBackIcon/>
                        </Icon>
                        <Icon sx={{'marginLeft':'10px'}}>
                            <ArrowForwardIcon/>
                        </Icon>
                        <Icon sx={{'marginLeft':'10px'}}>
                            <PauseIcon/>
                        </Icon>
                    </IconBox>                   
                </Box>
                <h2>SEASON IN THE SUN</h2>
                <img src="" style={{'width':'430px', 'height':'430px'}} />
                <p>자연과 내가 온전히 하나 되는 순간.</p>
            </StyleBox>
            <StyleSlideBox>
                {HomeSlideImages.map((image, idx)=>{
                    return <ImageBox key={idx} src={image} style={{
                        transition:'3s transform ease-in-out',
                        transform:`translateX(${-IMAGE_WIDTH * currentIdx}px)`}}/>
                })

                }
            </StyleSlideBox>

        </Box>
    
        )
}