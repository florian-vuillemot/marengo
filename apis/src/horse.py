import json
from typing import List, Dict, Union

from .horse_helper import ensure_file_exist, write_in_horses_file, HORSES_FILE

# Dict clean and ready for use as Horse
Horse = Dict

@ensure_file_exist
def horses() -> Dict[str, List[Union[Dict, Horse]]]:
    with open(HORSES_FILE) as f:
        return json.loads(f.read())

def update_horses(new_horses: List[Horse]) -> Dict[str, List[Union[Dict, Horse]]]:
    hs = horses()
    hs['data'] = new_horses
    write_in_horses_file(hs)
    return hs

def clean_horse(horse: Dict) -> Union[Horse, None]:
    return {
        'name': horse.get('name'),
        'sire': horse.get('sire'),
        'transponder': horse.get('transponder'),
        'owner': horse.get('owner'),
        'incoming_at': horse.get('incoming_at'),
        'incoming_from': horse.get('incoming_from'),
        'outgoing_at': horse.get('outgoing_at'),
        'outgoing_to': horse.get('outgoing_to')
    }

def clean_horses(horses: List[Dict]) -> Union[Horse, None]:
    return list(map(clean_horse, horses))