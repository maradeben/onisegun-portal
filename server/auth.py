from werkzeug.security import generate_password_hash, check_password_hash
from mock_db import Session, MedicalProfessional
from utils import serialize_user

def signup_user(data):
    """Sign up a new user. Returns dict on success, or error message on failure."""
    session = Session()
    if session.query(MedicalProfessional).filter_by(username=data.get('username')).first():
        session.close()
        return {"error": "Username already exists"}
    if session.query(MedicalProfessional).filter_by(email=data.get('email')).first():
        session.close()
        return {"error": "Email already exists"}
    hashed_password = generate_password_hash(data.get('password'))
    user = MedicalProfessional(
        username=data.get('username'),
        firstname=data.get('firstname'),
        lastname=data.get('lastname'),
        email=data.get('email'),
        password=hashed_password,
        job_description=data.get('job_description'),
        hospital=data.get('hospital'),
        rating=data.get('rating', 5)  # Default rating to 5 if not provided
    )
    session.add(user)
    session.commit()
    result = serialize_user(user)
    session.close()
    return result

def login_user(username, password):
    """Authenticate user by username and password. Returns user dict if valid, else None."""
    session = Session()
    user = session.query(MedicalProfessional).filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        result = serialize_user(user)
        session.close()
        return result
    session.close()
    return None
