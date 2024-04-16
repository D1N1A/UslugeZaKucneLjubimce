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



-- DROPANJE TABLICA
drop table if exists operateri;
drop table if exists klijenti;
drop table if exists statusirezervacija;
drop table if exists pruzateljiusluga;
drop table if exists usluge;


-- KREIRANJE TABLICA
create table pruzateljiusluga (
sifra int not null primary key identity(1,1),
ime varchar (50) not null,
prezime varchar (50),
usluga int not null,
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
pruzateljusluge int,
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
statusnaziv varchar (50)
);

create table operateri (
sifra int not null primary key identity(1,1),
korisnickoime varchar (50) not null,
lozinka varchar (240) not null
);


-- DODAVANJE VANJSKIH KLJUCEVA
alter table klijenti add foreign key (pruzateljusluge) references pruzateljiusluga(sifra);
alter table pruzateljiusluga add foreign key (usluga) references usluge(sifra);
alter table klijenti add foreign key (statusrezervacije) references statusirezervacija (sifra);


-- DODAVANJE VRIJEDNOSTI
insert into usluge (naziv) values
('Šišanje'),
('Kupanje'),
('Friziranje'),
('Šetnja'),
('Dresura');

insert into pruzateljiusluga (ime, prezime, usluga, telefon, adresa, eposta) values
('Ana', 'Horvat', 1, '123-456-7890', 'Adresa 1', 'ana@example.com'),
('Ivan', 'Kovač', 2, '234-567-8901', 'Adresa 2', 'ivan@example.com'),
('Petra', 'Novak', 3, '345-678-9012', 'Adresa 3', 'petra@example.com'),
('Marko', 'Babić', 4, '456-789-0123', 'Adresa 4', 'marko@example.com'),
('Maja', 'Kralj', 5, '567-890-1234', 'Adresa 5', 'maja@example.com');

insert into statusirezervacija (statusnaziv) values
('Status na čekanju'),
('Status odbijen'),
('Status odobren');

insert into klijenti (pruzateljusluge, imeklijenta, pasmina, napomena, imevlasnika, prezimevlasnika, telefon, eposta, statusrezervacije) values
(1, 'Buddy', 'Labrador', 'Živahan pas', 'Ante', 'Šimić', '789-012-3456', 'ante@example.com', 1),
(2, 'Luna', 'Shih Tzu', 'Mirni pas', 'Ivana', 'Marin', '890-123-4567', 'ivana@example.com', 2),
(3, 'Max', 'Golden Retriever', 'Druželjubiv pas', 'Stjepan', 'Horvat', '901-234-5678', 'stjepan@example.com', 3),
(4, 'Charlie', 'Pudlica', 'Potrebna dresura', 'Ana', 'Babić', '012-345-6789', 'ana.b@example.com', 1),
(5, 'Bella', 'Chihuahua', 'Mali pas', 'Ivan', 'Kralj', '123-456-7890', 'ivan.k@example.com', 2);

insert into operateri (korisnickoime, lozinka) values
('admin', 'admin123'),
('user', 'user123');