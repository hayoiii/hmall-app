import { Box, IconButton, styled } from '@mui/material';
import BrandLiveData from '../api/BrandLiveData.json';
import brandSlide from '../api/brandslide.json';
import useImageSlider from '../utils/useImageSlider';
import { useCallback } from 'react';

import BrandLiveSlider from './BrandLiveSlider';
import BrandLiveTab from './BrandLiveTab';

const BrandTab = styled('div')({
  textAlign: 'center',
  marginTop: '90px',
  padding: '0 80px',
});

const ItemBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const ItemList = styled('div')({
  display: 'flex',
  width: '50%',
  justifyContent: 'center',
});

export default function BrandLive() {
  return (
    <BrandTab>
      <h3>BRAND LIVE</h3>
      <BrandLiveTab />
      <ItemBox>
        <ItemList>
          {BrandLiveData[0].products.map((product, idx) => {
            return (
              <figure style={{ margin: 0 }} key={idx}>
                <img
                  style={{ width: '130px' }}
                  src={product.img}
                  alt={product.name}
                />
                <figcaption
                  style={{
                    fontSize: '14px',
                    padding: '0 10px',
                    textAlign: 'left',
                  }}
                >
                  <p>{product.brand}</p>
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                </figcaption>
              </figure>
            );
          })}
        </ItemList>
        <BrandLiveSlider products={brandSlide[0].products} />
      </ItemBox>
    </BrandTab>
  );
}

/* const array = ['a', 'b', 'c', 'd'] -> index는 숫자
const object = {key: 'value'} -> index가 우리가 정한 string
const object = {0: 'a', 1: 'b'} === array
object['key'] === 'value'
object.key === object['key'] 
선생님의 명강의 흔적
*/
