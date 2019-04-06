from configs import DATA_DIRECTORY
from .generic_data import GenericData

MOVEMENTS_FILE = DATA_DIRECTORY + '/movements.json'

class Movement(GenericData):
        @property
        def filename(self):
                return MOVEMENTS_FILE

        @property
        def format(self):
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
                        'type': 'text'
                        },{
                        'key': 'come_back_at',
                        'name': 'Retour',
                        'description': 'Date ce retour',
                        'type': 'date'
                        },{
                        'key': 'images',
                        'hidden': True
                        }
                ]
