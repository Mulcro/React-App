import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="notFount">
            <h2>Not found</h2>
            <p>The page you requested couldn't be found</p>
            <Link to="/">Back to homepage</Link>
        </div>
     );
}
 
export default NotFound
