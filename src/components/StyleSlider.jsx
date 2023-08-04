import { useState } from "react"
import HomeSlideImages from '../api/HomeSlideImages.json'
import { Box, styled } from "@mui/material";
import { useEffect, useRef } from "react";

const IMAGE_WIDTH = 696;

const StyleSlideBox = styled('div')({
    width:IMAGE_WIDTH+'px',
    height:'730px',

    display:'flex',
    overflow:'hidden',

    transition:'all 1s ease'
})

const StyleBox = styled('div')({
    width:'430px'
})

const ImageBox = styled('img')({
    width:IMAGE_WIDTH+'px',
    height:'730px',
    objectFit: 'cover',

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