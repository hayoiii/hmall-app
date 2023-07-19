import {
  Dialog,
  DialogTitle,
  Box,
  Button,
  Typography,
  IconButton,
  Select,
  TextField,
  MenuItem,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import ColorOption from './ColorOption';
import { useState, useEffect, useRef } from 'react';
import cookie from 'js-cookie';

export default function OptionChange({
  open,
  data,
  quantity,
  onClick,
  size,
  color,
  onChangeCookie,
}) {
  const refQuantity = useRef(null);

  const [changedQuantity, setChangedQuantity] = useState(quantity);
  const [changedSize, setChangedSize] = useState(size);
  const [changedColor, setChangedColor] = useState(color);

  useEffect(() => {
    // changedQuantity, changedSize, changedColor를 초기화한다
    setChangedQuantity(quantity);
    setChangedSize(size);
    setChangedColor(color);
  }, [quantity, size, color]);
  //유저 인풋에 따라 상태를 업데이트시키는 핸들러 ^___________________^ 안하면 주금 ㅠㅠ 또르르
  // 유저가 선택한 값으로 바뀌어야함.. 그리고 변경버튼을 누르면 cookie를 유저가 변경한 값으로 업데이트해줘야함
  const handleClickChangedQuantity = (e) => {
    setChangedQuantity(e.target.value);
  };

  const handleClickChangedSize = (e) => {
    setChangedSize(e.target.value);
  };

  const handleClickChangedColor = (idx) => {
    setChangedColor(data.color_options_text[idx]);
  };

  const handleClickChangedOption = () => {
    onChangeCookie(changedColor, changedSize, changedQuantity);

    // const changedCartOption = cookie.get('cart');
    // const option = JSON.parse(changedCartOption);
    // // option 어레이 중에 selectedIndex 번째 항목을 바꿔준다
    // option[selectedIndex] = {
    //   ...option[selectedIndex],
    //   color: changedColor,
    //   size: changedSize,
    //   quantity: changedQuantity,
    // };
    // cookie.set('cart', JSON.stringify(option, { expires: 30 }));
    // onClick();
  };

  useEffect(() => {
    setTimeout(function () {
      if (!refQuantity.current) return;
      if (open === true) {
        refQuantity.current.focus();
      }
    }, 500);
  }, [open]);

  return (
    <Dialog open={open}>
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Typography>옵션변경</Typography>
          <IconButton>
            <Close onClick={onClick} />
          </IconButton>
        </Box>
      </Box>
      <Box>
        <Box>
          <img src={data.images[0]} width="100px" height="100px" />
        </Box>
        <Box>
          <Typography>{data.brand_name}</Typography>
          <Typography>{data.name}</Typography>
          <ColorOption
            colorImages={data.color_options_image}
            select={data.color_options_text}
            color={changedColor}
            onClickColor={handleClickChangedColor}
          />

          <Select
            id="size"
            value={changedSize}
            onChange={(e) => handleClickChangedSize(e)}
          >
            {data.size_options.map((size, idx) => {
              return (
                <MenuItem key={idx} value={size}>
                  {size}
                </MenuItem>
              );
            })}
          </Select>
          <TextField
            inputRef={(ref) => (refQuantity.current = ref)}
            id="num"
            type="number"
            value={changedQuantity}
            onInput={(e) => handleClickChangedQuantity(e)}
          ></TextField>
        </Box>
      </Box>
      <Button onClick={() => handleClickChangedOption()}>변경</Button>
    </Dialog>
  );
}
