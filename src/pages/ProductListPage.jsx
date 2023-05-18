import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import axios from '../api/axios.js';
import ProductItem from '../components/ProductItem.jsx';
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
    <Container maxWidth="md">
      {products.length > 0 && <ProductItem product={products[0]} />}
    </Container>
  );
}
