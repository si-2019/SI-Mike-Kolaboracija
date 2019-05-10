const express = require('express');
const workRouter = express.Router();

const workUtils = require('../../utils/studentUtils/workUtils');

// POST base/api/work/ 
// [id_projekta, prioritet, od_kad, do_kad] obavezni parametar u bodiju posta
// [opis, zavrsen, komentar_asistenta] nisu obavezni parametri za ovaj post
// salje se kao url encoded format i prima i kao rezultat vraca json projektnog zadatka ukoliko je uspješno dodan
// a ako nije json sa parametrom message koji govori da nije uspješno dodan projektni zadatak za projekat
/**
 * @swagger
 * /api/work/:
 *    post:
 *      tags:
 *       - Studenti - Rad na projektu
 *      description: Omogucava dodavanje projektnih zadataka za vec postojeci projekat
 *      parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             id_projekta:
 *               type: string
 *             prioritet:
 *               type: string
 *             od_kad:
 *               type: string
 *             do_kad:
 *               type: string
 *             opis:
 *               type: string
 *             zavrsen:
 *               type: boolean
 *             komentar_asistenta:
 *               type: string
 *         required:
 *           - id_projekta
 *           - prioritet
 *           - od_kad
 *           - do_kad
 *      responses:
 *       200:
 *         description: Vraca se JSON objekat sa parametrom message
 *         content: 
 *           application/json:
 *               schema: 
 *                 type: object
 *                 properties:
 *                  message:
 *                   type: string
*/
workRouter.post('/', (req, res) => {    
    let postBody = req.body;
    res.setHeader('Content-Type', 'application/json');
    
    let bool = workUtils.provjeraParametaraPostPZ(postBody); 
    if (!bool) res.send(JSON.stringify({ message: 'Body parametri nisu specifirani [id_projekta, od_kad, do_kad]' }));
    else {
        let opis = "";
        let zavrsen = false;
        let komentar_a = "";
        if(postBody['opis']) opis = postBody['opis'];
        if(postBody['zavrsen']) zavrsen = postBody['zavrsen'];
        if(postBody['komentar_asistenta']) komentar_a = postBody['komentar_asistenta'];

        // provjera regex od kad i do kad parametara
        let regexDatumFormat = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])) ((0[0-9]|1[0-9]|2[0-3])\:([0-5][0-9])\:(([0-5][0-9])))/;
        if(!postBody['od_kad'].match(regexDatumFormat) || !postBody['do_kad'].match(regexDatumFormat)){
            res.send(JSON.stringify({ message: 'Datumi nisu u formatu [yyyy-mm-dd hh:mm:ss]!' }));
            return;
        }

        // ukoliko je sve zadovoljeno piše se u bazu
        workUtils.upisNovogPZuBazu(postBody, opis, zavrsen, komentar_a, (err, objekat) => {
            if(err) res.send(JSON.stringify({ message: 'Poslani [id_projekta] ne postoji u bazi ili je doslo do greske sa bazom!' }));
            else res.send(JSON.stringify(objekat));
        });
        
    }
});

module.exports = workRouter;