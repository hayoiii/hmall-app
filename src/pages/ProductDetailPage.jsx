import React, { useEffect, useState } from 'react';
import axios from '../api/axios.js';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Select,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import ImageSlider from '../components/ImageSlider.jsx';
//'/'
export default function ProductDetailPage() {
  // 1. path parmameter를 추출하기
  // 2. path parmameter 코드에 해당하는 데이터를 받아오기
  // 3. 받아온 데이터를 상태에 저장하기
  // 4. 데이터를 UI에 뿌리기
  const { code } = useParams();

  const [product, setProduct] = useState();
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState('1');

  useEffect(() => {
    axios.get('/products/' + code).then((response) => {
      setProduct(response.data.product);
      setColor(response.data.product.color_text);
    });
  }, []);

  const handleChangeSize = (e) => {
    // 사용자가 입력한 값으로 size를 업데이트한다.
    setSize(e.target.value);
  };

  const handleClickColor = (idx) => {
    // 사용자가 입력한 값으로 color를 업데이트한다.
    console.log(idx);
    setColor(product.color_options_text[idx]);
    //product.color.options_text[idx]=> 프로덕트안의 컬러안의 옵션텍스트의 클릭한 인덱스번호를 setColor에 넣어줌
  };

  const handleInputQuantity = (e) => {
    setQuantity(e.target.value);
  };

  //닫기 버튼을 누르면 닫는 이벤트 핸들러, close버튼을 누르면 seSize를 초기값으로 변경
  const handleClickClose = (e) => {
    setSize('');
  };
  // JSX
  return (
    <Container maxWidth="md">
      {/* 조건부 렌더링 - product가 undefined가 아니면 렌더링한다 */}

      {product !== undefined && (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 1 }}>
          <ImageSlider images={product.images} />
          <Box sx={{ ml: 4, mt: 2 }}>
            <Typography component="h3">{product.name}</Typography>

            <Box sx={{ display: 'flex' }}>
              {product.color_options_image.map((colorUrl, idx) => (
                <Box key={idx} sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      backgroundImage: `url(${colorUrl})`,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      margin: 2,
                      cursor: 'pointer',
                    }}
                    // onClick={handleClickColor}
                    onClick={() => handleClickColor(idx)}
                  />
                  {/* 선택한 color이면 Check를 렌더링한다 (if) &&연산자 */}
                  {/* 삼항연산자: 조건문 ? [true] : [false] (if else) */}
                  {color === product.color_options_text[idx] && (
                    <Check
                      sx={{
                        color: 'white',
                        width: 20,
                        height: 20,
                        margin: 2,
                        position: 'absolute',
                        top: 0,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
            <Typography sx={{ textAlign: 'center' }}>{color}</Typography>
            <Select
              id="size"
              name="size"
              autoWidth
              value={size}
              sx={{ minWidth: 60, height: 30 }}
              onChange={handleChangeSize}
            >
              {product.size_options.map((size, idx) => {
                return (
                  <MenuItem key={idx} value={size}>
                    {size}
                  </MenuItem>
                );
              })}
            </Select>
            {size !== '' && (
              <Box sx={{ p: 1 }}>
                {/* <Typography component="p">{size}</Typography> */}
                <TextField
                  id="num"
                  type="number"
                  value={quantity}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onInput={handleInputQuantity}
                />

                <IconButton onClick={handleClickClose}>
                  <Close />
                </IconButton>
                <Typography component="p">
                  {product.price * quantity}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
}
// template ES6

{
  /* <Box sx={{backgroundImage: ''}}/> ㅠㅠ*/
}
