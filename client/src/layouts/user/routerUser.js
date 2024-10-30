// src/UserLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';


const UserLayout = () => {

  return (
    <div className="wrap">
      <main id="main"> {/* 메인 레이아웃 */}
        <div style={{ marginTop: '90px' }}>
          <Outlet /> {/* 여기서 자식 라우트를 렌더링 */}
        </div>
      </main>
      
    </div>
  );
}

export default UserLayout;
