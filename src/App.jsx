import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  Home,
  SingleProduct,
  Cart,
  Error,
  About,
  Products,
} from './pages';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts } from './features/products/productsSlice';



const App = () => {
  const dispatch = useDispatch()
useEffect(()=>{
  dispatch(getAllProducts())
},[])
  return (
    <Router>
    <Navbar />
    <Sidebar />
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='cart' element={<Cart />} />
      <Route path='products' element={<Products />} />
      <Route path='products/:id' element={<SingleProduct />} />
      <Route path='*' element={<Error />} />
    </Routes>
    <Footer />
  </Router>
  );
};
export default App;
