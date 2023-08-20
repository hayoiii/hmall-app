import { Box, IconButton, styled } from '@mui/material';
import breakLine from '../utils/breakLine';
import useImageSlider from '../utils/useImageSlider';
import { useCallback } from 'react';

const IMAGE_WIDTH = 499;

const ImageBox = styled('figure')({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  margin: 0,
});

const StyledImage = styled('img')({
  width: '499px',
  borderBottomRightRadius: '20%',
});

const ImgCaption = styled('figcaption')({
  position: 'absolute',
  bottom: '50px',
  color: 'white',
});

const Brand = styled('span')({
  fontSize: '14px',
});

const BrandTitle = styled('h3')({
  margin: '0',
  fontSize: '30px',
});

function SlideImage({ product }) {
  return (
    <ImageBox>
      <StyledImage src={product.src} alt="" />
      <ImgCaption
        style={{ position: 'absolute', bottom: '50px', color: 'white' }}
      >
        <Brand>{product.brand}</Brand>
        <BrandTitle>{breakLine(product.title)}</BrandTitle>
        <Brand>{product.subTitle}</Brand>
      </ImgCaption>
    </ImageBox>
  );
}

export default function BrandLiveSlider({ products }) {
  const { style, currentIdx, handleClickIndicator } = useImageSlider({
    length: products.length,
    isAutoPlay: true,
    imageWidth: IMAGE_WIDTH,
  });
  const indicatorColor = useCallback(
    (idx) => {
      // currentIdx 0 ~ n + 1
      // idx 0 ~ n - 1
      if (currentIdx === 0 && idx === products.length - 1) {
        return '#c2935f';
      } else if (currentIdx === products.length + 1 && idx === 0) {
        return '#c2935f';
      } else if (currentIdx - idx === 1) {
        return '#c2935f';
      } else {
        return '#eee';
      }
    },
    [currentIdx, products],
  );

  return (
    <Box sx={{ width: IMAGE_WIDTH, overflow: 'hidden', position: 'relative' }}>
      <Box style={style} sx={{ display: 'flex' }}>
        <SlideImage product={products[products.length - 1]} />
        {products.map((product, idx) => {
          return <SlideImage key={idx} idx={idx} product={product} />;
        })}
        <SlideImage product={products[0]} />
      </Box>

      {/* 인디케이터 */}
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translate(-50%, 0%)',
        }}
      >
        {products.map((product, idx) => {
          return (
            <Box
              // onClick={() => handleClickIndicator(idx)}
              key={idx}
              sx={{
                width: 10,
                height: 10,
                backgroundColor: indicatorColor(idx),
                borderRadius: '50%',
                ml: 1,
                cursor: 'pointer',
              }}
            ></Box>
          );
        })}
      </Box>
    </Box>
  );
}
