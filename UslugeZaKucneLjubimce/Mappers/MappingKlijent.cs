using AutoMapper;
using System.Text.RegularExpressions;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Mappers
{
    public class MappingKlijent : Mapping<Klijent, KlijentDTORead, KlijentDTOInsertUpdate>
    {

        public MappingKlijent()
        {
            MapperMapReadToDTO = new Mapper(
            new MapperConfiguration(c =>
            {
                c.CreateMap<Klijent, KlijentDTORead>()
                    .ConstructUsing(entitet =>
                    new KlijentDTORead(
                        entitet.Sifra,
                        entitet.PruzateljUsluge == null ? "" : (entitet.PruzateljUsluge.Ime + " " + entitet.PruzateljUsluge.Prezime).Trim(),
                        entitet.PruzateljUsluge.Usluga == null ? "" : entitet.PruzateljUsluge.Usluga.Naziv,
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
            MapperMapInsertUpdatedFromDTO = new Mapper(
                   new MapperConfiguration(c =>
                   {
                       c.CreateMap<KlijentDTOInsertUpdate, Klijent>();
                   })
                   );

            MapperMapInsertUpdateToDTO = new Mapper(
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
                 ;
             })
             );
        }



    }
}