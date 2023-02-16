FROM node:16

# Create app directory
WORKDIR /
COPY package*.json ./
COPY package-lock.json ./

COPY . .
RUN npm install
CMD [ "npm", "start" ]

EXPOSE 5000