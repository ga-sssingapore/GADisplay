FROM python:3.11-slim-buster

COPY requirements.txt /

RUN pip install -r requirements.txt

COPY . /backend

WORKDIR /backend

EXPOSE 3000

ENTRYPOINT ["gunicorn", "--config", "gunicorn.py", "server:app"]