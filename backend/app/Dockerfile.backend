FROM python:3.11-slim

WORKDIR /usr/app/backend

COPY . /usr/app/backend

RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]