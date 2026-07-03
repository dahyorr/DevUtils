import os
import boto3
from botocore.errorfactory import ClientError


client = boto3.client('s3')
S3_BUCKET = os.environ.get('S3_BUCKET')

def stream_file(file_path:str):
    return client.get_object(Bucket=S3_BUCKET, Key=file_path)['Body'].read()


def validate_file(file_path):
    try:
        client.head_object(S3_BUCKET, file_path)
        return True
    except ClientError as e:
        if e.response['Error']['Code'] == "404":
            return False
        else:
            # Something else has gone wrong.
            raise("s3-client: Unknown error")