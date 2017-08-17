FROM ubuntu
MAINTAINER Evans Jahja
RUN apt-get update && \
    apt-get install -y nodejs npm

RUN ls -l

