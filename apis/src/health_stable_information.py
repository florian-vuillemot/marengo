from configs import DATA_DIRECTORY
from .generic_data import GenericData

HEALTH_FILE = DATA_DIRECTORY + '/health_stable_information.json'

class HealthStableInformation(GenericData):
    @property
    def filename(self):
        return HEALTH_FILE

    @property
    def format(self):
        return [{
            'key': 'species',
            'name': 'Espèce',
            'description': 'Espèce et type de production',
            'type': 'text'
            },{
            'key': 'place',
            'name': 'Lieu',
            'description': 'Lieu habituel et durée moyenne de détention',
            'type': 'text'
            },{
            'key': 'usual_vet',
            'name': 'Vét traitan',
            'description': 'Nom et coordonnées du vétérinaire traitant',
            'type': 'text'
            },{
            'key': 'health_vet',
            'name': 'Vét sanitaire',
            'description': 'Nom et coordonnées du vétérinaire sanitaire',
            'type': 'text'
            }
        ]
