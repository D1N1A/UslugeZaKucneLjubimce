using Microsoft.EntityFrameworkCore;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Data
{
    /// <summary>
    /// Ovo je datoteka gdje ćete navoditi datasetove i načine spajanja u bazi
    /// </summary>
    public class KucniLjubimciContext : DbContext
    {
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="options"></param>
        public KucniLjubimciContext(DbContextOptions<KucniLjubimciContext> options)
            : base(options)
        {

        }

        /// <summary>
        /// Statusi rezervacija u bazi
        /// </summary>
        public DbSet<StatusRezervacije> StatusiRezervacija { get; set; }

        /// <summary>
        /// Usluge u bazi
        /// </summary>
        public DbSet<Usluga> Usluge { get; set; }


        /// <summary>
        /// Pružatelji usluga u bazi
        /// </summary>
        /// 
        public DbSet<PruzateljUsluge> PruzateljiUsluga { get; set; }
      
    }
}
