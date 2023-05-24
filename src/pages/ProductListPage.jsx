import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import axios from '../api/axios.js';
import ProductItem from '../components/ProductItem.jsx';
import { Grid } from '@mui/material';
//'/'

export default function ProductListPage() {
  const [products, setProducts] = useState([]);

  // async await
  useEffect(() => {
    axios.get('/products').then((response) => {
      // response = {status: number, data: {}}
      setProducts(response.data.products);
    });
  }, []);
  return (
    <Container maxWidth="lg">
      {products.length > 0 && (
        <Grid container spacing={1}>
          {products.map((product, idx) => (
            <Grid key={idx} item xs={3}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
  // Array.map
}
