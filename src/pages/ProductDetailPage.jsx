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
  Button,
  Dialog,
  DialogTitle,
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import ImageSlider from '../components/ImageSlider.jsx';
import cookie from 'js-cookie';

//npm install js-cookie

//'/'

const data = {
  id: 0,
  code: 'GM0122051149916',
  name: '스몰 센터 그래픽 티셔츠',
  brand_name: 'TOMMY HILFIGER MEN',
  price: 13000,
  regular_price: 24800,
  created_at: '2023-05-18T06:31:26.720Z',
  images: [
    'https://cdn.hfashionmall.com/goods/THBR/22/05/11/GM0122051149916_5_ORGINL.jpg?RS=960x960&AR=0&CS=640x960',
    'https://cdn.hfashionmall.com/goods/THBR/22/05/11/GM0122051149916_6_ORGINL.jpg?RS=960x960&AR=0&CS=640x960',
    'https://cdn.hfashionmall.com/goods/THBR/22/05/11/GM0122051149916_1_ORGINL.jpg?RS=960x960&AR=0&CS=640x960',
    'https://cdn.hfashionmall.com/goods/THBR/22/05/11/GM0122051149916_2_ORGINL.jpg?RS=960x960&AR=0&CS=640x960',
    'https://cdn.hfashionmall.com/goods/THBR/22/05/11/GM0122051149916_3_ORGINL.jpg?RS=960x960&AR=0&CS=640x960',
    'https://cdn.hfashionmall.com/goods/THBR/22/05/11/GM0122051149916_4_ORGINL.jpg?RS=960x960&AR=0&CS=640x960',
  ],
  color_options_value: [],
  color_options_image: [
    'https://cdn.hfashionmall.com/colorchips/GM0122051149914_COLORCHIP.jpg?RS=100x100',
    'https://cdn.hfashionmall.com/colorchips/GM0122051149915_COLORCHIP.jpg?RS=100x100',
    'https://cdn.hfashionmall.com/colorchips/GM0122051149916_COLORCHIP.jpg?RS=100x100',
    'https://cdn.hfashionmall.com/colorchips/GM0122051149917_COLORCHIP.jpg?RS=100x100',
    'https://cdn.hfashionmall.com/colorchips/GM0122051149918_COLORCHIP.jpg?RS=100x100',
    'https://cdn.hfashionmall.com/colorchips/GM0122051149919_COLORCHIP.jpg?RS=100x100',
    'https://cdn.hfashionmall.com/colorchips/GM0122051149920_COLORCHIP.jpg?RS=100x100',
  ],
  color_options_text: [
    'BLACK',
    'BLUE',
    'NAVY',
    'BASKET BROWN',
    'GREY',
    'RED',
    'WHITE',
  ],
  color_text: 'NAVY',
  size_options: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
  description:
    '체스트 부분의 그래픽으로 타미힐피거만의 감성을 담은 반팔 티셔츠입니다. 코튼 혼방 소재로 부드럽고 가벼운 터치감을 느낄수 있으며, 목 뒷부분의 RWB 스트라이프 라인으로 디테일을 더했습니다. 다양한 컬러로 캐주얼한 무드를 연출하기 좋은 제품입니다.\n* Model Size : 키 190cm C 36 W 29 H 36\n* 코디용 아이템은 함께 배송되지 않습니다. 주문 전, 상품 컷 이미지를 확인해 주세요.\n* 모니터의 해상도에 따라 색상이 실제 상품과 약간의 차이가 있을 수 있으며, 교환 및 반품/환불의 사유가 될 수 없음을 알려 드립니다.\n* 제조국(원산지)정보는 1차 생산지 기준이며, 추가 생산이 이루어질 경우 다른 국가에서 생산될 수 있습니다.',
};
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // axios.get('/products/' + code).then((response) => {
    //   setProduct(response.data.product);
    //   setColor(response.data.product.color_text);
    // });

    setProduct(data);
    setColor(data.color_text);
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

  const handleClickCart = (e) => {
    // 1. size가 선택됬는지 안됬는지 체크
    if (size === '') {
      // 2. size가 선택되지 않았으면 alert를 띄운다
      alert('사이즈를 선택해 주세요');
    }
    if (size !== '') {
      // 3. size가 선택이 되었으면 = size가 '' 값이 아니면
      // 카트에 데이터를 넣는다.

      // 쿠키에 저장하기 cookie.set('키', '값', {...options})
      // 쿠키에 저장된 값을 불러오기 cookie.get('키')
      // json {키: 값}

      const cartItem = {
        image: product.images[0],
        title: product.brand_name,
        item: product.name,
        color: color,
        size: size,
        price: product.price,
        quantity: quantity,
      };
      // [A, B, C] -> [A, B, C, cartItem]
      // json -> string
      const previousCart = cookie.get('cart')
      if(previousCart === undefined ){
        cookie.set('cart', JSON.stringify([cartItem]),{expires:30});
      } else {
        //string -> JSON
        const carts = JSON.parse(previousCart)
        // 기존 carts 어레이에 cartItem을 추가한다
        carts.push(cartItem)
        cookie.set('cart',JSON.stringify(carts),{expires:30})
      }

      // 다이얼로그를 띄운다.
      setOpen(true);
    }
  };

  const formatDescription = (description) => {
    // 1. description(string) \n를 기준으로 자르기
    // .split
    const array = description.split('\n');
    return array.map((string, idx) => {
      return <p key={idx}>{string}</p>;
    });
  };
  // JSX
  return (
    <Box>
      <Dialog open={open}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <DialogTitle>장바구니 담기 완료</DialogTitle>
            <IconButton onClick={() => setOpen(false)} sx={{ height: '36px' }}>
              <Close />
            </IconButton>
          </Box>
          <Typography component="p">
            해당상품이 장바구니에 담겼습니다.
          </Typography>
          <Typography component="p">장바구니로 이동하시겠습니까?</Typography>
          <Box>
            <Button variant="contained" sx={{ mr: 2 }}>
              계속 쇼핑하기
            </Button>
            <Button variant="contained">장바구니 보기</Button>
          </Box>
        </Box>
      </Dialog>
      <Container maxWidth="md">
        {/* 조건부 렌더링 - product가 undefined가 아니면 렌더링한다 */}

        {product !== undefined && (
          <Box>
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
                  onChange={(e) => handleChangeSize(e)}
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
                    <Typography component="p">{size}</Typography>
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
                <Box>
                  <Button
                    variant="contained"
                    sx={{ mr: 3 }}
                    onClick={handleClickCart}
                  >
                    장바구니
                  </Button>
                  <Button variant="contained">바로구매</Button>
                </Box>
              </Box>
            </Box>
            <Box>
              {/* 상품 정보 */}
              {formatDescription(product.description)}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
// template ES6

{
  /* <Box sx={{backgroundImage: ''}}/> ㅠㅠ*/
}
