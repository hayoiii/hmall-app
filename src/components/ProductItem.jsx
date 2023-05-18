import { Box, Grid, Typography } from '@mui/material';
export default function ProductItem({ product }) {
  return (
    <Box>
      <Grid>
        <Box>
          <img src={product.images[0]} width="300px" height="300px" alt="" />
        </Box>
        <Typography>{product.brand_name}</Typography>
        <Typography>{product.name}</Typography>
        <Typography>
          {product.price}
          {product.price < product.regular_price ? (
            <span>
              /{((product.regular_price - product.price) / product.price) * 100}
              %
            </span>
          ) : undefined}
        </Typography>
      </Grid>
    </Box>
  );
}
// (regular_price - price) / price * 100
// price === regular_price 면, 할인율은 보이지 않는다
// price < regular_price 면, 할인율을 계산해서 보여준다

// 삼항연산자 [조건] ? [true일 때의 값] : [false일 때의 값]
