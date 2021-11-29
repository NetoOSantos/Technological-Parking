const sensors = require('./sensors')
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const service = require('./sensorService');

class ArduinoRead {

    constructor() {
        this.sensores = {};
        this.listData = [];
    }

    get List() {
        return this.listData;

    }

    //Dados Fake
    fake_data() {
        setInterval(() => {
            let status_vaga = sensors.trc5000(); // utilização do sensor trct5000
            let data = `{"statusVaga": ${status_vaga}, "umidade": 22.0, "temperaturaDHT11": 22.1, "luminosidade": 123.9, "temperaturaLM35": 10.0}`;

            this.sensores = JSON.parse(data);

            console.log('Data', data);
            service.salvaDados(this.sensores)

        }, 2000);
    }


    SetConnection() {
        SerialPort.list().then(listSerialDevices => {
            console.log(listSerialDevices)
            let listArduinoSerial = listSerialDevices.filter(serialDevice => {
                return serialDevice.vendorId == 2341 && serialDevice.productId == 43;
            });

            if (listArduinoSerial.length != 1) {
                this.fake_data();
                console.log("Arduino not found - Generating data");
            } else {
                console.log("Arduino found in the com %s", listArduinoSerial[0].path);
                return listArduinoSerial[0].path;
            }
        }).then(path => {
            try {
                let arduino = new SerialPort(path, { baudRate: 9600 });

                const parser = new Readline();
                arduino.pipe(parser);
                arduino.on('close', () => {
                    console.log('Lost Connection');
                });
                parser.on('data', (data) => {
                    console.log(data);
                    if (data[0] == "{") {
                        this.sensores = JSON.parse(data);
                        service.salvaDados(this.sensores);
                        this.listData.push(this.sensores.statusVaga);
                    }

                });
            } catch (e) {
                console.log(e)
            }

        });
    }

}

const serial = new ArduinoRead();
serial.SetConnection();


module.exports.ArduinoDataTemp = { List: serial.List };
