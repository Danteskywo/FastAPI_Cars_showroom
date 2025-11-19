from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float
from sqlalchemy import DateTime
from sqlalchemy.sql import func
from fastapi import FastAPI


SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
 
 
class Base(DeclarativeBase): pass
class Auto(Base):
    __tablename__ = "cars"
 
    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String, index=True, nullable=False)
    model = Column(String, index=True, nullable=False)
    year = Column(Integer, nullable=False)
    color = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    milage = Column(Float, default=0.0)
    vin = Column(String, unique=True, index=True)
    arriverd_data = Column(DateTime, default=func.now())
    available = Column(Boolean, default=True)
    created_data = Column(DateTime, default=func.now())

    sales = relationship("Sold", back_populates="car")

class Sold(Base):
    __tablename__ = "SoldCar"

    id = Column(Integer, primary_key=True, index=True)
    car_id = Column(Integer, nullable=False, index=True)
    brand = Column(String, index=True, nullable=False)
    model = Column(String, index=True, nullable=False)
    year = Column(Integer, nullable=False)
    color = Column(String, nullable=False)
    sale_price = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    customer_name = Column(String, nullable=False)
    sale_data = Column(DateTime, default=func.now())
    created_at = Column(DateTime, default=func.now())

SessionLocal = sessionmaker(autoflush=False, bind=engine)