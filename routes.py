from flask import Flask, jsonify, render_template
from flask_cors import CORS
import game

app = Flask(__name__)
CORS(app)


@app.get("/menu")
def menu_page():
    return render_template("menu.html")


@app.get("/demo_anim")
def demo_anim_page():
    return render_template("demo_anim.html")


@app.get("/")
def home_page():
    return render_template("home.html")


# This endpoint is useless
@app.post("/players/<name>")
def create_player(name: str):
    player_id = game.create_player(name)
    return {"id": player_id, "name": name}


# Useless
@app.get("/players/<id>")
def get_player(id):
    player = {
        "id": id,
        "name": game.get_player_name(id),
        "current_location": game.get_player_location(id),
        "next_location": game.get_players_next_location(id),
        "co2_budget": game.get_co2_budget(id),
    }
    return player


# Useless
@app.put("/players/<id>/<int:co2_to_add>")
def add_to_co2_budget(id, co2_to_add: int):
    game.add_to_co2_budget(id, co2_to_add)
    return "OK"


@app.get("/airports/<string:icao>")
def get_airport(icao):
    # Arranging necessary airport info into json format
    coordinates_tuple = game.get_airport_coordinates(icao)
    airport = {
        "icao": icao,
        "name": game.get_airport_name(icao),
        "country": game.get_airport_country_name(icao),
        "iso": game.get_airport_iso(icao),
        "latitude": coordinates_tuple[0],
        "longitude": coordinates_tuple[1],
    }
    return airport


@app.get("/airports/<string:icao>/iso")
def get_airport_iso(icao):
    return game.get_airport_iso(icao)


@app.get("/airports/<int:amount>/<string:continent>")
def get_airports(amount, continent):
    # List that stores airports icaos which we need to store game map on the server
    # Because the players are created in starting location which is easily found this way
    airports_icaos = []

    def get_random_airport_icao():
        # This function returns a unique airport which is not yet present in game map
        random_airport_icao = game.get_large_airport_icao_by_continent(continent)
        if random_airport_icao in airports_icaos:
            return get_random_airport_icao()

        airports_icaos.append(random_airport_icao)
        return random_airport_icao

    # This list stores airports which are in json/dict format already
    airports_jsons = []

    # Here we use get_airport function from above to fill the list of jsoned random airports
    for i in range(amount):
        airports_jsons.append(get_airport(get_random_airport_icao()))

    # updating the game map on the server before sending it to the client
    game.game_map_global = airports_icaos

    # return airports to the client/api consumer
    return airports_jsons


if __name__ == "__main__":
    app.run(debug=True)
