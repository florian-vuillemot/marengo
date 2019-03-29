from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import src.horse as Horse

@app.route('/')
def root():
    return 'Hello world'

@app.route('/horses', methods=['GET'])
def horses():
    return jsonify(Horse.horses())

@app.route('/horse', methods=['POST'])
def horse():
    horse = Horse.clean_horse(request.get_json())
    return jsonify(Horse.add_horse(horse))

@app.route('/horses/update', methods=['POST'])
def update_horses():
    print(request)
    print(request.get_json())
    horses = Horse.clean_horses(request.get_json())
    return jsonify(Horse.update_horses(horses))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
