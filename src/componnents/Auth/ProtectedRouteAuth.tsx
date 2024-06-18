import { useAppSelector } from "../../store/hocjs"
import { Navigate } from "react-router-dom"
const ProtectedRouteAuth = ({children }: {children: React.ReactNode} ) => {
    const {accessToken} = useAppSelector((state) => state.auth)
 
    if(!accessToken){
        return <Navigate to={"/login"}/>
    }

  return (
   <>{children} </>
  )
}

export default ProtectedRouteAuth