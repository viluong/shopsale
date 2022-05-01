FROM python:3.7
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /usr/app/backend
COPY requirements.txt /usr/app/backend/
RUN python -m pip install -U pip
RUN pip install -r requirements.txt

COPY . /usr/app/backend/

#RUN python manage.py migrate

