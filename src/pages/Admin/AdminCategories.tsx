import Adminsidebar from '@/components/AdminSideBar'
import Usersidebar from '@/components/UserSideBar'
import React from 'react'

function AdminCategories() {
  return (
    <div className="flex-space-around">
    <Adminsidebar/>
      <div className="main-container">
           <h1>Admin Categories</h1>
     </div>
     </div>
  )
}

export default AdminCategories
