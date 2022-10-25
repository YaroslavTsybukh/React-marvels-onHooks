import {Link , useNavigate} from "react-router-dom"
import {Helmet} from "react-helmet"

import Error from "../error/Error";

const NotFoundPage = () => {
    const navigate = useNavigate()

    const navigateToPage = () => {
        navigate(-1)
    }

    return (
        <div style={{"textAlign": "center"}}>
            <Helmet>
                <meta
                    name="description"
                    content="404page"
                />
                <title>404page</title>
            </Helmet>
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
