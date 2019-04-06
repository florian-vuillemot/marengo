from flask import Flask, jsonify, request, redirect
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


@app.route('/<obj>', methods=['GET'])
def get_all(obj):
    return jsonify(routes[obj]().get_all())


@app.route('/<obj>/update', methods=['POST'])
def update_all(obj):
    g_obj = routes[obj]()
    data = list(g_obj.cleans(request.get_json()))
    return jsonify(g_obj.update_all(data))


@app.route('/image/<filename>', methods=['POST'])
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
def get_image(filename):
    from flask import send_from_directory
    from configs import IMAGE_DIRECTORY
    return send_from_directory(IMAGE_DIRECTORY, filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
