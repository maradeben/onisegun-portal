import jwt
from datetime import datetime, timedelta

SECRET_KEY = 'your-secret-key'  # Change this to a secure value in production

def generate_token(user_id, expires_in=3600):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(seconds=expires_in)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload['user_id']
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None

def serialize_user(user):
    """Serialize a MedicalProfessional object to a dictionary (excluding password)."""
    return {
        "id": user.id,
        "username": user.username,
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email,
        "job_description": user.job_description,
        "hospital": user.hospital,
        "rating": user.rating
    }
