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
} from '@mui/material';
import { Close } from '@mui/icons-material';
import ImageSlider from '../components/ImageSlider.jsx';
import cookie from 'js-cookie';
import Alert from '../components/Alert.jsx';
import ColorOption from '../components/ColorOption.jsx';
import { styled } from '@mui/system';

//npm install js-cookie

//'/'

const TotalBox = styled(Box)`
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainerBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled(Button)`
  &:hover {
    background-color: black;
  }
  margin: 8px;
  width: 48%;
  background-color: black;
  color: white;
`;

const BuyButton = styled(Button)`
  &:hover {
    background-color: darkorange;
  }
  width: 48%;
  background-color: darkorange;
  color: white;
`;

export const data = {
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
        regularPrice: product.regular_price,
        quantity: quantity,
      };
      // [A, B, C] -> [A, B, C, cartItem]
      // json -> string
      const previousCart = cookie.get('cart');
      if (previousCart === undefined) {
        cookie.set('cart', JSON.stringify([cartItem]), { expires: 30 });
      } else {
        //string -> JSON
        const carts = JSON.parse(previousCart);
        // 기존 carts 어레이에 cartItem을 추가한다
        carts.push(cartItem);
        cookie.set('cart', JSON.stringify(carts), { expires: 30 });
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
    <Box sx={{ height: '100vh' }}>
      <Alert open={open} onClickClose={() => setOpen(false)} />
      <Container maxWidth="md">
        {/* 조건부 렌더링 - product가 undefined가 아니면 렌더링한다 */}

        {product !== undefined && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 1 }}>
              <ImageSlider images={product.images} />
              <Box sx={{ ml: 4, mt: 2 }}>
                <Typography sx={{ mb: 5 }}>{product.brand_name}</Typography>
                <Typography variant="subtitle">{product.code}</Typography>
                <Typography variant="h5">{product.name}</Typography>
                {/* 
                  1. 함수 이름을 넘겨주는 방식 handleClickColor
                  2. 익명 화살표 함수로 호출하는 방식 () => handleClickColor()
                */}
                <ColorOption
                  colorImages={product.color_options_image}
                  color={color}
                  onClickColor={handleClickColor}
                  select={product.color_options_text}
                />

                <Select
                  id="size"
                  name="size"
                  autoWidth
                  value={size} //데이터 바인딩
                  sx={{ minWidth: '90%', height: 30, mt: 2, mb: 2 }}
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
                  <Box sx={{}}>
                    <Typography component="p">{size}</Typography>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
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
                      <Box>
                        <Typography variant="p">{product.price}</Typography>
                        <IconButton onClick={handleClickClose}>
                          <Close />
                        </IconButton>
                      </Box>
                    </Box>
                    <TotalBox>
                      <Typography variant="span">합계</Typography>
                      <Typography variant="h6">
                        {product.price * quantity}
                      </Typography>
                    </TotalBox>
                  </Box>
                )}
                <ButtonContainerBox>
                  <AddButton onClick={handleClickCart}>장바구니</AddButton>
                  <BuyButton>바로구매</BuyButton>
                </ButtonContainerBox>
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
