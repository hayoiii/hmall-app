import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Box,
  Typography,
  Container,
} from '@mui/material';
import Button from '@mui/material/Button';
import CartItem from './CartItem';
import { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import CartPrice from '../components/CartPrice';

export default function CartList() {
  const [carts, setCarts] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  // checkedList[i] === true이면 carts[i]는 선택되었다.
  useEffect(() => {
    const cookieValue = cookie.get('cart');
    const carts = JSON.parse(cookieValue);
    setCarts(carts);
    setCheckedList(new Array(carts.length).fill(false));
  }, []);

  useEffect(() => {
    // 1. checkedList 모두 true이면, all CheckBox 값을 true로 바꾼다
    // 2. 그게 아니면, all CheckBox 값을 false로 바꾼다

    // Array.includes()
    console.log('useEffect 실행');
    if (checkedList.includes(false)) {
      setAllChecked(false);
    } else {
      setAllChecked(true);
    }
  }, [checkedList]);

  const handleClickChecked = (idx) => {
    // checkedList[idx] = false
    // [true, true, false, false]
    // [false, true, false, false]

    // 1. 원래 checkedList를 temp라는 배열에 복사한다.
    // 2. temp[idx] = false  [false, true, false, false]
    // 3. setCheckedList(temp)
    let temp = [...checkedList];
    temp[idx] = !checkedList[idx]; // !true === false !false === true
    setCheckedList(temp);
  };

  const handleChangeAllChecked = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setCheckedList(new Array(carts.length).fill(true));
      setAllChecked(true);
    } else if (!checked) {
      setCheckedList(new Array(carts.length).fill(false));
      setAllChecked(false);
    }

    // setCheckedList(new Array(carts.length).fill(checked))
  };

  return (
    <Container>
      <TableContainer>
        <Table>
          <caption></caption>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={allChecked}
                  onChange={(e) => handleChangeAllChecked(e)}
                />
              </TableCell>
              <TableCell align="center">상품정보</TableCell>
              <TableCell align="center">상품금액</TableCell>
              <TableCell align="center">선택</TableCell>
              <TableCell align="center">배송정보</TableCell>
            </TableRow>
            {/* carts를 <CartItem/>으로 맵핑 */}
            {carts.map((item, idx) => {
              return (
                <CartItem
                  key={idx}
                  cartItem={item}
                  checked={checkedList[idx]}
                  onChange={() => handleClickChecked(idx)}
                />
              );
            })}
          </TableHead>
        </Table>
      </TableContainer>

      <Box>
        <Button sx={{ bgcolor: 'gray', color: 'black', mr: '10px' }}>
          선택삭제
        </Button>
        <Button sx={{ bgcolor: 'gray', color: 'black' }}>품절삭제</Button>
      </Box>

      <CartPrice />

      <Box align="center" sx={{ mt: '30px' }}>
        <Button sx={{ bgcolor: 'black', color: 'white', mr: '10px' }}>
          쇼핑계속하기
        </Button>
        <Button sx={{ bgcolor: 'darkorange', color: 'white' }}>
          선택상품 주문하기
        </Button>
      </Box>
    </Container>
  );
}
