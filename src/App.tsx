import CategoryPage from './containers/CategoryPage/CategoryPage.tsx';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import MainPage from './containers/MainPage/MainPage.tsx';
import Header from './components/Header/Header.tsx';

const App: React.FC = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/categories" element={<CategoryPage />} />
      </Routes>
  </>
      );
};

export default App;
