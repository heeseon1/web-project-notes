// src/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="admin-wrap">
      <main id="admin-main"> {/* 관리자 메인 레이아웃 */}
        <div style={{ marginTop: '100px', padding: '1%' }}>
          <Outlet /> {/* 여기서 자식 라우트를 렌더링 */}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
