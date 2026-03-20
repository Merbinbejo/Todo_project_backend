from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine


data_url = "postgresql://postgres:Prabhudhas%401@localhost:5432/Product"
engine=create_engine(data_url)
session=sessionmaker(autoflush=False,autocommit=False,bind=engine)