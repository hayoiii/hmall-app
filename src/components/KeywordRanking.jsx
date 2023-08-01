import { Box } from '@mui/material';
import rankingData from '../api/KeywordRanking.json'
import styled from '@emotion/styled';

const Keyword = styled('a')({
    padding:'25px 0',
    display:'block',
    
    
})

const CategoryBox = styled('div')({
    display:'flex',
    columnGap:'5px'
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


export default function KeywordRanking(){
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
