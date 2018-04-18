# Denham Train Times

This project provides a complete solution for checking commuter trains from Denham to London Marylebone.

It uses the Realtime Trains API to get National Rail data. The frontend app is built using Vue.js, Bootstrap and Fontawesome. Due to CORS restrictions, the app uses a proxy to connect to the RTT API. The proxy uses the Serverless framework to provision an AWS Lambda, written in JavaScript (Node.js).

The Serverless project requires the RTT username and password to be stored in a local env.yml file.