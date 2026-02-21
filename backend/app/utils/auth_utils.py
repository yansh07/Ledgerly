from jose import JWTError, jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.db import get_db
from app.models import User
from sqlalchemy.orm import Session
import os
import csv
import io
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/google")

secret_key: str = os.getenv("JWT_SECRET", "")
if not secret_key:
    raise ValueError("JWT_SECRET environment variable is not set")
algorithm = "HS256"
access_token_expire_minutes = 60 * 24


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=access_token_expire_minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=algorithm)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        return payload.get("sub")
    except JWTError:
        return None
    
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    email = verify_token(token)
    if email is None:
        raise HTTPException(status_code=401, detail="Invalid Session")
    
    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def generate_csv_report(expenses):
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["Date", "Category", "Amount", "Description"])
    
    for exp in expenses:
        writer.writerow([exp.date, exp.category, exp.amount, exp.description or ""])
    
    output.seek(0)
    return output.getvalue()

def generate_pdf_report(expenses, user_name):
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    # Header
    p.setFont("Helvetica-Bold", 20)
    p.drawString(100, height - 50, f"Ledgerly: Expense Report for {user_name}")
    p.setFont("Helvetica", 12)
    p.drawString(100, height - 70, f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    # Table Header
    y = height - 120
    p.setFont("Helvetica-Bold", 12)
    p.drawString(100, y, "Date")
    p.drawString(200, y, "Category")
    p.drawString(350, y, "Amount (INR)")
    p.line(100, y - 5, 500, y - 5)

    # Content
    y -= 30
    p.setFont("Helvetica", 10)
    total = 0
    for exp in expenses:
        if y < 50: # New page logic
            p.showPage()
            y = height - 50
            p.setFont("Helvetica", 10)
        
        p.drawString(100, y, str(exp.date))
        p.drawString(200, y, exp.category)
        p.drawString(350, y, f"Rs. {exp.amount:,.2f}")
        total += exp.amount
        y -= 20

    # Footer
    p.line(100, y, 500, y)
    y -= 20
    p.setFont("Helvetica-Bold", 12)
    p.drawString(200, y, "TOTAL SPENT:")
    p.drawString(350, y, f"Rs. {total:,.2f}")

    p.showPage()
    p.save()
    buffer.seek(0)
    return buffer