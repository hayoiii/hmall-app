import { Box } from '@mui/material';
import rankingData from '../api/KeywordRanking.json'
import styled from '@emotion/styled';
import { useState } from 'react';
import { useEffect } from 'react';

const Keyword = styled('a')({
    padding:'25px 0',
    display:'block',
    
    
})

const CategoryBox = styled('div')({
    display:'flex',
    columnGap:'5px',
    transition:'all 5s ease'
})

const Category = styled('figure')({
    margin:0,
    position:'relative',
    
})

const BrandName = styled('figcaption')({
    position:'absolute',
    bottom:10,
    textAlign:'center',
    zIndex:1,
    color:'white',
})

const ProductImage = styled('img')({
    filter:'brightness(70%)'
})
//시간이 지나면 자동으로 다음 순위 띄워주기

export default function KeywordRanking(){
   const [rankingIdx, setRandkingIdx]=useState(0);
   useEffect(()=>{
    const rangkingTimer = setInterval(()=>{
      //마지막 인덱스 변수
      const lastIndex = rankingData.keyword ;
      setRandkingIdx(prev => {
        if(prev >= lastIndex) {
          return 0
        }return prev + 1
      })}, 5000)
   },[])

   //rangkingIdx === idx? : activeRangking : undefinde
   const activeRangking = {
    Height:'113px',

   }

    return(
      <Box style={{width:'535px'}}>
        <ol style={{position:'relative'}}>
            KEYWORD RANKING
            {rankingData.map((keyword, idx)=> {
                return(
                <li key={idx} style={{listStyle:'none', borderBottom:'1px solid black'}}>
                  <Keyword>
                    <span style={{marginRight:'20px'}}>{idx+1}</span>
                    {keyword.keyword}
                    {/* 해당 인덱스가 rankingIdx와 같다면 opacity:1 아니면 0
                    Idx === rangkingIdx ? 'opacity': 1 : 'opacity':0
                    */}
                    <span style={{position:'absolute', right:'0'}}>더보기</span>
                  </Keyword>
                  <CategoryBox> 
                    {keyword.products.map((product, idx)=>{
                      return (
                        <Category key={idx}> 
                          <BrandName>{product.brand_name}</BrandName>
                          <ProductImage src={product.image}/>
                        </Category>
                      )
                    })}
                  </CategoryBox>
               
                </li>)
            })}
        </ol>

      </Box>
    )
}
