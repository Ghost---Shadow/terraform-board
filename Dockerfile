FROM node:10

RUN npm i -g terraboard

EXPOSE 3001
ENV AWS_CRED_DIR "~/.aws"
ENV SSH_CRED_DIR "~/.ssh"

CMD ["terraboard"]
