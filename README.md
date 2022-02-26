# Software Architecture Project

API Gateway demo for Software Architecture Project -course (spring 2022) in University of Helsinki.

A backend for simple desktop booking app. The idea is to demonstrate [API Gateway pattern](https://microservices.io/patterns/apigateway.html) when dealing with microservices.

## System overview

- Three microservices providing REST APIs.
- [Apollo Federation](https://www.apollographql.com/docs/federation/) architecture used for connecting microservices to an Apollo gateway providing GraphQL API for clients.
- Three subgraphs, one for each microservice. Subgraphs utilize [node-fetch](https://www.npmjs.com/package/node-fetch) to fetch data from REST APIs.
- [Apollo Rover](https://www.apollographql.com/docs/rover/) used to compose supergraph.

## Instructions to run backend

You might have to install required packages:
`npm install express mongoose mongoose-unique-validator apollo-server @apollo-subgraph @apollo-gateway node-fetch`

Navigate to backend folder and run all services with script:
`cd backend && npm run server`