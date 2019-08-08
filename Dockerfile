FROM node:10

RUN apt-get update -y && apt-get upgrade -y

RUN apt-get install git

RUN npm i -g terraform-board

EXPOSE 3001
ENV AWS_CRED_DIR "~/.aws"
ENV SSH_CRED_DIR "~/.ssh"
ENV TF_STATE_DIR './.tfstate'

VOLUME AWS_CRED_DIR
VOLUME SSH_CRED_DIR
VOLUME TF_STATE_DIR

ENV WORK_DIR "/workdir"
RUN mkdir /workdir
WORKDIR /workdir

CMD ["terraform-board"]
