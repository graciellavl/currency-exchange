FROM node:15.13-alpine 
WORKDIR '/currency-exchange'

COPY package.json .
RUN npm install

COPY . .
CMD ["npm", "start"]