using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using UslugeZaKucneLjubimce.Data;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UslugaController : KucniLjubimciController<Usluga, UslugaDTORead, UslugaDTOInsertUpdate>
    {
       

        public UslugaController(KucniLjubimciContext context) : base(context)
        {
            DbSet = _context.Usluge;
        }


        protected override void KontrolaBrisanje(Usluga entitet)
        {
            var lista = _context.PruzateljiUsluga
                .Include(x => x.Usluga)
                .Where(x => x.Usluga.Sifra == entitet.Sifra)
                .ToList();

            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Usluga ne može biti obrisana jer je postavljena na pružateljima usluga: ");

                foreach (var item in lista)
                {
                    sb.Append(item.Ime).Append(" ").Append(item.Prezime).Append(", ");
                }

                throw new Exception(sb.ToString().Substring(0, sb.ToString().Length - 2));
            }

        }
    }
}