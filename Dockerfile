FROM node:10

RUN apt-get update && apt-get upgrade

RUN apt-get install git

RUN npm i -g terraform-board

EXPOSE 3001
ENV AWS_CRED_DIR "~/.aws"
ENV SSH_CRED_DIR "~/.ssh"
ENV WORK_DIR "./"

CMD ["terraform-board"]
