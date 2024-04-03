// index.js

require("pretty-error").start();
require("dotenv").config();

const program = require("commander");
const { cmd } = require("./run");

cmd(program);
