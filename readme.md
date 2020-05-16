# Microservices: Retail casus
This repository is an demonstration of microservices in Node.js with MongoDB, Docker and RabbitMQ among other things.
The Retail casus is based on an assignment from the Software Solution course.

## How to run
In the root of the project, run `docker-compose up --build` to create and run all the containers. Each microservice is running on it's own port:

* order-service: 4000
* transporter-service: 5000
* catalog-service: 6000
* support-service: 7000

## Contributors
Disclaimer: this repository is a shared project between 4 student. All 4 of us are responsible for the code.
* [Sjoerd Schepers](https://github.com/sschepers)
* [Robin La Rondelle](https://github.com/robinlarondelle)
* [Tom Smits](https://github.com/tjfschoo)
* [Tom Schoonbeek](https://github.com/teumaas)
