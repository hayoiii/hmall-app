import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  ); // JSX
}

export default App;
