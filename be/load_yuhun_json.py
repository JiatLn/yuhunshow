import json


def load_json_file(filename):
    with open(filename, encoding='utf-8') as f:
        json_file = json.load(f)
        return json_file

