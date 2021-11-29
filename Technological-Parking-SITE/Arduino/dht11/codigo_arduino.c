#include <DHT.h>
#include <DHT_U.h>

#include <Adafruit_Sensor.h>

#include <DHT.h>
#include <DHT_U.h>

#include "DHT.h"
 
#define DHTPIN A1 // pino que estamos conectado
#define DHTTYPE DHT11 // DHT 11
#define sensorPin A0
#define sensorLM35  A2
 
// Conecte pino 1 do sensor (esquerda) ao +5V
// Conecte pino 2 do sensor ao pino de dados definido em seu Arduino
// Conecte pino 4 do sensor ao GND
// Conecte o resistor de 10K entre pin 2 (dados) 
// e ao pino 1 (VCC) do sensor

DHT dht(DHTPIN, DHTTYPE);

int pinosensor= 7;
int sensorValue= 0;


void setup() {
  pinMode(pinosensor,INPUT);
  Serial.begin(9600);
  dht.begin();
}
 
void loop()  {
  int status_vaga = presenca();
  float temperatura_dht11 = temperaturaDht11();
  float umidade= umidade_dht11();
  int luminosidade = sensor_luminosidade();
  float temperatura_lm35 =  temperatura();

  Serial.println("{ \"statusVaga\":"+ String(status_vaga)+",\"temperatura_dht11\":"+temperatura_dht11+", \"umidade\":"+ umidade+",\"luminosidade\":"+luminosidade+",\"temperatura_lm35\":"+ temperatura_lm35+"}");
    
    delay(1000);

 }  

float temperaturaDht11(){
     // A leitura da temperatura e umidade pode levar 250ms!
    // O atraso do sensor pode chegar a 2 segundos.
    float t = dht.readTemperature();
    // testa se retorno é valido, caso contrário algo está errado.
    if (isnan(t))  {
      Serial.println("Failed to read from DHT");
    
    } else {

      return t;
     
    }
 }

 float umidade_dht11(){
     float h = dht.readHumidity();
    // testa se retorno é valido, caso contrário algo está errado.
    if (isnan(h))  {
      Serial.println("Failed to read from DHT");
    
    } else {
       return h;

    }
 }

 float temperatura() {
    float valorLM35 = analogRead(sensorLM35);
  delay(100);
  valorLM35 = analogRead(sensorLM35);

  return (valorLM35*0.00488) * 100;
 }

 int sensor_luminosidade() {
    return analogRead(sensorPin); 
 }

 int presenca() {
    if (digitalRead(pinosensor)== LOW) {
    return 1;

  } else {
    return 0;

  }
 }
