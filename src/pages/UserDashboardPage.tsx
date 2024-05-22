import PageTitle from "@/components/PageTitle"
import Usersidebar from "@/components/UserSideBar"

const UserDashboard = () => {
  return (
    <div className="flex-space-around">
      <PageTitle title="UserDashboard" />
      
       <Usersidebar/>
       <div className="main-container">
       <h1>User Dashboard page</h1>
       </div>
    </div>
  )
}

export default UserDashboard
