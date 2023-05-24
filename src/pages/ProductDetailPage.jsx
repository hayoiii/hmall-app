import React, { useEffect, useState } from 'react';
import axios from '../api/axios.js';
import { useParams } from 'react-router-dom';
import { Container, Box, Select, MenuItem } from '@mui/material';

//'/'
export default function ProductDetailPage() {
  // 1. path parmameter를 추출하기
  // 2. path parmameter 코드에 해당하는 데이터를 받아오기
  // 3. 받아온 데이터를 상태에 저장하기
  // 4. 데이터를 UI에 뿌리기
  const { code } = useParams();

  const [product, setProduct] = useState();
  const [size, setSize] = useState('');

  useEffect(() => {
    axios.get('/products/' + code).then((response) => {
      setProduct(response.data.product);
    });
  }, []);

  // 1. () => { return 3 }
  // 2. () => 3

  // JSX
  return (
    <Container>
      {/* 조건부 렌더링 - product가 undefined가 아니면 렌더링한다 */}

      {product !== undefined && (
        <Box>
          {product.name}
          {product.color_options_image.map((color, idx) => (
            <div
              key={idx}
              style={{
                backgroundImage: `url(${color})`,
                width: 30,
                height: 30,
              }}
            />
          ))}
          <Select id="size" autoWidth value={size}>
            {product.size_options.map((size, idx) => {
              return (
                <MenuItem key={idx} value={size}>
                  {size}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
      )}
    </Container>
  );
}
// template ES6

{
  /* <Box sx={{backgroundImage: ''}}/> ㅠㅠ*/
}
