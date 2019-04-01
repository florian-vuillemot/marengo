from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from src.horse import Horse
from src.movement import Movement

@app.route('/')
def root():
    return 'Marengo'

@app.route('/horses', methods=['GET'])
def horses():
    return jsonify(Horse().get_all())

@app.route('/horses/update', methods=['POST'])
def update_horses():
    h = Horse()
    horses = h.cleans(request.get_json())
    return jsonify(h.update_all(list(horses)))

@app.route('/movements', methods=['GET'])
def movements():
    return jsonify(Movement().get_all())

@app.route('/movements/update', methods=['POST'])
def update_movements():
    mvt = Movement()
    movements = mvt.cleans(request.get_json())
    return jsonify(mvt.update_all(list(movements)))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
