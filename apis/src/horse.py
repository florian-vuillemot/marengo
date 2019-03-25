import json
from typing import List, Dict, Union

from .horse_helper import ensure_file_exist, write_in_horses_file, HORSES_FILE

# Dict clean and ready for use as Horse
Horse = Dict

@ensure_file_exist
def horses() -> Dict[str, List[Union[Dict, Horse]]]:
    with open(HORSES_FILE) as f:
        return json.loads(f.read())

def add_horse(horse: Horse) -> Dict[str, List[Union[Dict, Horse]]]:
    hs = horses()
    hs['data'].append(horse)
    write_in_horses_file(hs)
    return hs

def clean_horse(horse: Dict) -> Union[Horse, None]:
    return {
        'name': horse['name'],
        'sire': horse['sire'],
        'transponder': horse['transponder'],
        'owner': horse['owner'],
        'entry_date': horse['entry_date'],
        'incoming_from': horse['incoming_from'],
        'outgoing_date': horse['outgoing_date'],
        'outgoing_to': horse['outgoing_to']
    }
