import Adminsidebar from "@/components/AdminSideBar"
import PageTitle from "@/components/PageTitle"

const AdminDashboard = () => {
  return (
    <div className="flex-space-around">
      <PageTitle title="UserDashboard" />
      <Adminsidebar />
      <div className="main-container">
        <h1>Admin Dashboard page</h1>
      </div>
    </div>
  )
}

export default AdminDashboard
