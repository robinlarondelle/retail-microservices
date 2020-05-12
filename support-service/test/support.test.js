const assert = require("chai").assert
const request = require("supertest")
const mongoose = require("mongoose")

const server = require("../src/server")
const {SupportTicket} = require("../src/models")

