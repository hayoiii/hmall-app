import { Box, IconButton, styled } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BrandLiveData from '../api/BrandLiveData.json'
import brandSlide from '../api/brandslide.json'
import useImageSlider from "../utils/useImageSlider";
import { useCallback } from "react";
import breakLine from "../utils/breakLine";

const BrandTab = styled('div')({
    textAlign:'center',
    marginTop:'90px',
    padding:'0 80px'

})
const TabBox = styled('div')({
    width:'906px',
    margin:'30px auto',
    display:'flex',
    alignItems:'center',
    overflow:'hidden',
    position:'relative'
})

const SlideTab = styled('ul')({
    display:'flex',
    listStyle:'none',
    
})

const ItemBox = styled('div')({
   
    display:'flex',
    alignItems:'center'
})

const ItemList = styled('div')({
    display:'flex',
    width:'50%',
    justifyContent:'center'
})



export default function BrandLive(){
    const {setCurrentIdx,currentIdx, style}=useImageSlider({length:brandSlide.length,})

    const handleClickIndicator = (idx) => {
        // currentIdx를 클릭한 idx로 바꿔준다
        setCurrentIdx(idx);
      }; 

/* 
    const indicatorColor = useCallback((idx)=>{
        // currentIdx 0 ~ n + 1
        // idx 0 ~ n - 1
        if(currentIdx === 0 && idx === brandSlide.length - 1) {
          return '#c2935f'
        }else if(currentIdx === brandSlide.length + 1 && idx === 0){
          return '#c2935f'
        }else if(currentIdx - idx === 1){
          return '#c2935f'
        }else{
          return '#eee'
        }
      },[currentIdx, brandSlide]) */

    return(
        <BrandTab>
        <h3>BRAND LIVE</h3>
        <TabBox>
            <IconButton sx={{position:'absolute', left:'0'}}>
                <KeyboardArrowLeftIcon/>
            </IconButton>
            <SlideTab>
                {BrandLiveData.map((value, idx)=>{
                    return <li style={{width:'280px', height:'44px', lineHeight:'44px'}} key={idx}>{value.brand}</li>
                })}
            </SlideTab>
            <IconButton sx={{position:'absolute', right:'0'}}>
                <KeyboardArrowRightIcon/>
            </IconButton>
        </TabBox>
                <ItemBox>
                    <ItemList>
                        {BrandLiveData[0].products.map((product, idx)=>{
                            return(
                                <figure style={{margin:0}} key={idx}>
                                    <img style={{width:'130px'}} src={product.img} alt={product.name} />
                                    <figcaption style={{fontSize:'14px', padding:'0 10px', textAlign:'left'}}>
                                        <p>{product.brand}</p>
                                        <p>{product.name}</p>
                                        <p>{product.price}</p>
                                    </figcaption>
                                </figure>
                            )                      
                        })}                            
                    </ItemList>
                    <Box sx={{width:'50%'}}>
                        
                        <Box sx={{display:'flex', position:'relative' ,overflow:'hidden'}}>
                        {brandSlide[1].products.map((product, idx)=>{
                            return(
                                <figure style={{position:'relative', display:'flex', alignItems:'flex-end',justifyContent:'center'}}  key={idx}>
                                    <img style={{width:'499px',borderBottomRightRadius:'20%'}} src={product.src} alt="" />
                                    <figcaption style={{position:'absolute', bottom:'50px',color:'white'}}>
                                        <span style={{fontSize:'14px'}}>{product.brand}</span>
                                        <h3 style={{margin:0, fontSize:'30px'}}>{breakLine(product.title)}</h3>
                                        <span style={{fontSize:'14px'}}>{product.subTitle}</span>
                                    </figcaption>
                                </figure>
                            )
                        })}
                        <Box sx={{display:'flex', position:'absolute', bottom:'30px', left:'50%',transform: 'translate(-50%, 0%)'}}>
                            {brandSlide[1].products.map((product, idx)=>{
                                return(
                                    <Box 
                                    onClick={() => handleClickIndicator(idx)}
                                    key={idx}
                                    sx={{width:10,
                                    height:10,
                                    /* backgroundColor: indicatorColor(idx), */
                                    borderRadius:'50%',
                                    ml:1,
                                    cursor:'pointer'}}>

                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                  
                    </Box>
                     
                </ItemBox>

        </BrandTab>
    )
}