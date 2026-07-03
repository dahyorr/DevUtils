from flask import Flask, jsonify, make_response, request
from utils.checksum_generator import generate_checksum_bucket, ALLOWED_HASHES
from marshmallow import Schema, fields, validate, ValidationError

app = Flask(__name__)

class HashSchema(Schema):
    hash_type = fields.String(required=True, validate=validate.OneOf(ALLOWED_HASHES))
    file_path = fields.String(required=True)

@app.route("/")
def health():
    return jsonify(message='ok')


@app.route("/hash", methods=['POST'])
def hash():
    schema = HashSchema()
    request_data = request.json
    try:
        # Validate request body against schema data types
        body = schema.load(request_data)
    except ValidationError as err:
        # Return a nice message if validation fails
        return jsonify(err.messages), 400
    file_path = body.get("file_path")
    hash_type = body.get("hash_type")
    if(not file_path or not hash_type ):
        return make_response(jsonify(error='Invalid Params!'), 400)
    hash = generate_checksum_bucket(file_path, hash_type)
    hash_data = {
        "hashType": hash_type,
        "hash": hash,
        "status": 'Completed'
    }
    return jsonify(hash_data)


@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
