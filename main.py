from fastapi import FastAPI,Depends,HTTPException
from model import Products
from database import session
import database_model
from database import engine
from sqlalchemy.orm import Session
from database_model import Product
from fastapi.middleware.cors import CORSMiddleware
from schema import ProductCreate


app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=["*"]
)
products = [
    Products(id=1, name="Iphone", description="16GB RAM 256GB ROM", price=25000, quantity=5),
    Products(id=2, name="Samsung Galaxy", description="12GB RAM 128GB ROM", price=22000, quantity=8),
    Products(id=3, name="OnePlus", description="8GB RAM 256GB ROM", price=20000, quantity=10),
    Products(id=4, name="Redmi Note", description="6GB RAM 128GB ROM", price=15000, quantity=15),
    Products(id=5, name="Realme", description="8GB RAM 128GB ROM", price=18000, quantity=12)
]
database_model.Base.metadata.create_all(bind=engine)


def init_db():
    db=session()

    count=db.query(database_model.Product).count()
    if count==0:
        for product in products:
            db.add(database_model.Product(**product.model_dump()))
        db.commit()

init_db()

def get_db():
    db=session()
    try:
        yield db
    finally:
        db.close()

@app.get("/products")
def get_all_products(db:Session=Depends(get_db)):
    db_products=db.query(database_model.Product).all()
    return db_products


@app.get("/products/{id}")
def get_products(id:int,db:Session=Depends(get_db)):
    db_products=db.query(database_model.Product).filter(database_model.Product.id==id).first()
    if db_products:
        return db_products
    else:
        raise HTTPException(status_code=404, detail="Product ID not found")
@app.post("/products")
def add_products(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(
        name=product.name,
        description=product.description,
        price=product.price,
        quantity=product.quantity
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    print("Saved to DB:", db_product.id)

    return db_product

@app.put('/products/{id}')
def Update_products(id:int,product:Products,db:Session=Depends(get_db)):
    db_products=db.query(database_model.Product).filter(database_model.Product.id==id).first()
    if not db_products:
        raise(HTTPException(status_code=404, detail="Product not found"))
    else:
        db_products.name=product.name
        db_products.description=product.description
        db_products.price=product.price
        db_products.quantity=product.quantity

    db.commit()
    db.refresh(db_products)
    return "Updated Successfully"

@app.delete("/delete/{id}")
def delete_products(id:int,db:Session=Depends(get_db)):
    db_products=db.query(database_model.Product).filter(database_model.Product.id==id).first()
    if not db_products:
        raise(HTTPException(status_code=404,detail='Product not Found'))
    db.delete(db_products)
    db.commit()
    return{'message':'Product Deleted Successfully'}




