import Adminsidebar from '@/components/AdminSideBar'
import Usersidebar from '@/components/UserSideBar'
import React from 'react'

function AdminProducts() {
  return (
    <div className="flex-space-around">
    <Adminsidebar/>
      <div className="main-container">
           <h1>Admin Products</h1>
     </div>
     </div>
  )
}

export default AdminProducts
