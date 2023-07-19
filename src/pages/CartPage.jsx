import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import CartList from '../components/CartList';
import CartPrice from '../components/CartPrice';
import { data } from '../pages/ProductDetailPage';
import OptionChange from '../components/OptionChange';
import cookie from 'js-cookie';
import { useCallback, useMemo } from 'react';

const Cart = styled(Typography)`
  font-size: 24px;
  text-align: center;
`;

export default function CartPage() {
  const [carts, setCarts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  //TODO: checkedCarts는 CartPage에서 관리한다
  const [checkedCarts, setCheckedCarts] = useState(carts);

  useEffect(() => {
    const cookieValue = cookie.get('cart');
    try {
      const carts = JSON.parse(cookieValue);
      setCarts(carts);
    } catch {
      setCarts([]);
    }
  }, []);

  // useCallback(함수, [상태])
  const handleChangeCookie = useCallback(
    (changedColor, changedSize, changedQuantity) => {
      // 자식 컴포넌트 OptionChange가 쿠키를 변경하고 호출하는 함수
      // 쿠키를 다시 받아와서 setCarts
      const optionCookie = cookie.get('cart');
      const option = JSON.parse(optionCookie);
      // option 어레이 중에 selectedIndex 번째 항목을 바꿔준다
      option[selectedIndex] = {
        ...option[selectedIndex],
        color: changedColor,
        size: changedSize,
        quantity: changedQuantity,
      };
      cookie.set('cart', JSON.stringify(option, { expires: 30 }));
      setCarts(option);
      setOpen(false);
    },
    [selectedIndex],
  );
  const handleClickOptionChange = useCallback((idx) => {
    setOpen(true);
    setSelectedIndex(idx);
  }, []);

  // useMemo(함수, [])
  // () => { return 값 }
  const total = useMemo(() => {
    let totalRegularlPrice = 0;
    checkedCarts.map((cart, idx) => {
      totalRegularlPrice =
        totalRegularlPrice + cart.regularPrice * cart.quantity;
    });
    return totalRegularlPrice;
  }, [checkedCarts]);

  /*   function getTotal(checkedCarts) {
    // 체크된 상품의 총 금액(regular_price)
    // checkedList, carts

    // 1. 체크된 carts의 항목을 찾기
    Array.filter((value, index, array) => {
      필터링하는 조건
      return true or false
    }) 
    // Array.map((value, index, array) => {})
    // 2. checkedList 안에있는 항목의 price를 모두 합한다. 
  }*/

  const discountPrice = useMemo(() => {
    let discountPrice = 0;
    let totalPrice = 0;
    // 1. totalRegularPrice - totalPrice
    // 2. cart.regular_price - cart.price
    checkedCarts.map((cart, idx) => {
      totalPrice = totalPrice + cart.price * cart.quantity;
    });
    discountPrice = total - totalPrice;
    return discountPrice;
  }, [total, checkedCarts]);

  const handleClickDelete = (idx) => {
    // carts의 idx번째 항목을 삭제한다.
    // Array.splice
    let cart = [...carts];
    cart.splice(idx, 1);
    setCarts(cart);

    // 'cart' 쿠키를 새로운 carts 값으로 업데이트
    cookie.set('cart', JSON.stringify(cart), { expires: 30 });
  };
  const handleCheckedDelete = (checkedList) => {
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
  };

  const onClickCheckedCarts = (checkedList) => {
    const checkedCarts = carts.filter((cart, idx) => {
      if (checkedList[idx]) {
        return true;
      } else {
        return false;
      }
    });
    setCheckedCarts(checkedCarts);
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
        onChangeCookie={handleChangeCookie}
      />
      <Cart>장바구니</Cart>

      <CartList
        carts={carts}
        onClickCheckedCarts={onClickCheckedCarts}
        onDeleteItem={(idx) => handleClickDelete(idx)}
        onChangeOption={(idx) => handleClickOptionChange(idx)}
        onDeleteCheckedItems={(checkedList) => handleCheckedDelete(checkedList)}
      />

      <CartPrice total={total} discountPrice={discountPrice} />

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
