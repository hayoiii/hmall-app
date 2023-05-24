import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  CssBaseline,
} from '@mui/material';
export default function ProductItem({ product }) {
  return (
    <Container sx={{ mt: 9 }} maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Card sx={{ boxShadow: 0 }}>
            <CardMedia
              sx={{ width:250, height: 300 }}
              image={product.images[0]}
            />
            {/* <img src={product.images[0]} width="250px" height="300px" alt="" /> */}
            <CssBaseline />
            <CardContent sx={{ p: 1 }}>
              <Typography
                variant="caption"
                component="div"
                sx={{ color: 'text.secondary' }}
              >
                {product.brand_name}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                {product.name}
              </Typography>
              <Typography variant="subtitle2">
                {product.price} / {product.regular_price}
                {/*   {product.price < product.regular_price ? (
                <span>
                  /
                  {((product.regular_price - product.price) / product.price) *
                    100}
                  %
                </span>
              ) : undefined} */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ boxShadow: 0 }}>
            <CardMedia
              sx={{ width:250, height: 300 }}
              image={product.images[0]}
            />
            {/* <img src={product.images[0]} width="250px" height="300px" alt="" /> */}
            <CssBaseline />
            <CardContent sx={{ p: 1 }}>
              <Typography
                variant="caption"
                component="div"
                sx={{ color: 'text.secondary' }}
              >
                {product.brand_name}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 0.2 }}>
                {product.name}
              </Typography>
              <Typography variant="subtitle2">
                {product.price} / {product.regular_price}
                {/*   {product.price < product.regular_price ? (
                <span>
                  /
                  {((product.regular_price - product.price) / product.price) *
                    100}
                  %
                </span>
              ) : undefined} */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
// (regular_price - price) / price * 100
// price === regular_price 면, 할인율은 보이지 않는다
// price < regular_price 면, 할인율을 계산해서 보여준다

// 삼항연산자 [조건] ? [true일 때의 값] : [false일 때의 값]
