from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os
from app.db import get_db
from app.models import User
from app.utils.auth_utils import create_access_token
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

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