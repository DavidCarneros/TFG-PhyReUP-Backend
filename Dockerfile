FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install -y build-essential curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs 

RUN npm install -g ts-node typescript