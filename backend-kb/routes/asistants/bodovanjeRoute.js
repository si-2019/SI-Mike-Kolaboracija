const express = require('express');
const bodovanjeRouter = express.Router();

const bodovanjeUtils = require('../../utils/asistantUtils/bodovanjeUtils');

bodovanjeRouter.post('/unified', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    bodovanjeUtils.provjeraParametaraBodovanjeProjektneGrupe(req.body, (cb) => {
        if(cb.ispravno) {
            bodovanjeUtils.upisBodovaProjektneGrupe(req.body, (err) => {
                if(err) {
                    res.send(JSON.stringify({
                        message: 'Doslo je do greske sa bazom.'
                    }));
                }
                else {
                    res.send(JSON.stringify({
                        message: 'Uspjesno bodovan projekat.'
                    }));
                }
            })
        }
        else
        {
            res.send(JSON.stringify({
                message: cb.poruka
            }));
        }
    });
});

// POST base/api/bodovanjeprojekata/specified
// obavezni parametri tj json format - {"Projekat" : idProjekat, "Payload" : [idStudent, idGrupaProjekta, ostvareniBodovi}, {...}, {...}]}
// salje se format u application/json formatu i moraju biti specifirani prethodni parametri

bodovanjeRouter.post('/specified', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    bodovanjeUtils.provjeraBodySpecified(req.body, (err) => {
        if(!err) {
            bodovanjeUtils.upisBodovaProjektaPoClanu(req.body.payload, (err) => {
                if(err) res.send(JSON.stringify({ message: err }));
                else res.send(JSON.stringify({ message: 'Uspjesno bodovan svaki clan grupe za definisani projekat.' }));
            }) 
        } else res.send(JSON.stringify({ message: err }));
    });
});


module.exports = bodovanjeRouter;