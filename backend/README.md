# Backend

The backend API for the B2B SaaS application.

## Tech Stack

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Language**: Python 3.12
- **Database ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database**: PostgreSQL
- **Dependency Management**: [uv](https://github.com/astral-sh/uv)

## Setup

### Local Development

1. **Install `uv`**:
   Follow instructions at [docs.astral.sh/uv](https://docs.astral.sh/uv/getting-started/installation/).

2. **Install dependencies**:
   ```bash
   uv sync
   ```

3. **Run the server**:
   ```bash
   uv run uvicorn app.main:app --reload
   ```

### Docker

This project provides a Docker setup for running the application in an isolated environment.

**Build and start:**
```bash
docker compose up --build
```
This will start the API on port `8000`.

**Environment Variables**:
Create a `.env` file in the project root if required. The `docker-compose.yml` expects it for configuration.
