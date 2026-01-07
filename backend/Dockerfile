# syntax=docker/dockerfile:1

# Base image for runtime
FROM dhi.io/python:3.12-alpine3.23 AS base

# Builder stage: install uv, create venv, install dependencies
FROM dhi.io/python:3.12-alpine3.23-dev AS builder

# Install system dependencies for building wheels (psycopg2-binary, etc.)
RUN apk add --no-cache \
  build-base \
  libpq

WORKDIR /app

# Install uv (prebuilt binary)
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Copy dependency files only for cache efficiency
COPY --link pyproject.toml ./
COPY --link uv.lock ./

# Create venv and install dependencies using uv
RUN --mount=type=cache,target=/root/.cache/uv \
  uv sync --frozen --no-install-project

# Copy application code (excluding .env, .git, .venv, IDE, etc.)
COPY --link app/ ./app/
COPY --link start.py ./

# Final stage: minimal image, non-root user
FROM dhi.io/python:3.12-alpine3.23 AS final

WORKDIR /app

# Copy venv and app code from builder
COPY --from=builder /app/.venv /app/.venv
COPY --from=builder /app/app /app/app
COPY --from=builder /app/start.py /app/start.py

ENV PATH="/app/.venv/bin:$PATH" \
  PYTHONDONTWRITEBYTECODE=1 \
  PYTHONUNBUFFERED=1

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]