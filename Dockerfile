# THIS IS A WORK IN PROGRESS.

FROM node:10

RUN apt-get update -y && apt-get upgrade -y

RUN apt-get install git

RUN npm i -g terraform-board@0.1.1

ENV AWS_CRED_DIR "~/.aws"
ENV SSH_CRED_DIR "~/.ssh"
ENV TF_STATE_DIR './.tfstate'

VOLUME AWS_CRED_DIR
VOLUME SSH_CRED_DIR
VOLUME TF_STATE_DIR

ENV WORK_DIR "root/workdir"
RUN mkdir root/workdir
WORKDIR root/workdir

# Authorize SSH Host
RUN mkdir -p ~/.ssh && \
    chmod 700 ~/.ssh && \
    ssh-keyscan github.com > ~/.ssh/known_hosts

# Add the keys and set permissions
RUN echo "PLACEHOLDER" > ~/.ssh/id_rsa && \
    echo "PLACEHOLDER" > ~/.ssh/id_rsa.pub && \
    chmod 600 ~/.ssh/id_rsa && \
    chmod 600 ~/.ssh/id_rsa.pub

# Authorize AWS Credentials
RUN mkdir -p ~/.aws && \
    chmod 700 ~/.aws

RUN echo "PLACEHOLDER" > ~/.aws/credentials && \
    chmod 600 ~/.aws/credentials

EXPOSE 3001

# https://serverfault.com/questions/189070/what-firewall-ports-need-to-be-open-to-allow-access-to-external-git-repositories
EXPOSE 22
EXPOSE 9418
EXPOSE 80
EXPOSE 443

CMD ["terraform-board"]
