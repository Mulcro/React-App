import { Link } from "react-router-dom";

const BlogList = ({blogs, title}) => {
   
    return ( 
        <div className="blog-lsit">
            <h2>{title}</h2>
            {blogs.map(blog =>(
                <div className="blogPreview" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        <h2>{ blog.title }</h2>
                        <p>Written by { blog.author }</p>
                    </Link>
                </div>
            ))}
        </div>
     );
}
 
export default BlogList;