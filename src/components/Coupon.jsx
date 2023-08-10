import styled from '@emotion/styled';
import { WidthFull } from '@mui/icons-material';
import { Box } from '@mui/material';

const CouponBox = styled('div')({

    display:'flex',
    padding:'0 80px',
    marginTop:'100px',


})
const NewJoinCoupon = styled('a')({
    justifyContent:'center',
})

const MobileCoupon = styled('a')({
    justifyContent:'center'
})

export default function Coupon(){
    return(
<Box>

<CouponBox>
    <NewJoinCoupon>
        <img src="https://cdn.hfashionmall.com/display/category/THM/A05/A03/contents/258_172432_1_KOR_20230206193640.jpg" style={{width:'603px', 'height':'83px'}} alt="" />
    </NewJoinCoupon>
        <MobileCoupon>
            <img src="https://cdn.hfashionmall.com/display/category/THM/A05/A03/contents/258_172432_2_KOR_20230206193654.jpg" style={{width:'603px', 'height':'83px'}} alt="" />
        </MobileCoupon>
</CouponBox>


</Box>
    )

}