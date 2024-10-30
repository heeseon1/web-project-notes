import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// 페이지 이동 시 스크롤 맨 위로
//import ScrollTop from './components/ScrollTop';

// User 페이지
import UserLayout from './layouts/user/routerUser';
import Main from './pages/user/Main';

// Admin 페이지
import AdminLayout from './layouts/admin/routerAdmin';
import AdminMain from './pages/admin/Main';

// 404 페이지
import NotFound from './components/NotFound';


function App() {
  return (
    <Router>
      <Routes>

        {/* 사용자 페이지 라우트 */}
        <Route path="/" element={<UserLayout />}>
        <Route index element={<Main />} />
        </Route>

        {/* 관리자 페이지 라우트 */}
        <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<AdminMain />} />
        </Route>

        {/* 404 페이지 라우트 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
