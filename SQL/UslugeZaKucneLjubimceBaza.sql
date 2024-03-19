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

create table pruzateljiusluga (
sifra int not null primary key identity(1,1),
ime varchar (50) not null,
prezime varchar (50),
usluge int not null,
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
usluge int not null,
pruzateljiusluga int,
imeklijenta varchar (50) not null,
pasmina varchar  (50) not null,
napomena varchar (255) not null,
imevlasnika varchar (50) not null,
prezimevlasnika varchar (50) not null,
telefon char (14) not null,
eposta varchar (100),
statusirezervacija int not null
);

create table statusirezervacija (
sifra int not null primary key identity(1,1),
pokazatelj bit,
stanje varchar (50) not null
);

create table operateri (
sifra int not null primary key identity(1,1),
korisnickoime varchar (50) not null,
lozinka varchar (240) not null
);



alter table klijenti add foreign key (pruzateljiusluga) references pruzateljiusluga(sifra);

alter table pruzateljiusluga add foreign key (usluge) references usluge(sifra);

alter table klijenti add foreign key (usluge) references usluge(sifra);

alter table klijenti add foreign key  (statusirezervacija) references statusirezervacija (sifra);