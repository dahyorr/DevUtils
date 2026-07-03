import os

def validate_file(path, file_name):
    """
    Checks if file exists at requested path
    returns file path if file is valid 
    """
    file_path = os.path.join(path, file_name)
    if(os.path.isfile(file_path)):
        return (file_path)
    else: 
        return False
