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
import styled from '@emotion/styled';
import { check } from 'prettier';
import OptionChange from './OptionChange';
import { data } from '../pages/ProductDetailPage';

const DeleteButton = styled(Button)`
  background-color: gray;
  &:hover {
    background-color: gray;
  }
  color: black;
  margin-right: 10px;
`;
export default function CartList() {
  const [carts, setCarts] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [checkedCarts, setCheckedCarts] = useState(carts);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // checkedList[i] === true이면 carts[i]는 선택되었다.
  // try { 예외가 발생하는 코드 } catch(e) { 예외 처리 코드}
  useEffect(() => {
    const cookieValue = cookie.get('cart');
    try {
      const carts = JSON.parse(cookieValue);
      setCarts(carts);
      setCheckedList(new Array(carts.length).fill(false));
    } catch {
      setCarts([]);
      setCheckedList([]);
    }
  }, []);

  useEffect(() => {
    // 1. checkedList 모두 true이면, all CheckBox 값을 true로 바꾼다
    // 2. 그게 아니면, all CheckBox 값을 false로 바꾼다

    // Array.includes()
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

  useEffect(() => {
    const checkedCarts = carts.filter((cart, idx) => {
      if (checkedList[idx]) {
        return true;
      } else {
        return false;
      }
    });
    setCheckedCarts(checkedCarts);
  }, [checkedList, carts]);

  function getTotal(checkedCarts) {
    // 체크된 상품의 총 금액(regular_price)
    // checkedList, carts

    // 1. 체크된 carts의 항목을 찾기
    /* Array.filter((value, index, array) => {
      필터링하는 조건
      return true or false
    }) */
    // Array.map((value, index, array) => {})
    // 2. checkedList 안에있는 항목의 price를 모두 합한다.

    let totalRegularlPrice = 0;
    checkedCarts.map((cart, idx) => {
      totalRegularlPrice =
        totalRegularlPrice + cart.regularPrice * cart.quantity;
    });
    return totalRegularlPrice;
  }

  function getDiscountPrice(checkedCarts) {
    let discountPrice = 0;
    let totalPrice = 0;
    // 1. totalRegularPrice - totalPrice
    // 2. cart.regular_price - cart.price
    checkedCarts.map((cart, idx) => {
      totalPrice = totalPrice + cart.price * cart.quantity;
    });
    discountPrice = getTotal(checkedCarts) - totalPrice;
    return discountPrice;
  }

  const handleClickDelete = (idx) => {
    // carts의 idx번째 항목을 삭제한다.
    // Array.splice
    let cart = [...carts];
    cart.splice(idx, 1);
    setCarts(cart);

    // 'cart' 쿠키를 새로운 carts 값으로 업데이트
    cookie.set('cart', JSON.stringify(cart), { expires: 30 });
  };

  const handleCheckedDelete = (carts) => {
    //체크한 아이템 값을 받아와서 값이 false인 것들만 모아 카트랑 쿠키에 추가하기?
    // 1. 체크한 아이템 값을 받아온다
    // 2. true랑 false를 체크해서 true인 아이템을 찾는다
    // 2. false인 아이템을 찾는다 -> 3. 해당 아이템으로만 다시 쿠키를 설정한다.
    const itemStorage = [];
    carts.map((cart, idx) => {
      if (checkedList[idx] === false) {
        itemStorage.push(cart);
      }
    });
    cookie.set('cart', JSON.stringify(itemStorage));
    setCarts(itemStorage);
    setCheckedList(new Array(itemStorage.length).fill(false));
  };

  const handleClickOptionChange = (idx) => {
    setOpen(true);
    setSelectedIndex(idx);
  };

  return (
    <Container>
      <OptionChange
        data={data}
        open={open}
        quantity={
          carts.length === 0 ? undefined : carts[selectedIndex].quantity
        }
        onClick={() => setOpen(false)}
        size={carts.length === 0 ? undefined : carts[selectedIndex].size}
        color={carts.length === 0 ? undefined : carts[selectedIndex].color}
      />
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
                  onDelete={() => handleClickDelete(idx)}
                  onClick={() => handleClickOptionChange(idx)}
                />
              );
            })}
          </TableHead>
        </Table>
      </TableContainer>

      <Box>
        <DeleteButton onClick={() => handleCheckedDelete(carts)}>
          선택삭제
        </DeleteButton>
        <DeleteButton>품절삭제</DeleteButton>
      </Box>

      <CartPrice
        total={getTotal(checkedCarts)}
        discountPrice={getDiscountPrice(checkedCarts)}
      />

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
