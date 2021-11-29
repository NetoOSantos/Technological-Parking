#include <DHT.h>
#include <DHT_U.h>

#include <Adafruit_Sensor.h>

#include <DHT.h>
#include <DHT_U.h>

#include "DHT.h"
 
#define DHTPIN A1 // pino que estamos conectado
#define DHTTYPE DHT11 // DHT 11
#define sensorPin A0;
#define sensorLM35  A2;
 
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
  Serial.println("DHTxx test!");
  dht.begin();
}
 
void loop()  {
	
    temperatura_humidade();
    Serial.print(";");
    
    temperatura();
    Serial.print(";");

    luminosidade();
    Serial.print(";");

    presenca();
    Serial.print(";");

    delay(1000);

 }  

 void temperatura_humidade(){
     // A leitura da temperatura e umidade pode levar 250ms!
	  // O atraso do sensor pode chegar a 2 segundos.
	  float h = dht.readHumidity();
	  float t = dht.readTemperature();
	  // testa se retorno é valido, caso contrário algo está errado.
	  if (isnan(t) || isnan(h))  {
	    Serial.println("Failed to read from DHT");
	  
	  } else {

	    Serial.print(h);
	    Serial.print(";");
	    Serial.print(t);
	   
	  }

 }

 void temperatura() {
    float valorLM35 = analogRead(sensorLM35);
	delay(100);
	valorLM35 = analogRead(sensorLM35);

	float temperatura = (valorLM35*0.00488) * 100;
    Serial.print(temperatura);
 }

 void luminosidade() {
    sensorValue = analogRead(sensorPin);
	Serial.print(sensorValue);
 }

 void presenca() {
    if (digitalRead(pinosensor)== LOW) {
	  Serial.println("1");

	} else {
	  Serial.println("0");

	}
 }
