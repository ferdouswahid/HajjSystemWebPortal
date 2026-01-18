# FROM amazoncorretto:23.0.1-alpine3.20
# FROM alpine:3.20
FROM ubuntu:24.10

LABEL maintainer=""

RUN apt update && apt upgrade -y
RUN apt install curl zip unzip -y

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v18.18.2
RUN mkdir -p /usr/local/nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh  | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH

EXPOSE 4200
EXPOSE 4215
EXPOSE 4217

# SHELL ["/bin/bash", "--login" , "-c"]
# RUN source ~/.bashrc
# RUN nvm install 18.20.4
# SHELL ["/bin/sh", "-c"]

# echo 'export PATH=/usr/local/bin:$PATH' >> ~/.profile
# source ~/.profile
# RUN source ~/.nvm/nvm.sh

RUN mkdir -p /home/ubuntu/software_project

WORKDIR /home/ubuntu/software_project/

# COPY . .

# RUN npm install --force

RUN npm install -g @angular/cli@17.3.6

# RUN nvm ls-remote

CMD [ "bash" ]

# sudo docker build -t hajjsystem/custom_ubuntu24_node18_angular17:0.0.1 .
# sudo docker image rm  hajjsystem/custom_ubuntu24_node18_angular17:0.0.1

# sudo docker run -it --rm --name c201 -p 7890:7890 hajjsystem/custom_ubuntu24_node18_angular17:0.0.1 bash


