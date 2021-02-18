FROM python:3.7
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN python -m pip install -U pip
RUN pip install -r requirements.txt
COPY . /code/
