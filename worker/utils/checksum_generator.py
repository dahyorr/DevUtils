import hashlib
from utils.s3_client import stream_file

ALLOWED_HASHES= ['md5', 'sha256', 'sha512', 'sha224']

def generate_checksum_bucket(file_path, hash_function):
    """Generate checksum for file baed on hash function (MD5 or SHA256)"""
    hash_function = hash_function.lower()
    bytes = stream_file(file_path)
    if not(bytes):
        raise('Invalid File')
    if hash_function == 'md5':
        readable_hash = hashlib.md5(bytes).hexdigest()
    elif hash_function == "sha256":
        readable_hash = hashlib.sha256(bytes).hexdigest()
    elif hash_function == "sha512":
        readable_hash = hashlib.sha512(bytes).hexdigest()
    elif hash_function == "sha224":
        readable_hash = hashlib.sha224(bytes).hexdigest()
    else:
        raise(f"{hash_function} is an invalid hash function")
    return readable_hash
