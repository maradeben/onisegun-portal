from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker, declarative_base
from werkzeug.security import generate_password_hash
import csv
import os

Base = declarative_base()

class MedicalProfessional(Base):
    __tablename__ = 'medical_professionals'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    firstname = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)  # hashed password
    job_description = Column(String, nullable=False)
    hospital = Column(String, nullable=False)
    rating = Column(Float, nullable=False)

db_path = os.path.join(os.path.dirname(__file__), 'users.db')
engine = create_engine(f'sqlite:///{db_path}')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

# Read from CSV and insert into DB
csv_path = os.path.join(os.path.dirname(__file__), 'medical_professionals.csv')
with open(csv_path, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        # Check if already exists by username or email
        exists = session.query(MedicalProfessional).filter(
            (MedicalProfessional.username == row['username']) |
            (MedicalProfessional.email == row['email'])
        ).first()
        if not exists:
            prof = MedicalProfessional(
                username=row['username'],
                firstname=row['firstname'],
                lastname=row['lastname'],
                email=row['email'],
                password=generate_password_hash(f"{row['username']}_123"),  # Store raw password for now, should be hashed in production
                job_description=row['job_description'],
                hospital=row['hospital'],
                rating=float(row['rating'])
            )
            session.add(prof)
    session.commit()
session.close()
