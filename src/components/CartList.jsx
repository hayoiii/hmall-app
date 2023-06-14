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

import { data } from '../pages/ProductDetailPage';

const DeleteButton = styled(Button)`
  background-color: gray;
  &:hover {
    background-color: gray;
  }
  color: black;
  margin-right: 10px;
`;
export default function CartList({
  carts,
  onDeleteItem,
  onDeleteCheckedItems,
  onChangeOption,
  checkedCarts,
}) {
  const [checkedList, setCheckedList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  //TODO: checkedCarts는 CartPage에서 관리한다
  const [checkedCarts, setCheckedCarts] = useState(carts);

  // checkedList[i] === true이면 carts[i]는 선택되었다.
  // try { 예외가 발생하는 코드 } catch(e) { 예외 처리 코드}
  useEffect(() => {
    try {
      setCheckedList(new Array(carts.length).fill(false));
    } catch {
      setCheckedList([]);
    }
  }, [carts]);

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
                  onDelete={() => onDeleteItem(idx)}
                  onChangeOption={() => onChangeOption(idx)}
                />
              );
            })}
          </TableHead>
        </Table>
      </TableContainer>

      <Box>
        <DeleteButton onClick={() => onDeleteCheckedItems(checkedList)}>
          선택삭제
        </DeleteButton>
        <DeleteButton>품절삭제</DeleteButton>
      </Box>
    </Container>
  );
}
