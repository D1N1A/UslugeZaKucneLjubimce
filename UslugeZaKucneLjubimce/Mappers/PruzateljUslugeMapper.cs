using AutoMapper;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Mappers
{
    public class PruzateljUslugeMapper
    {
        public static Mapper InicijalizirajReadToDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<PruzateljUsluge, PruzateljUslugeDTORead>()
                    .ConstructUsing(entitet =>
                    new PruzateljUslugeDTORead(
                        entitet.Sifra,
                        entitet.Ime,
                        entitet.Prezime,
                        entitet.Usluga == null ? "" : entitet.Usluga.Naziv,
                        entitet.Telefon,
                        entitet.Adresa,
                        entitet.Eposta));
                })
                );
        }

        public static Mapper InicijalizirajInsertUpdateToDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<PruzateljUsluge, PruzateljUslugeDTOInsertUpdate>()
                    .ConstructUsing(entitet =>
                    new PruzateljUslugeDTOInsertUpdate(
                        entitet.Ime,
                        entitet.Prezime,
                        entitet.Usluga == null ? null : entitet.Usluga.Sifra,
                        entitet.Telefon,
                        entitet.Adresa,
                        entitet.Eposta));
                })
                );
        }
    }
}
