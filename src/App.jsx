import { Route, Routes } from 'react-router-dom';
import HomePageLayout from './layout/HomePageLayout';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
// import { ThemeContext, themes } from './context/ThemeContext';
// import { useState } from 'react';

import './App.css';

function App() {
  // const [theme, setTheme] = useState(themes.light);

  // const handleThemeChange = () => {
  //   setTheme((prevTheme) =>
  //     prevTheme === themes.light ? themes.dark : themes.light
  //   );
  // };
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="product/:id" element={<ProductScreen />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
