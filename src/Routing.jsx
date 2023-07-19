import { Route, Routes } from 'react-router-dom';
import HomePageLayout from './layout/HomePageLayout';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import { Toaster } from 'react-hot-toast';
import RegisterScreen from './screens/RegisterScreen';
import './App.css';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="product/:id" element={<ProductScreen />} />
          <Route path="cart" element={<CartScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />

          <Route path="" element={<PrivateRoute />}>
            <Route path="shipping" element={<ShippingScreen />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default Routing;
