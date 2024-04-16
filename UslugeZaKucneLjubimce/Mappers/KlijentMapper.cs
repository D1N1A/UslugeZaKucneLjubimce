using AutoMapper;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Mappers
{
    public class KlijentMapper
    {
        public static Mapper InicijalizirajReadToDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<Klijent, KlijentDTORead>()
                    .ConstructUsing(entitet =>
                    new KlijentDTORead(
                        entitet.Sifra,
                        entitet.PruzateljUsluge == null ? "" : (entitet.PruzateljUsluge.Ime + " " + entitet.PruzateljUsluge.Prezime).Trim(),
                        entitet.ImeKlijenta,
                        entitet.Pasmina,
                        entitet.Napomena,
                        entitet.ImeVlasnika,
                        entitet.PrezimeVlasnika,
                        entitet.Telefon,
                        entitet.ePosta,
                        entitet.StatusRezervacije == null ? "" : entitet.StatusRezervacije.StatusNaziv));
                })
                );
        }

        public static Mapper InicijalizirajInsertUpdateToDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<Klijent, KlijentDTOInsertUpdate>()
                    .ConstructUsing(entitet =>
                    new KlijentDTOInsertUpdate(
                        entitet.PruzateljUsluge == null ? null : entitet.PruzateljUsluge.Sifra,
                        entitet.ImeKlijenta,
                        entitet.Pasmina,
                        entitet.Napomena,
                        entitet.ImeVlasnika,
                        entitet.PrezimeVlasnika,
                        entitet.Telefon,
                        entitet.ePosta,
                        entitet.StatusRezervacije == null ? null : entitet.StatusRezervacije.Sifra));
                })
                );
        }
    }
}
