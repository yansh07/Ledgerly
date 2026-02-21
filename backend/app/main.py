from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os
from datetime import date
from app.db import get_db
from app.models import User, Expense
from app.utils.auth_utils import create_access_token, generate_csv_report, generate_pdf_report, get_current_user
from fastapi.responses import StreamingResponse
import io
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

@app.post("/auth/google")
async def google_auth(payload: dict, db: Session = Depends(get_db)):
    token = payload.get("token")
    if not token:
        raise HTTPException(status_code=400, detail="Token Missing!")
    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            google_requests.Request(),
            GOOGLE_CLIENT_ID
        )
        email = idinfo['email']
        name = idinfo.get('name')
        profile_pic = idinfo.get('picture')
        google_id = idinfo['sub']

        user = db.query(User).filter(User.email == email).first()

        if not user:
            user = User(
                email=email,
                name=name,
                profile_pic=profile_pic,
                google_id=google_id
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        
        access_token = create_access_token(data={"sub": user.email})

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user" : {
                "name": user.name,
                "email": user.email,
                "profile_pic": user.profile_pic
            }
        }
    
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid google token"
        )
    
class ExpenseSchema(BaseModel):
    category: str
    amount: float
    date: date

@app.post("/expense")
async def add_expense(
    data: ExpenseSchema,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    new_exp = Expense(
        user_id=user.id,
        category=data.category,
        amount=data.amount,
        date=data.date,
    )
    db.add(new_exp)
    db.commit()
    return {"status": "success", "data": new_exp}

@app.get("/expense")
async def get_expense(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    expenses = db.query(Expense).filter(Expense.user_id == user.id).all()
    return expenses

@app.get("/report/download")
async def download_report(
    format: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    expenses = db.query(Expense).filter(Expense.user_id == user.id).all()

    if format == "csv":
        csv_data = generate_csv_report(expenses)
        return StreamingResponse(
            io.StringIO(csv_data),
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename=ledgerly_report.csv"}
        )
    
    elif format == "pdf":
        pdf_data = generate_pdf_report(expenses, user.name)
        return StreamingResponse(
            pdf_data,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=ledgerly_report.pdf"}
        )
    
    else:
        raise HTTPException(status_code=400, detail="Invalid format specified")