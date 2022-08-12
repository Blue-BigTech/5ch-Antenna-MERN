import { useContext } from "react";
import { AuthContext } from "../context/AllContext";

const useGlobalContext = () => {
    const value = useContext(AuthContext);
    return value;
}


export default useGlobalContext;