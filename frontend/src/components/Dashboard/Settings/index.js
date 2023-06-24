
import  DeleteAccount from  "./DeleteAccount"
import  UpdatePassword from "./UpdatePassword"
export default function Settings() {
    return (
      <>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
          Edit Profile
        </h1>

        <UpdatePassword />
        {/* Delete Account */}
        <DeleteAccount />
      </>
    )
  }