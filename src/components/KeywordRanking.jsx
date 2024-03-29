import { Box } from '@mui/material';
import rankingData from '../api/KeywordRanking.json'
import styled from '@emotion/styled';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import RecommendList from './RecommendList';

const Keyword = styled('a')({
    padding:'25px 0',
    display:'block',    
    zIndex: 10,
})

const CategoryBox = styled('div')({

    display:'flex',
    columnGap:'5px',
    transition:'all 1s ease',

    height:0,
    overflowY:'hidden'
})

const Category = styled('figure')({
    margin:0,
    height: '180px',
    position:'relative',
})

const BrandName = styled('figcaption')({
    position:'absolute',
    bottom:0,
    textAlign:'center',
    zIndex:1,
    color:'white',

    width:'120px',
})

const ProductImage = styled('img')({
    filter:'brightness(70%)'
})
//시간이 지나면 자동으로 다음 순위 띄워주기

export default function KeywordRanking(){
  const [rankingIdx, setRandkingIdx]=useState(0);
  const refTimer = useRef(null)
  
  useEffect(()=>{
    if(refTimer.current === null){
      const rangkingTimer = setInterval(()=>{
        //마지막 인덱스 변수, -1을 하는 이유 : 0부터 시작해서~~
        const lastIndex = rankingData.length - 1
        setRandkingIdx(prev => {
          if(prev >= lastIndex) {
            return 0
          } return prev + 1
        })
      },5000)
  
      refTimer.current = rangkingTimer
    }

  },[])

  //rangkingIdx === idx? : activeRangking : undefinde
  const activeRangking = {
    height:'180px',
    overflowY:'visible'
  }

    return(
      <Box sx={{'display':'flex', 'alignItems':'center', 'marginTop':'100px'}}>
        <Box style={{width:'535px',marginRight:'30px'}}>
          <ol style={{position:'relative'}}>
              <h2 style={{'lineHeight':'50px', 'fontSize':'54px', 'wordBreak':'break-word'}}>KEYWORD RANKING</h2>
              {rankingData.map((keyword, idx)=> {
                  return(
                  <li key={idx} style={{listStyle:'none', borderBottom:'1px solid black'}}>
                    <Keyword>
                      <span style={{marginRight:'20px'}}>{idx+1}</span>
                      {keyword.keyword}
                      {/* 해당 인덱스가 rankingIdx 같다면 opacity:1 아니면 0
                      Idx === rankingIdx ? {'opacity': 1} : {'opacity':0}
                      ...{'opacity': Idx === rankingIdx ? 1 : 0 }
                      */}
                      <span style={{position:'absolute', right:'0',color:'orange', ...{'opacity': idx === rankingIdx ? 1 : 0 }}}>더보기</span>
                    </Keyword>
                    <CategoryBox style={rankingIdx === idx ? activeRangking : undefined}> 
                      {keyword.products.map((product, idx)=>{
                        return (
                          <Category key={idx}> 
                            
                            <ProductImage src={product.image}/>
                            <BrandName>{product.brand_name}</BrandName>
                            
                          </Category>
                        )
                      })}
                    </CategoryBox>
                
                  </li>)
              })}
          </ol>
        </Box>
           <RecommendList/>
      </Box>
     
    )
}
