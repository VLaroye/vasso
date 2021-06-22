import express from 'express';
import dotenv from 'dotenv';

import { defineRoutes as defineLoginRoutes } from './interfaces/http/login/router';
import { defineRoutes as definedWorkspacesRoutes } from './interfaces/http/workspaces/router';
import { initDb } from './interfaces/postgres/initDb';

dotenv.config();

const db = initDb();
const server = express();

server.use(express.json())

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

defineLoginRoutes(server, db);
definedWorkspacesRoutes(server, db);

server.listen(3000, () => {
    console.log('server listening on port 3000...');
})
