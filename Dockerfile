FROM node:19.4.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# for production 
# Run npm ci --only=production

COPY . .

ENV PORT=4000
ENV MONGODB_URL=mongodb+srv://sonu:Sonu$NetScape123@exploit.6uqjumq.mongodb.net/?retryWrites=true&w=majority
ENV JWT_EXPIRE=2d
ENV JWT_SECRET=w%k#]G!Xm_a}#(qO+dkSm|>3olfam52-


EXPOSE 4000

CMD [ "NODE", "index.js" ]