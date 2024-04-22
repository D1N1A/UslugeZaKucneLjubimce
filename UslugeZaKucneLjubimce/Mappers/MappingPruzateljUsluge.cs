using AutoMapper;
using System.Text.RegularExpressions;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Mappers
{
    public class MappingPruzateljUsluge : Mapping<PruzateljUsluge, PruzateljUslugeDTORead, PruzateljUslugeDTOInsertUpdate>
    {

        public MappingPruzateljUsluge()
        {
            MapperMapReadToDTO = new Mapper(
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
                        entitet.ePosta));
                })
                );
        

        MapperMapInsertUpdatedFromDTO = new Mapper(
                new MapperConfiguration(c =>
                {
            c.CreateMap<PruzateljUslugeDTOInsertUpdate, PruzateljUsluge>();
        })
                );


            MapperMapInsertUpdateToDTO = new Mapper(
                 
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
                        entitet.ePosta));
                })
                );
        }
    }
}
