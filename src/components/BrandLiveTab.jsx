import { Box, IconButton, styled } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BrandLiveData from '../api/BrandLiveData.json';
import useImageSlider from '../utils/useImageSlider';

const TabBox = styled('div')({
  width: '906px',
  margin: '30px auto',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  position: 'relative',
});
const SlideTab = styled('ul')({
  display: 'flex',
  listStyle: 'none',
});

const TEXT_WIDTH = 280;
export default function BrandLiveTab({}) {
  const {} = useImageSlider({
    length: BrandLiveData.length,
    imageWidth: TEXT_WIDTH,
    isAutoPlay: false,
  });
  return (
    <TabBox>
      <IconButton sx={{ position: 'absolute', left: '0' }}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      {/* BrandLiveData의 마지막 인덱스에 위치한 브랜드 이름을 렌더링한다. */}
      <SlideTab>
        <li>{BrandLiveData[BrandLiveData.length - 1].brand}</li>
        {BrandLiveData.map((value, idx) => {
          return (
            <li
              style={{ width: TEXT_WIDTH, height: '44px', lineHeight: '44px' }}
              key={idx}
            >
              {value.brand}
            </li>
          );
        })}
        <li>{BrandLiveData[0].brand}</li>
      </SlideTab>
      <IconButton sx={{ position: 'absolute', right: '0' }}>
        <KeyboardArrowRightIcon />
      </IconButton>
    </TabBox>
  );
}
