FROM ubuntu
MAINTAINER Evans Jahja
RUN apt-get update && \
    apt-get install -y nodejs npm

WORKDIR /app

ADD . /app

RUN npm install

ENTRYPOINT ["npm", "test"]
