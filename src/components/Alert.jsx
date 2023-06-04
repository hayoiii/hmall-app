import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

export default function Alert({open, onClickClose}) {
  return (
    <Dialog open={open}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <DialogTitle>장바구니 담기 완료</DialogTitle>
          <IconButton onClick={onClickClose} sx={{ height: '36px' }}>
            <Close />
          </IconButton>
        </Box>
        <Typography component="p">해당상품이 장바구니에 담겼습니다.</Typography>
        <Typography component="p">장바구니로 이동하시겠습니까?</Typography>
        <Box>
          <Button variant="contained" sx={{ mr: 2 }}>
            계속 쇼핑하기
          </Button>
          <Button variant="contained">장바구니 보기</Button>
        </Box>
      </Box>
    </Dialog>
  );
}
