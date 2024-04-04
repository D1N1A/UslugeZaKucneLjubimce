using Microsoft.EntityFrameworkCore;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Data
{
    public class KucniLjubimciContext : DbContext
    {
        public KucniLjubimciContext(DbContextOptions<KucniLjubimciContext> options)
            : base(options)
        {

        }

        public DbSet<StatusRezervacije> StatusiRezervacija { get; set; }

        public DbSet<Usluga> Usluge { get; set; }

        public DbSet<PruzateljUsluge> PruzateljiUsluga { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PruzateljUsluge>().HasOne(pu => pu.Usluga);
        }

    }
}
