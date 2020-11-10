FROM node:12 as build
WORKDIR /src
COPY package.json ./
COPY tsconfig.json ./
COPY ./src ./src
RUN npm install
RUN npm run build-ts

FROM node:12-alpine
COPY --from=build /src/node_modules /app/node_modules
COPY --from=build /src/dist /app/dist
WORKDIR /app
COPY --from=build /src/package.json ./
ENV MONGO_DB_NAME="cbwaCA2"
ENV MONGO_URI="mongodb+srv://cris:cris@cluster0.pp4u2.mongodb.net/?retryWrites=true&w=majority"
EXPOSE 3000
CMD ["npm", "run", "start-production"]