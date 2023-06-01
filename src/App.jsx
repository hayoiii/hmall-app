import './App.css';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products/:code" element={<ProductDetailPage />} />
        <Route path="/products/" element={<ProductListPage />} />
        <Route path="/cartpage" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  ); // JSX
}

export default App;
