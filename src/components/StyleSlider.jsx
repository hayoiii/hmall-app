import StyleSlideData from '../api/StyleSlideData.json'
import { Box, IconButton, styled } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import useImageSlider from "../utils/useImageSlider";

const IMAGE_WIDTH = 696;

const StyleSlideBox = styled('div')({
    width:'100%',
    height:'730px',

    display:'flex',
    // transition:'all 1s ease'
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
    const {handleClickArrow, currentIdx, autoPlay, setAutoPlay, style} = useImageSlider({length:StyleSlideData.length, isAutoPlay:true, imageWidth:IMAGE_WIDTH})
    // const [unsetTransition, setUnsetTransition] = useState(false)

    
    const handleClickPlay = () => {
        setAutoPlay(!autoPlay)
    }

    return(
        <Box sx={{'display':'flex', 'padding':'0 80px', 'marginTop':'100px'}}>
            <p>currentIdx: {currentIdx}</p>

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
            <Box sx={{ overflow: 'hidden', minWidth: IMAGE_WIDTH, maxWidth: IMAGE_WIDTH }}>
                <StyleSlideBox style={style}>
                    <ImageBox src={StyleSlideData[StyleSlideData.length - 1]}  />
                                {/* 마지막 사진 보여주기 */}
                    {StyleSlideData.map((image, idx)=>{
                        return <ImageBox key={idx} src={image} />
                    })}
                    <ImageBox src={StyleSlideData[0]}/>
                </StyleSlideBox>
            </Box>
        </Box>
    
        )
}