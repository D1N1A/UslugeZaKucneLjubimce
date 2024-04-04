using UslugeZaKucneLjubimce.Mappers;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Extensions
{
    public static class MappingUsluga
    {
        public static List<UslugaDTORead> MapUslugaReadList(this List<Usluga> lista)
        {
            var mapper = UslugaMapper.InicijalizirajReadToDTO();
            var vrati = new List<UslugaDTORead>();
            lista.ForEach(e => {
                vrati.Add(mapper.Map<UslugaDTORead>(e));
            });
            return vrati;
        }

        public static UslugaDTORead MapUslugaReadToDTO(this Usluga entitet)
        {
            var mapper = UslugaMapper.InicijalizirajReadToDTO();
            return mapper.Map<UslugaDTORead>(entitet);
        }

        public static UslugaDTOInsertUpdate MapUslugaInsertUpdatedToDTO(this Usluga entitet)
        {
            var mapper = UslugaMapper.InicijalizirajInsertUpdateToDTO();
            return mapper.Map<UslugaDTOInsertUpdate>(entitet);
        }

        public static Usluga MapUslugaInsertUpdateFromDTO(this UslugaDTOInsertUpdate dto, Usluga entitet)
        {
            entitet.Naziv = dto.naziv;
            return entitet;
        }
    }
}
