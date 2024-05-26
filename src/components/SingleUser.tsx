import { useDispatch } from "react-redux"
import "../styles/App.css"
import { Button } from "./ui/button"
import { AppDispatch } from "@/redux/store"
import { toastError, toastSuccess } from "@/utils/toast"
import { TableBody, TableCell, TableRow } from "@mui/material"
import { User } from "@/types"
import { banUnBanUser } from "@/redux/slices/userSlice"

function SingleUser(props: { user: User; totalPage: number }) {
  const { user, totalPage } = props
  const dispatch: AppDispatch = useDispatch()

  const handleBanUnBan = async (userId: string) => {
    try {
      userId && (await dispatch(banUnBanUser(userId)))
      toastSuccess("user updated")
    } catch (error: any) {
      toastError("an error occur ")
    }
  }

  return (
    <TableBody>
      <TableRow
        key={user.userID}
        sx={{ "&:last-child td ,&:last-child th": { border: 1, borderColor: "#EFEBE7" } }}
      >
        <TableCell sx={{ fontWeight: "medium", fontSize: 16 }} component="th" scope="row">
          {user.username}
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phoneNumber}</TableCell>
        <TableCell>{user.address}</TableCell>
        <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
        <TableCell>{user.isBanned ? "Yes" : "No"}</TableCell>
        <TableCell>
          <div className="flex items-center justify-center gap-x-2">
            <Button
              size="sm"
              variant="delete"
              onClick={() => {
                handleBanUnBan(user.userID)
              }}
            >
              {user.isBanned ? "Unban" : "Ban"}
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default SingleUser
