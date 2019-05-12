const express = require('express');
const viewSRouter = express.Router();

// POST base/api/viewS/projects
// [idUser] obavezni parametar u bodiju posta
/**
 * @swagger
 * /api/viewS/projects:
 *    post:
 *      tags:
*       - Studenti - Pregled projekata - API
 *      description: Dohvatanje svih projekata studenta
 */
viewSRouter.post('/projects',(req,res)=>{

});

// POST base/api/viewS/tasks
// [idProjekat] obavezni parametar u bodiju posta
/**
 * @swagger
 * /api/viewS/tasks:
 *    post:
 *      tags:
*       - Studenti - Pregled projekata - API
 *      description: Dohvatanje svih zadataka na projektu
 */
viewSRouter.post('/tasks',(req,res)=>{

});

module.exports = viewSRouter;