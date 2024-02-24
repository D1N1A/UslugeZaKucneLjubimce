using Microsoft.EntityFrameworkCore;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Data
{

    /// <summary>
    /// Ovo mi je datoteka gdje ću navoditi datasetove i načine spajanja u bazi
    /// </summary>
    public class KucniLjubimciContext:DbContext
    {
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="options"></param>

        public KucniLjubimciContext(DbContextOptions<KucniLjubimciContext>options)
            :base(options)
        { 
        
        }

        /// <summary>
        /// Statusi rezervacija u bazi
        /// </summary>
        public DbSet<StatusRezervacije> StatusiRezervacija { get; set; }
    }
}
