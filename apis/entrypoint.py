import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

app = Flask(__name__)
CORS(app)
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'query_string']
app.config['JWT_SECRET_KEY'] = os.environ['JWT_SECRET_KEY']
jwt = JWTManager(app)

def get_horse():
    from src.horse import Horse
    return Horse()
def get_movement():
    from src.movement import Movement
    return Movement()
def get_healthcare():
    from src.healthcare import Healthcare
    return Healthcare()
def get_owner_information():
    from src.owner_information import OwnerInformation
    return OwnerInformation()

routes = {
    'horses': get_horse,
    'movements': get_movement,
    'healthcares': get_healthcare,
    'owner_information': get_owner_information,
}


@app.route('/')
def root():
    return 'Marengo'

@app.route('/user/login', methods=['POST'])
def login():
    from src.auth import is_user
    user_data = request.get_json()
    if not user_data:
        return jsonify({}), 400
    username = user_data.get('username', None)
    password = user_data.get('password', None)
    if not is_user(username, password):
        return jsonify({}), 400

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

@app.route('/<obj>', methods=['GET'])
@jwt_required
def get_all(obj):
    return jsonify(routes[obj]().get_all())


@app.route('/<obj>/update', methods=['POST'])
@jwt_required
def update_all(obj):
    g_obj = routes[obj]()
    data = list(g_obj.cleans(request.get_json()))
    return jsonify(g_obj.update_all(data))


@app.route('/image/<filename>', methods=['POST'])
@jwt_required
def add_image(filename):
    import os
    from werkzeug.utils import secure_filename
    from configs import ALLOWED_EXTENSIONS, IMAGE_DIRECTORY

    def allowed_file(f):
        return '.' in f and f.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(filename)
        file.save(os.path.join(IMAGE_DIRECTORY, filename))
    return jsonify({}), 200


@app.route('/image/<filename>', methods=['GET'])
@jwt_required
def get_image(filename):
    from flask import send_from_directory
    from configs import IMAGE_DIRECTORY
    return send_from_directory(IMAGE_DIRECTORY, filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
