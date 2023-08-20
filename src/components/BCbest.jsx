import { Box,IconButton } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import bcdata from '../api/bcdata.json'

export default function BCbest(){
    return(
        <Box sx={{marginTop:'110px'}}>
            <Box sx={{display:'flex',justifyContent:'center' , alignItems:'center', position:'relative', margin:'0 auto 40px'}}>
                <ul style={{display:'flex', listStyle:'none',}}>
                    <li>
                        <h2 style={{display:'flex'}}>
                            <li>BRAND BEST</li>
                            <li> | </li>
                            <li>CATEGORY BEST</li>
                        </h2>
                    </li>
                </ul>
                <Box sx={{position:'absolute', right:'0', padding:'0 80px'}}>
                    <span>전체보기</span>
                    <IconButton>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </Box>
            </Box>         
            <Box sx={{margin:'0 auto', padding:'0 80px'}}>
                <Box sx={{overflow:'hidden', height:'58px'}}>
                <ul style={{display:'flex', listStyle:'none'}}>
                    {bcdata[0].brand.map((value, idx)=>{
                        return(
                            <li style={{margin:'10px 25px 20px 0', fontSize:'16px', paddingBottom:'7px'}} key={idx}>{value.name}</li>
                        )
                })}
                </ul>
                </Box>
                
                
            </Box>  
        </Box>
    )
}
