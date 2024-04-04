namespace UslugeZaKucneLjubimce.Models
{
    public record StatusRezervacijeDTORead(int sifra, bool pokazatelj, string stanje);

    public record StatusRezervacijeDTOInsertUpdate(bool pokazatelj, string stanje);


    public record UslugaDTORead(int sifra, string naziv);

    public record UslugaDTOInsertUpdate(string naziv);

    public record PruzateljUslugeDTORead(int sifra, string? ime, string? prezime, string? uslugaNaziv, string? telefon, string? adresa, string? eposta);

    public record PruzateljUslugeDTOInsertUpdate(string? ime, string? prezime, int? uslugaSifra, string? telefon, string? adresa, string? eposta);
}
