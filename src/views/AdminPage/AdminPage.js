import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom/";
import AuthContext from "../../shared/context/auth-context";

const AdminPage = (props) => {

    const history = useHistory()
    const authContext = useContext(AuthContext)

    useEffect(() => {
        if(!authContext.isLogin) {
            history.replace("/login")
        }
    }, [])
    
    return (
        <div>
            <header>
                <div>{props.title}</div>
            </header>
        </div>
    )
}

export default AdminPage;