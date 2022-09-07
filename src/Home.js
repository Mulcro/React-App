import useFetch from "./useFetch";
import BlogList from "./blogList";

const Home = () => {
  
  const {data: blogs, isPending, error} = useFetch("http://127.0.0.1:5000/blogs");

  return (
        <div className="home">
          {error && <div className="error">{error}</div>}
          { isPending && 
          <><h4 className="msg">loading</h4><div className="pending">
            <div className="spin"></div>
          </div></>
          }
          {blogs && <BlogList blogs={blogs} title="All blogs"/>}
        </div>
     );
}
 
export default Home;