from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_horse():
    from src.horse import Horse
    return Horse()
def get_movement():
    from src.movement import Movement
    return Movement()
def get_healthcare():
    from src.heathcare import Healthcare
    return Healthcare()

routes = {
    'horses': get_horse,
    'movements': get_movement,
    'healthcares': get_healthcare,
}


@app.route('/')
def root():
    return 'Marengo'


@app.route('/<obj>', methods=['GET'])
def get_all(obj):
    return jsonify(routes[obj]().get_all())


@app.route('/<obj>/update', methods=['POST'])
def update_all(obj):
    g_obj = routes[obj]()
    data = list(g_obj.cleans(request.get_json()))
    return jsonify(g_obj.update_all(data))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
