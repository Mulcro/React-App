from flask import Flask,request, jsonify, abort
from models import setUpDb, Blog
from flask_cors import CORS
#Create a database for blogs and allow the backend server to access them with the ability to GET POST DELETE and PATCH

def createApi():
    app = Flask(__name__)
    setUpDb(app)
    
    #Seting up cross origin resource sharing
    CORS(app)

    @app.after_request
    def after_request(response):
        response.headers.add(
            "Access-Control-Allow-Headers","Content-Type, Authorization"
        )
        response.headers.add(
            "Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS" 
        )
        return response
    ##

    @app.route('/blogs', methods=['GET'])
    def getBlogs():
        try:
            blogs = Blog.query.all()

            formattedBlogs = [blog.format() for blog in blogs]
        except:
            abort(404)

        return jsonify({
            "blogs": formattedBlogs
        })

    @app.route('/blogs/<int:blogId>', methods=['GET'])
    def getBlog(blogId):
        try:
            blog = Blog.query.get(blogId)

            formattedBlog = blog.format()
        except:
            abort(404)
        
        return jsonify({
            "blogs": formattedBlog
        })

    @app.route('/blogs', methods=['POST'])
    def createBlog():
        try:
            body = request.get_json()

            blog = Blog(
                title = body['title'],
                author = body['author'],
                body = body['body']
            )
            blog.insert()

            blogs = Blog.query.all()
            formattedBlogs = [blog.format() for blog in blogs]
            
            return jsonify({
                "blogs": formattedBlogs
            })
        except:
            abort(422)
        

    @app.route('/blogs/<int:blogId>',methods=['DELETE'])
    def deleteBlog(blogId):
        try:
            blog = Blog.query.get(blogId)
            blog.delete()
            
            blogs = Blog.query.all()
            formattedBlogs = [blog.format() for blog in blogs]

            return jsonify({
                "blogs": formattedBlogs
            })
        except:
            abort(422)

    
    @app.errorhandler(404)
    def not_found(error):
        return (
            jsonify({"success": False, "error": 404, "message": "resource not found"}),
            404,
        )

    @app.errorhandler(422)
    def unprocessable(error):
        return (
            jsonify({"success": False, "error": 422, "message": "unprocessable"}),
            422,
        )

    @app.errorhandler(405)
    def bad_request(error):
        return jsonify({"success": False, "error": 405, "message": "Method not allowed"}), 405

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({"success": False, "error": 400, "message": "bad request"}), 400

    if __name__ == '__main__':
        app.run(debug=True)

    return app

createApi()

