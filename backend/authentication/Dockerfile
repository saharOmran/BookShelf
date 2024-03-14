FROM python:3.9

WORKDIR /BookShelf

COPY ./requirements.txt /BookShelf/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /BookShelf/requirements.txt

COPY ./app /BookShelf/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
