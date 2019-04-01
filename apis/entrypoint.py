from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import src.horse as Horse
import src.movement as Movement

@app.route('/')
def root():
    return 'Marengo'

@app.route('/horses', methods=['GET'])
def horses():
    return jsonify(Horse.horses())

@app.route('/horses/update', methods=['POST'])
def update_horses():
    horses = Horse.clean_horses(request.get_json())
    return jsonify(Horse.update_horses(horses))

@app.route('/movements', methods=['GET'])
def movements():
    return jsonify(Movement.movements())

@app.route('/movements/update', methods=['POST'])
def update_movements():
    movements = Movement.clean_movements(request.get_json())
    return jsonify(Movement.update_movements(movements))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
