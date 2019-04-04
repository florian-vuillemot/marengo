from configs import DATA_DIRECTORY
from .generic_data import GenericData

OWNER_INFORMATION_FILE = DATA_DIRECTORY + '/owner_information.json'

class OwnerInformation(GenericData):
        @property
        def filename(self):
                return OWNER_INFORMATION_FILE

        @property
        def format(self):
            return [{
                'key': 'status',
                'name': 'Status',
                'description': 'Status du profesionnel',
                'type': 'select',
                'values': ['Personne physique', 'Personne morale']
            },{
                'key': 'siret',
                'name': 'SIRET',
                'description': 'N° SIRET',
                'type': 'text'
            },{
                'key': 'ape',
                'name': 'APE',
                'description': 'Code APE',
                'type': 'text'
            },{
                'key': 'legal_status',
                'name': 'Status juridique',
                'description': '',
                'type': 'text'
            },{
                'key': 'naming',
                'name': 'Dénomination',
                'description': 'Dénomination',
                'type': 'text'
            },{
                'key': 'address',
                'name': 'Adresse',
                'description': 'Adresse du détenteur',
                'type': 'text'
            },{
                'key': 'tel',
                'name': 'Tel',
                'description': 'Tel du détenteur',
                'type': 'tel'
            },{
                'key': 'email',
                'name': 'Mail',
                'description': 'Mail du détenteur',
                'type': 'email'
            }]