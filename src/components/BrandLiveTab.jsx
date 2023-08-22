import { Box, IconButton, styled } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BrandLiveData from '../api/BrandLiveData.json';
import useImageSlider from '../utils/useImageSlider';

const TEXT_WIDTH = 280;

const TabBox = styled('div')({
  width: TEXT_WIDTH * 3 + 'px',
  margin: '30px auto',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  position: 'relative',
});
const SlideTab = styled('ul')({
  display: 'flex',
  listStyle: 'none',
  padding: '0',
});

const Item = styled('li')({
  minWidth: TEXT_WIDTH,
  height: '44px',
  lineHeight: '44px',
  color: 'gray',
  cursor: 'pointer',
});
const activeStyle = {
  color: 'black',
  cursor: 'unset',
};

export default function BrandLiveTab({}) {
  const { style, handleClickArrow, currentIdx } = useImageSlider({
    length: BrandLiveData.length,
    imageWidth: TEXT_WIDTH,
    isAutoPlay: false,
  });

  const activeIdx = currentIdx + 1;
  return (
    <TabBox>
      <IconButton
        onClick={() => handleClickArrow(true)}
        sx={{ position: 'absolute', left: '0', zIndex: 1 }}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      {/* BrandLiveData의 마지막 인덱스에 위치한 브랜드 이름을 렌더링한다. */}
      <SlideTab style={style}>
        <Item style={activeIdx === BrandLiveData.length - 1 ? activeStyle : {}}>
          {BrandLiveData[BrandLiveData.length - 1].brand}
        </Item>
        {BrandLiveData.map((value, idx) => {
          return (
            <Item
              key={idx}
              style={activeIdx === idx + 1 ? activeStyle : {}}
              onClick={
                activeIdx > idx + 1
                  ? () => handleClickArrow(true)
                  : activeIdx < idx + 1
                  ? () => handleClickArrow(false)
                  : undefined
              }
            >
              {value.brand}
            </Item>
          );
        })}
        <Item style={activeIdx === 0 ? activeStyle : {}}>
          {BrandLiveData[0].brand}
        </Item>
      </SlideTab>
      <IconButton
        onClick={() => handleClickArrow(false)}
        sx={{ position: 'absolute', right: '0' }}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </TabBox>
  );
}

// handleClickArrow(true) -> 현재 active한 Item의 왼쪽에 있으면 (currentIdx > 내가 나타내고 있는 idx)
// handleClickArrow(false) -> 현재 active한 Item의 오른쪽에 있으면 (currentIdx < idx)
