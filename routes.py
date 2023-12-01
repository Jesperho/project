from flask import Flask
import game

app = Flask(__name__)

@app.get("/id")
def new_id():
    return {"id": game.new_id()}

@app.post("/players/<name>")
def create_player(name: str):
    player_id = game.create_player(name)
    return {
        "id": player_id,
        "name": name
    }

@app.post("/airports/<icao>/coordinates")
def get_airport_coordinates(icao: str):
    coordinates_tuple = game.get_airport_coordinates(icao)
    return {
        "latitude": coordinates_tuple[0],
        "longitude": coordinates_tuple[1] 
    }

