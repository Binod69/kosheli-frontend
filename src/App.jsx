import { Route, Routes } from 'react-router-dom';
import HomePageLayout from './layout/HomePageLayout';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

import './App.css';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="product/:id" element={<ProductScreen />} />
          <Route path="cart" element={<CartScreen />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
