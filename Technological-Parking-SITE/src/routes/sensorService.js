const database = require('./database');

 function salvaDados(sensores){
//     if(sensores.statusVaga >=0 ){
//         if(sensores.statusVaga == 1){
//             database.ocupaVaga();
//         } else {
//             database.desocupaVaga();
//         }
//     }
    let umidade = sensores.umidade;
    let temperatura_dht11 = sensores.temperatura_dht11;
    let luminosidade = sensores.luminosidade;
    let temperatura_lm35 = sensores.temperatura_lm35;
    let tcr5000 = sensores.statusVaga;

    database.save(umidade, temperatura_dht11, luminosidade, temperatura_lm35, tcr5000);

 }


module.exports = {salvaDados};
