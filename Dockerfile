FROM node:10

RUN npm i -g terraboard

EXPOSE 3001

CMD ["terraboard"]
