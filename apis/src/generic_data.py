import json, os

DATA = 'data'
FIELDS = 'fields'

class GenericData:
    @property
    def filename(self):
        raise 'Not implemented'

    @property
    def format(self):
        raise 'Not implemented'

    @property
    def keys(self):
        return map(lambda f: f['key'], self.format)

    def get_all(self):
        _ensure_file_exist(self.filename, self.format)
        data = read_json_file(self.filename)
        data[FIELDS] = self.format
        return data

    def update_all(self, elements):
        els = self.get_all()
        els[DATA] = elements
        els[FIELDS] = self.format
        save_json_in_file(self.filename, els)
        return els

    def cleans(self, elements):
        _keys = list(self.keys)
        return map(lambda data: _clean(_keys, data), elements)


def read_json_file(filename):
    with open(filename) as f:
        return json.loads(f.read())


def save_json_in_file(filename, data):
    with open(filename, 'w') as f:
        f.write(json.dumps(data))


def _clean(keys, elements):
    return {k: elements.get(k) for k in keys}


def _ensure_file_exist(filename, fields_format):
    if not os.path.isfile(filename):
        save_json_in_file(filename, {
            FIELDS: fields_format,
            DATA: []
        })