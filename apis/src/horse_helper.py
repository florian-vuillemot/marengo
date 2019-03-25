import json, os
from configs import DATA_DIRECTORY

HORSES_FILE = DATA_DIRECTORY + '/horses.json'

def ensure_file_exist(fct):
    def wrapper(*args, **kwargs):
        if not os.path.isfile(HORSES_FILE):
            write_in_horses_file({
                'fields': _horse_format(),
                'data': []
            })
        return fct(*args, **kwargs)
    return wrapper


def write_in_horses_file(data):
    with open(HORSES_FILE, 'w') as f:
        f.write(json.dumps(data))


def _horse_format():
    return [{
            'name': 'Nom',
            'description': 'Le nom du cheval',
            'type': 'string'
        },{
            'name': 'N° SIRE',
            'description': 'Le numéro de SIRE du cheval',
            'type': 'string'
        },{
            'name': 'N° Transpondeur',
            'description': 'Le numéro de transpondeur du cheval',
            'type': 'string'
        },{
            'name': 'Propriétaire',
            'description': 'Nom et coordonnées du propriétaire',
            'type': 'string'
        },{
            'name': 'Entrée',
            'description': 'Date de première entré dans le centre',
            'type': 'date'
        },{
            'name': 'Provenance',
            'description': "Adresse de provenance de l'animal",
            'type': 'string'
        },{
            'name': 'Sortie',
            'description': 'Date de sortie définitive du centre',
            'type': 'date'
        },{
            'name': 'Destination',
            'description': "Adresse de destination de l'animal lors de la sortie définitive du centre",
            'type': 'string'
        }
    ]
