import { Box, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import { styled } from '@mui/system';

const ColorChip = styled(Box)(({ colorUrl }) => ({
  backgroundImage: `url(${colorUrl})`,
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  margin: '16px',
  cursor: 'pointer',
}));

const CheckIcon = styled(Check)(({}) => ({
  color: 'white',
  width: '20px',
  height: '20px',
  margin: '16px',
  position: 'absolute',
  top: 0,
}));

export default function ColorOption({
  colorImages,
  color,
  onClickColor,
  select,
  handleClickChangedColor,
}) {
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        {colorImages.map((colorUrl, idx) => (
          <Box key={idx} sx={{ position: 'relative' }}>
            <ColorChip colorUrl={colorUrl} onClick={() => onClickColor(idx)} />
            {/* 선택한 color이면 Check를 렌더링한다 (if) &&연산자 */}
            {/* 삼항연산자: 조건문 ? [true] : [false] (if else) */}
            {color === select[idx] && <CheckIcon />}
          </Box>
        ))}
      </Box>
      <Typography sx={{ textAlign: 'center' }}>{color}</Typography>
    </Box>
  );
}
