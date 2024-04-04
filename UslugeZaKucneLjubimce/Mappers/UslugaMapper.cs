using AutoMapper;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Mappers
{
    public class UslugaMapper
    {
        public static Mapper InicijalizirajReadToDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<Usluga, UslugaDTORead>();
                })
                );
        }

        public static Mapper InicijalizirajReadFromDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<UslugaDTORead, Usluga>();
                })
                );
        }

        public static Mapper InicijalizirajInsertUpdateToDTO()
        {
            return new Mapper(
                new MapperConfiguration(c =>
                {
                    c.CreateMap<Usluga, UslugaDTOInsertUpdate>();
                })
                );
        }
    }
}
