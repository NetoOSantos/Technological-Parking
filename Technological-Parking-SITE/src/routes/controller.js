
const express = require('express');
const { ArduinoDataTemp } = require('./newserial');
const Database = require('./database');
const router = express.Router();


router.get('/atividadeSensor', (request, response, next) => {
    var result = ArduinoDataTemp.List;
    response.json({
        data: result
    });
  });

    router.get('/tempo_permanencia', (request, response, next) => {
        var result = Database.tempoPermanencia();
        response.json({
            data: result
        });
    });

    module.exports = router;
