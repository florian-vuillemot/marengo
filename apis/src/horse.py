from configs import DATA_DIRECTORY
from .generic_data import GenericData

HORSES_FILE = DATA_DIRECTORY + '/horses.json'

class Horse(GenericData):
        @property
        def filename(self):
                return HORSES_FILE

        @property
        def format(self):
                return [{
                        'key': 'name',
                        'name': 'Nom',
                        'description': 'Le nom du cheval',
                        'type': 'text'
                        },{
                        'key': 'sire',
                        'name': 'N° SIRE',
                        'description': 'Le numéro de SIRE du cheval',
                        'type': 'text'
                        },{
                        'key': 'transponder',
                        'name': 'N° Transpondeur',
                        'description': 'Le numéro de transpondeur du cheval',
                        'type': 'text'
                        },{
                        'key': 'owner',
                        'name': 'Propriétaire',
                        'description': 'Nom et coordonnées du propriétaire',
                        'type': 'text'
                        },{
                        'key': 'incoming_at',
                        'name': 'Entrée',
                        'description': 'Date de première entré dans le centre',
                        'type': 'date'
                        },{
                        'key': 'incoming_from',
                        'name': 'Provenance',
                        'description': "Adresse de provenance de l'animal",
                        'type': 'text'
                        },{
                        'key': 'outgoing_at',
                        'name': 'Sortie',
                        'description': 'Date de sortie définitive du centre',
                        'type': 'date'
                        },{
                        'key': 'outgoing_to',
                        'name': 'Destination',
                        'description': "Adresse de destination de l'animal lors de la sortie définitive du centre",
                        'type': 'text'
                        }
                ]
