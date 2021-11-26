create database sensores;

use sensores;

create table usuario(
idUsuario int primary key auto_increment,
CNPJ char(14),
nome varchar(50),
email varchar (45),
contato char(13),
cep char(9),
num_endereco varchar(10),
senha varchar(100),
qtdVagas int
)auto_increment 100;


create table estacionamento(
idEstacionamento int primary key auto_increment,
nomeEstacionamento varchar(45),
numeroRua int,
cep char(9),
fkUsuario int,
foreign key (fkUsuario) references usuario(idUsuario)
) auto_increment 200;

create table medidas(
idMedidas int primary key auto_increment,
umidade float,
temperaturaDHT11 float,
luminosidade float,
temperaturaLM35 float,
tcr5000 float
);

create table vagas(
dataHora_entrada datetime default current_timestamp,
fkMedidas int,
foreign key (fkMedidas) references medidas (idMedidas)
) auto_increment 300;

select * from medidas;
select * from vagas;
select * from usuario;
select * from estacionamento;



truncate table medidas;
select * from medidas;

drop database sensores;

