import json
from typing import List, Dict, Union

from .movement_helper import ensure_file_exist, write_in_movements_file, MOVEMENTS_FILE

# Dict clean and ready for use as Movement
Movement = Dict

@ensure_file_exist
def movements() -> Dict[str, List[Union[Dict, Movement]]]:
    with open(MOVEMENTS_FILE) as f:
        return json.loads(f.read())

def update_movements(new_movements: List[Movement]) -> Dict[str, List[Union[Dict, Movement]]]:
    mvs = movements()
    mvs['data'] = new_movements
    write_in_movements_file(mvs)
    return mvs

def clean_movement(movement: Dict) -> Union[Movement, None]:
    return {
        'outgoing_at': movement.get('outgoing_at'),
        'name': movement.get('name'),
        'motif': movement.get('motif'),
        'stop_off': movement.get('stop_off'),
        'destination': movement.get('destination'),
        'come_back_at': movement.get('come_back_at')
    }

def clean_movements(movements: List[Movement]) -> Union[Movement, None]:
    return list(map(clean_movement, movements))