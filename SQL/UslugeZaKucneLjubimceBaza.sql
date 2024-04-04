SELECT name, collation_name FROM sys.databases;
GO

ALTER DATABASE db_aa599b_kucniljubimci SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_aa599b_kucniljubimci COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_aa599b_kucniljubimci SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO

use kucniljubimci

drop table if exists statusirezervacija;
drop table if exists pruzateljiusluga;
drop table if exists klijenti;
drop table if exists usluge;
drop table if exists operateri;

create table pruzateljiusluga (
sifra int not null primary key identity(1,1),
ime varchar (50) not null,
prezime varchar (50),
usluga int not null,
fotografija varchar (255),
telefon char (14) not null,
adresa varchar (50) not null,
eposta varchar (100)
);


create table usluge (
sifra int not null primary key identity(1,1),
naziv varchar (255) not null
);

create table klijenti (
sifra int not null primary key identity(1,1),
pruzateljiusluga int,
imeklijenta varchar (50) not null,
pasmina varchar  (50) not null,
napomena varchar (255) not null,
imevlasnika varchar (50) not null,
prezimevlasnika varchar (50) not null,
telefon char (14) not null,
eposta varchar (100),
statusrezervacije int not null
);

create table statusirezervacija (
sifra int not null primary key identity(1,1),
pokazatelj bit,
stanje varchar (50) 
);

create table operateri (
sifra int not null primary key identity(1,1),
korisnickoime varchar (50) not null,
lozinka varchar (240) not null
);



alter table klijenti add foreign key (pruzateljiusluga) references pruzateljiusluga(sifra);

alter table pruzateljiusluga add foreign key (usluga) references usluge(sifra);

alter table klijenti add foreign key (statusrezervacije) references statusirezervacija (sifra);




insert into usluge (naziv) values 
('Šišanje'),
('Kupanje'),
('Friziranje'),
('Šetnja'),
('Dresura');

insert into pruzateljiusluga (ime, prezime, usluga, fotografija, telefon, adresa, eposta) values
('Ana', 'Horvat', 1, 'ana.jpg', '123-456-7890', 'Adresa 1', 'ana@example.com'),
('Ivan', 'Kovač', 2, 'ivan.jpg', '234-567-8901', 'Adresa 2', 'ivan@example.com'),
('Petra', 'Novak', 3, 'petra.jpg', '345-678-9012', 'Adresa 3', 'petra@example.com'),
('Marko', 'Babić', 4, 'marko.jpg', '456-789-0123', 'Adresa 4', 'marko@example.com'),
('Maja', 'Kralj', 5, 'maja.jpg', '567-890-1234', 'Adresa 5', 'maja@example.com');

insert into klijenti (pruzateljiusluga, imeklijenta, pasmina, napomena, imevlasnika, prezimevlasnika, telefon, eposta, statusrezervacije) values
(1, 'Buddy', 'Labrador', 'Živahan pas', 'Ante', 'Šimić', '789-012-3456', 'ante@example.com', 1),
(2, 'Luna', 'Shih Tzu', 'Mirni pas', 'Ivana', 'Marin', '890-123-4567', 'ivana@example.com', 2),
(3, 'Max', 'Golden Retriever', 'Druželjubiv pas', 'Stjepan', 'Horvat', '901-234-5678', 'stjepan@example.com', 3),
(4, 'Charlie', 'Pudlica', 'Potrebna dresura', 'Ana', 'Babić', '012-345-6789', 'ana.b@example.com', 1),
(5, 'Bella', 'Chihuahua', 'Mali pas', 'Ivan', 'Kralj', '123-456-7890', 'ivan.k@example.com', 2);

insert into statusirezervacija (pokazatelj, stanje) values
(1, 'Nije odobreno'),
(0, 'Odbijeno'),
(1, 'Odobreno');

insert into operateri (korisnickoime, lozinka) values
('admin', 'admin123'),
('user', 'user123');
