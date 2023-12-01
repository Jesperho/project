from flask import Flask
import game

app = Flask(__name__)

@app.route("/id")
def new_id():
    return {"id": game.new_id()}
