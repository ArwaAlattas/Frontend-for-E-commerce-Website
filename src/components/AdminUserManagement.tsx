import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

import "../styles/products.css"
import PageTitle from "@/components/PageTitle"
import { AppDispatch } from "@/redux/store"
import Adminsidebar from "./AdminSideBar"
import useUserState from "@/hooks/UserState"
import { fetchUsers } from "@/redux/slices/userSlice"
import SingleUser from "./SingleUser"

const AdminUserManagement = () => {
  const { users, isLoading, error, totalPages,userData } = useUserState()
  const dispatch: AppDispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [sortBy, setSortBy] = useState<string>("name")
  const [isAscending, setIsAscending] = useState("true")


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers({ pageNumber, pageSize, keyword, sortBy, isAscending }))
    }
    fetchData()
  }, [pageNumber, keyword, sortBy, isAscending])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault
    setKeyword(e.target.value)
  }
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "NameDEC":
        setSortBy("Name")
        setIsAscending("false")
        break
      case "NameASC":
        setSortBy("Name")
        setIsAscending("true")
        break
      case "DateASC":
        setSortBy("date")
        setIsAscending("true")
        break
      case "DateDEC":
        setSortBy("date")
        setIsAscending("false")
        break
    }}

  return (
    <div className="flex-space-around">
      <Adminsidebar />
      <div className="main-container">
        <h1 className="text-2xl uppercase mb-1">Users</h1>
        <PageTitle title="Categories" />

        {isLoading && <p>Loading ... </p>}
        {error && <p className="text-red-500">Error{error}</p>}

        <div className="flex justify-between w-full items-center  ">
          <div>
            <input
              className="search-bar"
              type="text"
              placeholder="Search Products"
              value={keyword}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex justify-end gap-2 items-center w-full  ">
          <select
            className="sort-by h-8"
            name="Sort"
            defaultValue={"DEFAULT"}
            onChange={handleSortChange}
          >
            <option value="DEFAULT" disabled hidden>
              Sort
            </option>
            <optgroup label="By Name">
              <option value="NameASC">A to Z</option>
              <option value="NameDEC">Z to A </option>
            </optgroup>
            <optgroup label="By Date">
              <option value="DateDEC">New to Old</option>
              <option value="DateASC">Old to New</option>
            </optgroup>
          </select>
          </div>
        </div>
       

        <hr className="line" />
        <TableContainer component={Paper} >
          <Table  sx={{ mainWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: '#EFEBE7' ,fontSize: 34, fontWeight: 'medium' }} >
              <TableRow>
                <TableCell sx={{fontSize: 18, fontWeight: 'medium' }} >Username</TableCell>
                <TableCell sx={{fontSize: 18, fontWeight: 'medium' }}>Email</TableCell>
                <TableCell sx={{fontSize: 18, fontWeight: 'medium' }}>phoneNumber</TableCell>
                <TableCell sx={{fontSize: 18, fontWeight: 'medium' }}>Address</TableCell>
                <TableCell sx={{fontSize: 18, fontWeight: 'medium' }}>Is Admin</TableCell>
                <TableCell sx={{fontSize: 18, fontWeight: 'medium' }}>Is Banned</TableCell>
                <TableCell sx={{fontSize: 18, fontWeight: 'medium' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            {users &&
              users.length > 0 &&
              users?.map((user) => (
                <SingleUser
                  key={user.userID}
                   user={user}
                  totalPage={totalPages}
                />
              ))}
          </Table>
        </TableContainer>
        {/* <div className="pagination-section flex gap-1 mt-8">
          <Button
            onClick={() => setPageNumber((currentPage) => currentPage - 1)}
            disabled={pageNumber === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button key={index} onClick={() => setPageNumber(index + 1)}>
              {index + 1}
            </Button>
          ))}
          <Button
            onClick={() => setPageNumber((currentPage) => currentPage + 1)}
            disabled={pageNumber === totalPages}
          >
            Next
          </Button>
        </div> */}
      </div>
    </div>
  )
}

export default AdminUserManagement


