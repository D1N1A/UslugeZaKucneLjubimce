using System.Runtime.CompilerServices;
using UslugeZaKucneLjubimce.Mappers;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Extensions
{
    public static class MappingStatusRezervacije
    {
        public static List<StatusRezervacijeDTORead> MapStatusRezervacijeReadList(this List<StatusRezervacije> lista)
        {
            var mapper = StatusRezervacijeMapper.InicijalizirajReadToDTO();
            var vrati = new List<StatusRezervacijeDTORead>();
            lista.ForEach(e => {
                vrati.Add(mapper.Map<StatusRezervacijeDTORead>(e));
            });
            return vrati;
        }

        public static StatusRezervacijeDTORead MapStatusRezervacijeReadToDTO(this StatusRezervacije entitet)
        {
            var mapper = StatusRezervacijeMapper.InicijalizirajReadToDTO();
            return mapper.Map<StatusRezervacijeDTORead>(entitet);
        }

        public static StatusRezervacijeDTOInsertUpdate MapStatusRezervacijeInsertUpdatedToDTO(this StatusRezervacije entitet)
        {
            var mapper = StatusRezervacijeMapper.InicijalizirajInsertUpdateToDTO();
            return mapper.Map<StatusRezervacijeDTOInsertUpdate>(entitet);
        }

        public static StatusRezervacije MapStatusRezervacijeInsertUpdateFromDTO(this StatusRezervacijeDTOInsertUpdate dto, StatusRezervacije entitet)
        {
            entitet.Pokazatelj = dto.pokazatelj;
            entitet.Stanje = dto.stanje;

            return entitet;
        }
    }
}
