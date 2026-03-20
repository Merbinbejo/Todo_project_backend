# database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# create engine
engine = create_engine(DATABASE_URL, connect_args={"sslmode": "require"})

# session class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# base class for models
Base = declarative_base()
