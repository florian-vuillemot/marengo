from configs import DATA_DIRECTORY
from .generic_data import GenericData

HEALTHCARE_FILE = DATA_DIRECTORY + '/healthcare.json'

class Healthcare(GenericData):
        @property
        def filename(self):
                return HEALTHCARE_FILE

        @property
        def format(self):
                return [{
                        'key': 'date',
                        'name': 'Date',
                        'description': "Date de l'intervention",
                        'type': 'date'
                        },{
                        'key': 'name',
                        'name': 'Nom',
                        'description': 'Le nom du cheval',
                        'type': 'text'
                        },{
                        'key': 'type',
                        'name': 'Type',
                        'description': "Type d'intervention",
                        'type': 'text'
                        },{
                        'key': 'doctor',
                        'name': 'Intervenant',
                        'description': 'Titre de la personne intervenant',
                        'type': 'text'
                        },{
                        'key': 'medicament',
                        'name': 'Médicament',
                        'description': 'Nom du médicament',
                        'type': 'text'
                        },{
                        'key': 'administration',
                        'name': "Voie d'administration",
                        'description': "Voie d'administration (facultatif si ordonnance)",
                        'type': 'text'
                        },{
                        'key': 'beginning',
                        'name': 'Date de début',
                        'description': 'Date de début du traitement',
                        'type': 'date'
                        },{
                        'key': 'end',
                        'name': 'Date de fin',
                        'description': 'Date de fin du traitement',
                        'type': 'date'
                        },{
                        'key': 'prescription',
                        'name': 'Ordonnance',
                        'description': "N° d'ordonnance",
                        'type': 'text'
                        },{
                        'key': 'competition',
                        'name': 'Attente compétition',
                        'description': 'Délai attente compétition',
                        'type': 'text'
                        },{
                        'key': 'slaugther',
                        'name': 'Attente abattage',
                        'description': 'Délai attente avant abattage ou exclusion abattage',
                        'type': 'text'
                        }
                ]
