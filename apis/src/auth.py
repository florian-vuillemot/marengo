import hashlib
from configs import PASSWORD_FILE

def is_user(username: str, password: str) -> bool:
    _username, _password = _read_password_file()
    if username == _username:
        password_encrypt = _crypt(password)
        return password_encrypt == _password
    return False

def _crypt(password):
    return hashlib.sha512(password.encode('utf-8')).hexdigest()

def _read_password_file():
    with open(PASSWORD_FILE, 'r') as f:
        return f.read().replace('\n', '').split('=')
