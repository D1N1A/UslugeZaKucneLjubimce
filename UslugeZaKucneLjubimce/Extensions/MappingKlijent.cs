using System.Collections.Generic;
using UslugeZaKucneLjubimce.Models;
using UslugeZaKucneLjubimce.Mappers;

namespace UslugeZaKucneLjubimce.Extensions
{
    public static class MappingKlijent
    {
        public static List<KlijentDTORead> MapKlijentReadList(this List<Klijent> lista)
        {
            var mapper = KlijentMapper.InicijalizirajReadToDTO();
            var vrati = new List<KlijentDTORead>();
            lista.ForEach(e => {
                vrati.Add(mapper.Map<KlijentDTORead>(e));
            });
            return vrati;
        }

        public static KlijentDTORead MapKlijentReadToDTO(this Klijent e)
        {
            var mapper = KlijentMapper.InicijalizirajReadToDTO();
            return mapper.Map<KlijentDTORead>(e); // Corrected line
        }

        public static KlijentDTOInsertUpdate MapKlijentInsertUpdatedToDTO(this Klijent e)
        {
            var mapper = KlijentMapper.InicijalizirajInsertUpdateToDTO();
            return mapper.Map<KlijentDTOInsertUpdate>(e);
        }

        public static Klijent MapKlijentInsertUpdateFromDTO(this KlijentDTOInsertUpdate dto, Klijent entitet)
        {
            entitet.ImeKlijenta = dto.imeklijenta;
            entitet.Pasmina = dto.pasmina;
            entitet.Napomena = dto.napomena;
            entitet.ImeVlasnika = dto.imevlasnika;
            entitet.PrezimeVlasnika = dto.prezimevlasnika;
            entitet.Telefon = dto.telefon;
            entitet.ePosta = dto.eposta;

            return entitet;
        }
    }
}