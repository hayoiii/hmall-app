import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';

import AddIcon from '@mui/icons-material/Add';
import MinimizeIcon from '@mui/icons-material/Minimize';
import DensityLargeIcon from '@mui/icons-material/DensityLarge';

const PriceContainer = styled(Box)`
  border: 1px solid black;
  margin-top: 40px;
  padding: 40px;
`;

const PriceInnerContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Money = styled(Typography)`
  font-size: 28px;
`;

function MoneyBox({ title, money }) {
  return (
    <Box>
      <Typography sx={{ fontSize: '14px' }}>{title}</Typography>
      <Money variant="span">{money}</Money>
      <Typography variant="span">원</Typography>
    </Box>
  );
}

// 체크된 상품의 총 금액, 총 정가, 총 할인되는 금액
export default function CartPrice({ total, price, discountPrice }) {
  /* 상품금액
  체크박스에 체크가 되어있으면 해당 상품의 가격을 보여준다
  전체선택 체크박스를 눌렀을 떄엔 전체 상품의 금액을 더해 준 값을 상품금액에 보여져야 한다 
  (원가로 보여줘야 할듯..??? )
  만약 상품 금액이 3만원 미만이면 배송비 + 2500원을 출력해준다
  할인금액..은 어떻계 계산하지? regular_price - price 한 가격을 다 더해줘야 하는데 모르겠ㄲ당
  전체금액은 상품금액 + 배송비 - 할인금액을 해야할듯! */

  const shippingFee = total > 30000 || total === 0 ? 0 : 2500;

  return (
    <PriceContainer>
      <PriceInnerContainer>
        <MoneyBox title={'상품금액'} money={total} />

        <AddIcon sx={{ ml: '40px', mr: '40px' }} />

        <MoneyBox title={'배송비'} money={shippingFee} />

        <MinimizeIcon sx={{ ml: '40px', mr: '40px', mb: '10px' }} />

        <MoneyBox title={'총 할인금액'} money={discountPrice} />

        <DensityLargeIcon sx={{ ml: '40px', mr: '40px' }} />

        <MoneyBox
          title={'결제금액'}
          money={total + shippingFee - discountPrice}
        />
      </PriceInnerContainer>
    </PriceContainer>
  );
}
