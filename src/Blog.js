import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Blog = () => {
    const {id} = useParams()

    const {data: blog, isPending, error} = useFetch(`http://127.0.0.1:5000/blogs/${id}`);

    return ( 
        <div className="blog-details ">
            {error && <div className="error">{error}</div>}
            { isPending && 
            <div className="pending">
                <div className="spin"></div>
            </div>
            }
            {blog && 
                <div className="blog-content">
                    <h2 className="blog-title">{blog.title}</h2>
                    <p className="blog-body">{blog.body}</p>
                    <p className="blog-author">Written by {blog.author}</p>
                </div>
            }
        </div>
     );
}
 
export default Blog;