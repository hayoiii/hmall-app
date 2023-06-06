import { TableRow, TableCell, Checkbox, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
const carts = [
  {
    image:
      'https://cdn.hfashionmall.com/goods/THBR/22/05/11/GM0122051149916_5_ORGINL.jpg?RS=960x960&AR=0&CS=640x960',
    title: 'TOMMY HILFIGER MEN',
    item: '스몰 센터 그래픽 티셔츠',
    color: 'NAVY',
    size: 'S',
    price: 13000,
    quantity: '1',
  },
];
export default function CartItem({ cartItem, checked, onChange }) {
  return (
    <TableRow>
      <TableCell sx={{ width: '60px' }}>
        <Checkbox checked={checked} onChange={onChange} />
      </TableCell>
      <TableCell sx={{ width: '40%' }}>
        <Box sx={{ display: 'flex' }}>
          <img src={cartItem.image} width="15%" />
          <Box>
            <Typography>{cartItem.title}</Typography>
            <Typography>{cartItem.item}</Typography>
            <Box sx={{ mb: '40px' }}>
              <Typography variant="span" sx={{ mr: '16px' }}>
                {cartItem.color} {cartItem.size}
              </Typography>
              <Typography variant="span">
                수량 : {cartItem.quantity} 개
              </Typography>
            </Box>
            <Typography>옵션 변경</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">{cartItem.price * cartItem.quantity}</TableCell>
      <TableCell sx={{ position: 'relative', width: '15%' }} align="center">
        <CloseIcon sx={{ position: 'absolute', top: '10px', right: '10px' }} />
        <Button sx={{ bgcolor: 'black', color: 'white' }}> 바로구매 </Button>
      </TableCell>
      <TableCell sx={{ width: '15%' }}>
        <Typography align="center">[본사배송]</Typography>
        <Typography align="center">무료배송</Typography>
        <Typography align="center">30,000원 미만 결제시 2,500원</Typography>
      </TableCell>
    </TableRow>
  );
}
