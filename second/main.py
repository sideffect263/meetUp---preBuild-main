from fastapi import FastAPI, HTTPException, Depends, status, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
import sqlite3

app = FastAPI()

# For password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme for password
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Database connection for users
conn_users = sqlite3.connect('users.db')
c_users = conn_users.cursor()
c_users.execute('''CREATE TABLE IF NOT EXISTS users
             (id INTEGER PRIMARY KEY, username TEXT, password TEXT)''')
conn_users.commit()

# Database connection for events
conn_events = sqlite3.connect('events.db')
c_events = conn_events.cursor()
c_events.execute('''CREATE TABLE IF NOT EXISTS events
             (id INTEGER PRIMARY KEY, title TEXT, description TEXT, date TEXT, user_id INTEGER, lata TEXT, longa TEXT)''')
conn_events.commit()

# Helper functions
def get_user(username: str):
    c_users.execute('SELECT * FROM users WHERE username=?', (username,))
    user_data = c_users.fetchone()
    if user_data:
        return user_data

def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user[2]):
        return False
    return user

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    return data

# Routes
@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token({"sub": user[1]})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/register")
async def register(form_data: OAuth2PasswordRequestForm = Depends()):
    hashed_password = pwd_context.hash(form_data.password)
    c_users.execute("INSERT INTO users (username, password) VALUES (?, ?)", (form_data.username, hashed_password))
    conn_users.commit()
    return {"message": "User created successfully"}

@app.get("/protected")
async def protected_route(token: str = Depends(oauth2_scheme)):
    # Here, you would do something to authorize the token
    return {"message": "This is a protected route"}

@app.get("/events")
async def get_events():
    c_events.execute('SELECT * FROM events')
    events_data = c_events.fetchall()
    return events_data

@app.post("/events")
async def create_event(title: str = Form(...), description: str = Form(...), date: str = Form(...), user_id: int = Form(...), lata: str = Form(...), longa: str = Form(...)):
    c_events.execute("INSERT INTO events (title, description, date, user_id, lata, longa) VALUES (?, ?, ?, ?, ?, ?)", (title, description, date, user_id, lata, longa))
    conn_events.commit()
    return {"message": "Event created successfully"}

@app.get("/events/{event_id}")
async def get_event(event_id: int):
    c_events.execute('SELECT * FROM events WHERE id=?', (event_id,))
    event_data = c_events.fetchone()
    return event_data

@app.put("/events/{event_id}")
async def update_event(event_id: int, title: str = Form(...), description: str = Form(...), date: str = Form(...), user_id: int = Form(...), lata: str = Form(...), longa: str = Form(...)):
    c_events.execute("UPDATE events SET title=?, description=?, date=?, user_id=?, lata=?, longa=? WHERE id=?", (title, description, date, user_id, lata, longa, event_id))
    conn_events.commit()
    return {"message": "Event updated successfully"}

@app.delete("/events/{event_id}")
async def delete_event(event_id: int):
    c_events.execute("DELETE FROM events WHERE id=?", (event_id,))
    conn_events.commit()
    return {"message": "Event deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
