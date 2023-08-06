import { Box } from '@mui/material';
import rankingData from '../api/KeywordRanking.json'
import RecommendItem from './RecommendItem';


export default function RecommendList(){
    return(
        <Box sx={{'display':'flex'}}>
            {/* 일단 모양만.. */}
            <div>
                <RecommendItem width={'452px'} height={'678px'} product={rankingData[0].products[0]}/>
            </div>
            <div style={{display:'flex', flexWrap:'wrap', gap:'8px', marginLeft:'8px'}}>
              {rankingData[0].products.map((product, idx)=>{
                if(idx === 0){
                  return <></>
                }if(idx === 3){
                  return <><div style={{width:'225px', height:'335px'}}><p>깔끔한 서머룩</p> <span>연출하기</span></div>
                  {/* <img width='225px' height='335px' key={idx} src={images.image} /> */}
                  <RecommendItem width={'225px'} height={'335px'} product={product}/>
                  </>
                  
                }
                else{
                    return <RecommendItem width={'225px'} height={'335px'} product={product}/>
                /*     <img width='225px' height='335px' key={idx} src={images.image} /> */
                }
                 
              })}
              {/* <div style={{width:'225px', height:'335px', backgroundColor:'gray'}}>깔끔한 서머룩<span style={{display:'block'}}>연출하기</span></div> */}
            </div>
            
           
           </Box>
    )
}