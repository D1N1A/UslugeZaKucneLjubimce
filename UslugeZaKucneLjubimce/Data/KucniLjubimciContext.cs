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
        public DbSet<Klijent> Klijent { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // veza 1:n
            modelBuilder.Entity<PruzateljUsluge>().HasOne(pu => pu.Usluga);
            // veza 1:n
            modelBuilder.Entity<Klijent>().HasOne(k => k.PruzateljUsluge);
            modelBuilder.Entity<Klijent>().HasOne(k => k.StatusRezervacije);
        }
    }
}
