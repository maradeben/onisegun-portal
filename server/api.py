from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from mock_db import Base, MedicalProfessional
from utils import serialize_user
import os

# Set up SQLAlchemy engine and session
db_path = os.path.join(os.path.dirname(__file__), 'users.db')
engine = create_engine(f'sqlite:///{db_path}')
Session = sessionmaker(bind=engine)


def query_all_users():
    """Query all medical professionals from the database."""
    session = Session()
    users = session.query(MedicalProfessional).all()
    result = [serialize_user(user) for user in users]
    session.close()
    return result

def query_user(query):
    """Query a single medical professional by username or id."""
    session = Session()
    user = None
    if query is None or query == '':
        # No argument: return all users
        users = session.query(MedicalProfessional).all()
        result = [serialize_user(u) for u in users]
        session.close()
        return result
    else:
        # Argument present: try id or username
        if str(query).isdigit():
            user = session.query(MedicalProfessional).filter_by(id=int(query)).first()
        else:
            user = session.query(MedicalProfessional).filter_by(username=query).first()
        session.close()
        if user:
            return serialize_user(user)
        else:
            return None

