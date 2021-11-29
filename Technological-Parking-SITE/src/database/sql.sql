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
tcr5000 float,
dataHora_entrada datetime default current_timestamp,
fkestacionamento int, 
foreign key (fkestacionamento) references estacionamento(idEstacionamento)
)auto_increment 300;

create table historico(
idHistorico int primary key auto_increment,
tempo_de_permanencia float,
diaSemana varchar(20),
fksensor int,
foreign key(fksensor) references medidas(idMedidas)
)auto_increment 400;

desc historico;
insert into historico(tempo_de_permanencia, diaSemana, fksensor) values 
(8, 'Segunda-feira', 300),
(8, 'Terça-feira', 301),
(7, 'Quarta-feira', 302),
(6,'Quinta-feira', 303),
(9, 'Sexta-feira', 304),
(4, 'Sábado', 305),
(0, 'Domingo', 306);

select * from medidas;
select * from usuario;
select * from estacionamento;
select * from historico;


drop database sensores;









