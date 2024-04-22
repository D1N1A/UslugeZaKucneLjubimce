using Microsoft.AspNetCore.Mvc;
using UslugeZaKucneLjubimce.Controllers;
using UslugeZaKucneLjubimce.Data;
using UslugeZaKucneLjubimce.Models;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace UslugeZaKucneLjubimce.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StatusRezervacijeController : KucniLjubimciController<StatusRezervacije, StatusRezervacijeDTORead, StatusRezervacijeDTOInsertUpdate>
    {

        public StatusRezervacijeController(KucniLjubimciContext context) : base(context)
        {
            DbSet = _context.StatusiRezervacija;
        }

        protected override void KontrolaBrisanje(StatusRezervacije entitet)
        {
            var lista = _context.Klijenti
                .Include(x => x.StatusRezervacije)
                .Where(x => x.StatusRezervacije.Sifra == entitet.Sifra)
                .Select(x => x.StatusRezervacije)
                .Distinct()
                .ToList();

            if (lista != null && lista.Count() > 0)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Status rezervacije se ne može obrisati jer je postavljen na klijentima: ");
                foreach (var e in lista)
                {
                    sb.Append(entitet.StatusNaziv).Append(", ");
                }

                throw new Exception(sb.ToString().Substring(0, sb.ToString().Length - 2));
            }
        }

    }
}