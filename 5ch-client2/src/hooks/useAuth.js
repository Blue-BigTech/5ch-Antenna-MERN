import { useContext } from "react"
import { AuthContext } from "../context/AllContext"

const useAuth = () => {
    const authValues = useContext(AuthContext);
    return authValues.auth
}
export default useAuth;