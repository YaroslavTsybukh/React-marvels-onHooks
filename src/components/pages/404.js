import {Link , useNavigate , useLocation} from "react-router-dom"

import Error from "../error/Error";

const NotFoundPage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const navigateToPage = () => {
        navigate(-1)
    }

    return (
        <div style={{"textAlign": "center"}}>
            <Error/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link
                style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}}
                onClick={navigateToPage}>
                Back to main page</Link>
        </div>
    )
}
export default NotFoundPage;
