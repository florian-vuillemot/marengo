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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
