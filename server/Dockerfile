FROM node:21.2.0 AS server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY dist/ .
EXPOSE 5000
CMD ["npm", "start"]