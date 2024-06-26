﻿namespace UslugeZaKucneLjubimce.Models
{
    public record StatusRezervacijeDTORead(int sifra, string statusNaziv);

    public record StatusRezervacijeDTOInsertUpdate(string statusNaziv);


    public record UslugaDTORead(int sifra, string naziv);

    public record UslugaDTOInsertUpdate(string naziv);

    public record PruzateljUslugeDTORead(int sifra, string? ime, string? prezime, string? uslugaNaziv, string? telefon, string? adresa, string? eposta);

    public record PruzateljUslugeDTOInsertUpdate(string? ime, string? prezime, int? uslugaSifra, string? telefon, string? adresa, string? eposta);

    public record KlijentDTORead(int sifra, string? pruzateljImePrezime, string? uslugaNaziv, string? imeklijenta, string? pasmina, string? napomena, string? imevlasnika, string? prezimevlasnika, string? telefon, string? eposta, string? statusNaziv);

    public record KlijentDTOInsertUpdate(
        int? pruzateljSifra,
        string? imeklijenta, 
        string? pasmina, 
        string? napomena, 
        string? imevlasnika, 
        string? prezimevlasnika, 
        string? telefon, 
        string? eposta, 
        int? statusSifra);
}
