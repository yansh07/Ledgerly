# Ledgerly

**Ledgerly** is a modern, full-stack expense tracker application designed to help you manage your finances with ease. It features a sleek, intuitive user interface and a robust backend to provide a seamless user experience.

## Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool that provides a quicker and leaner development experience for modern web projects.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Router**: For declarative routing in your React application.

### Backend

- **FastAPI**: A modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **SQLAlchemy**: The Python SQL Toolkit and Object Relational Mapper.
- **Alembic**: A lightweight database migration tool for usage with the SQLAlchemy Database Toolkit for Python.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Python-jose**: A JavaScript Object Signing and Encryption (JOSE) implementation in Python.

## Features

- User authentication (signup and login).
- A dashboard to view and manage expenses.
- Add, edit, and delete expenses.
- Profile page for user information.
- Responsive design for use on various devices.

## Getting Started

### Prerequisites

- Python 3.7+
- Node.js and npm
- PostgreSQL

### Installation

**Backend:**

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/ledgerly.git
    cd ledgerly/backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```
3.  Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Set up your `.env` file with your database credentials.
5.  Run database migrations:
    ```bash
    alembic upgrade head
    ```
6.  Start the server:
    ```bash
    uvicorn app.main:app --reload
    ```

**Frontend:**

1.  Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
