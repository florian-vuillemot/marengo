import json, os
from configs import DATA_DIRECTORY

MOVEMENTS_FILE = DATA_DIRECTORY + '/movements.json'

def ensure_file_exist(fct):
    def wrapper(*args, **kwargs):
        if not os.path.isfile(MOVEMENTS_FILE):
            write_in_movements_file({
                'fields': _movement_format(),
                'data': []
            })
        return fct(*args, **kwargs)
    return wrapper


def write_in_movements_file(data):
    with open(MOVEMENTS_FILE, 'w') as f:
        f.write(json.dumps(data))

def _movement_format():
    return [{
            'key': 'outgoing_at',
            'name': 'Sortie',
            'description': 'Date de sortie',
            'type': 'date'
        },{
            'key': 'name',
            'name': 'Nom',
            'description': 'Nom du cheval',
            'type': 'text'
        },{
            'key': 'motif',
            'name': 'Motif',
            'description': 'Le motif de la sortie',
            'type': 'text'
        },{
            'key': 'stop_off',
            'name': 'Etape',
            'description': 'Etape éventuelle (adresse)',
            'type': 'text'
        },{
            'key': 'destination',
            'name': 'Destination',
            'description': 'Lieu de la destination (adresse)',
            'type': 'date'
        },{
            'key': 'come_back_at',
            'name': 'Retour',
            'description': 'Date ce retour',
            'type': 'date'
        }
    ]
