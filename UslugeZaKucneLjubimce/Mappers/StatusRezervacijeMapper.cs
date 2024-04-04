using AutoMapper;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Mappers
{
    public class StatusRezervacijeMapper
    {
        public static Mapper InicijalizirajReadToDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<StatusRezervacije, StatusRezervacijeDTORead>();
                })
                );
        }

        public static Mapper InicijalizirajReadFromDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<StatusRezervacijeDTORead, StatusRezervacije>();
                })
                );
        }

        public static Mapper InicijalizirajInsertUpdateToDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<StatusRezervacije, StatusRezervacijeDTOInsertUpdate>();
                })
                );
        }
    }
}
