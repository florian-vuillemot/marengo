from flask import Flask, jsonify, request, redirect, send_from_directory
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

UPLOAD_FOLDER = '/marengo/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/image', methods=['POST'])
def add_image():
    import os
    from werkzeug.utils import secure_filename
    
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        return jsonify({}), 200
    return jsonify({}), 200

@app.route('/image/<filename>', methods=['GET'])
def get_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
