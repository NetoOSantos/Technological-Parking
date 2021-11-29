var mysql = require('mysql2');
var connection = mysql.createConnection({
    host     : 'localhost', /* NORMALMENTE localhost */
    user     : 'root', /* NORMALMENTE root */
    password : 'Thetrooper147', /* SENHA DO BANCO DE DADOS */
    database : 'sensores' /* NOME DO BANCO DE DADOS QUE ESTA SENDO USADO */
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Conectado com sucesso!')
});


function save(umidade, temperaturaDHT11, luminosidade, temperaturaLM35, tcr5000){
    var sql = `INSERT INTO medidas (umidade, temperaturaDHT11, luminosidade, temperaturaLM35, tcr5000) 
    VALUES (${[umidade, temperaturaDHT11, luminosidade, temperaturaLM35, tcr5000]})`;
    console.log(sql)
    connection.query(sql, [umidade, temperaturaDHT11, luminosidade, temperaturaLM35, tcr5000], function(err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });      
}

// function ocupaVaga(){
//     let sql='INSERT INTO medidas(tcr5000,dataHora_entrada) values (?,?) ';
//     console.log(sql); 
// }

// function desocupaVaga(){
//     //buscar ultimo registro p poder fazer o update 
//     let sql='UPDATE medidas set tcr5000 XXXXX(tcr5000,dataHora_entrada) values (?,NOW()) ';
//     console.log(sql); 
// }

var tempodepermanencia;
var atividadesensor;

function tempoPermanencia() { //tempo permanencia semanal por vaga 
   const query = "select * from historico";
    connection.query(query, function (err, result) {
        if (err) throw err;
        tempodepermanencia = result;
    });
    return tempodepermanencia;
}

function atividadeSensor() {
    const query = "select tcr5000 from medidas  order by idMedidas desc";
     connection.query(query, function (err, result) {
         if (err) throw err;
         atividadesensor = result;
     });
     console.log(atividadesensor);
     return atividadesensor;
 }


module.exports = {connection, save, tempoPermanencia, atividadeSensor /* ocupaVaga*/ /* desocupaVaga */};
