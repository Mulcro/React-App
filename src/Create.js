import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [author,setAuthor] = useState("");
    const [isPending,setIsPending] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title,body,author}
        
        setIsPending(true);

        fetch('http://127.0.0.1:5000/blogs',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(blog)
        })
        .then(() => {
            console.log("Added new blog");
            setIsPending(false);
            navigate('/');
        })
     }

    return ( 
        <div className="create">
            <h2>Add new blog</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Blog Title</label>
                <input 
                type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="">Blog Content</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label htmlFor="">Blog Author</label>
                <select 
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                    <option value="mulero">mulero</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;