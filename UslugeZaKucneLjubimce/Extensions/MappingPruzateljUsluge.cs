using UslugeZaKucneLjubimce.Mappers;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Extensions
{
    public static class MappingPruzateljUsluge
    {
        public static List<PruzateljUslugeDTORead> MapPruzateljUslugeReadList(this List<PruzateljUsluge> lista)
        {
            var mapper = PruzateljUslugeMapper.InicijalizirajReadToDTO();
            var vrati = new List<PruzateljUslugeDTORead>();
            lista.ForEach(e => {
                vrati.Add(mapper.Map<PruzateljUslugeDTORead>(e));
            });
            return vrati;
        }

        public static PruzateljUslugeDTORead MapPruzateljUslugeReadToDTO(this PruzateljUsluge e)
        {
            var mapper = PruzateljUslugeMapper.InicijalizirajReadToDTO();
            return mapper.Map<PruzateljUslugeDTORead>(e);
        }

        public static PruzateljUslugeDTOInsertUpdate MapPruzateljUslugeInsertUpdatedToDTO(this PruzateljUsluge e)
        {

            var mapper = PruzateljUslugeMapper.InicijalizirajInsertUpdateToDTO();
            return mapper.Map<PruzateljUslugeDTOInsertUpdate>(e);
        }


        public static PruzateljUsluge MapPruzateljUslugeInsertUpdateFromDTO(this PruzateljUslugeDTOInsertUpdate dto, PruzateljUsluge entitet)
        {
            entitet.Ime = dto.ime;
            entitet.Prezime = dto.prezime;
            entitet.Telefon = dto.telefon;
            entitet.Adresa = dto.adresa;
            entitet.Eposta = dto.eposta;

            return entitet;
        }
    }
}
