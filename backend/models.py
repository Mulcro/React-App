from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer


databaseName = "react_project"
databasePath = "postgresql://{}:{}@{}/{}".format(
    "postgres","Blacklife","localhost:5432", databaseName
)

db = SQLAlchemy()

def setUpDb(app,databasePath = databasePath):
    app.config["SQLALCHEMY_DATABASE_URI"] = databasePath
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()


class Blog(db.Model):

    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    body = Column(String, nullable=False)

    def insert(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'body': self.body
        }
    



#Connect to postgres
#Create Blog Model 
#Include title,author,body and id