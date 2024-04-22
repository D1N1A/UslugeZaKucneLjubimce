using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using UslugeZaKucneLjubimce.Data;
using UslugeZaKucneLjubimce.Mappers;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PruzateljUslugeController : KucniLjubimciController<PruzateljUsluge, PruzateljUslugeDTORead, PruzateljUslugeDTOInsertUpdate>
    {
        public PruzateljUslugeController(KucniLjubimciContext context) : base(context)
        {
            DbSet = _context.PruzateljiUsluga;
            _mapper = new MappingPruzateljUsluge();
        }


        protected override PruzateljUsluge PromjeniEntitet(PruzateljUslugeDTOInsertUpdate entitetDTO, PruzateljUsluge entitet)
        {
            var usluga = _context.Usluge.Find(entitetDTO.uslugaSifra) ?? throw new Exception("Ne postoji usluga sa šifrom: " + entitetDTO.uslugaSifra + " u bazi podataka.");
            
            entitet.Usluga= usluga;
            entitet.Ime = entitetDTO.ime;
            entitet.Prezime = entitetDTO.prezime;
            entitet.Telefon=entitetDTO.telefon;
            entitet.Adresa = entitetDTO.adresa;
            entitet.ePosta=entitetDTO.eposta;



            return entitet;
        }


        protected override PruzateljUsluge NadiEntitet(int sifra)
        {
            var entitet = _context.PruzateljiUsluga
                .Include(u=> u.Usluga)
                .FirstOrDefault(x => x.Sifra == sifra);

            if (entitet == null)
            {
                throw new Exception("Ne postoji pružatelj usluge sa šifrom: " + sifra + " u bazi podataka.");
            }

            return entitet;
        }


        protected override List<PruzateljUslugeDTORead> UcitajSve()
        {
            var lista = _context.PruzateljiUsluga
                .Include(u => u.Usluga)
                .ToList();

            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Nema podataka u bazi.");
            }

            return _mapper.MapReadList(lista);
        }


        protected override PruzateljUsluge KreirajEntitet(PruzateljUslugeDTOInsertUpdate entitetDTO)
        {
            var usluga = _context.Usluge.Find(entitetDTO.uslugaSifra);
            if (usluga == null)
            {
                throw new Exception("Ne postoji usluga sa šifrom: " + usluga.Sifra + " u bazi podataka.");
            }

            var entitet = _mapper.MapInsertUpdatedFromDTO(entitetDTO);
            entitet.Usluga = usluga;

            return entitet;
        }


        protected override void KontrolaBrisanje(PruzateljUsluge entitet)
        {
            var lista = _context.Klijenti
                .Include(x => x.PruzateljUsluge)
                .Where(x => x.PruzateljUsluge.Sifra == entitet.Sifra)
                .ToList();

            if (lista != null && lista.Count() > 0)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Pružatelj usluge se ne može obrisati jer je preuzeo iduće klijente: ");
                foreach (var e in lista)
                {
                    sb.Append(e.ImeKlijenta).Append(", ");
                }

                throw new Exception(sb.ToString().Substring(0, sb.ToString().Length - 2));
            }
        }

        [HttpPatch]
        [Route("{sifraPruzateljUsluge:int}")]
        public async Task<ActionResult> Patch(int sifraPruzateljUsluge, IFormFile datoteka)
        {
            if (datoteka == null)
            {
                return BadRequest("Datoteka nije postavljena");
            }

            var entitetIzbaze = _context.PruzateljiUsluga.Find(sifraPruzateljUsluge);

            if (entitetIzbaze == null)
            {
                return BadRequest("Ne postoji pružatelj usluge sa šifrom " + sifraPruzateljUsluge + " u bazi");
            }
            try
            {
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "datoteke" + ds + "pruzatelji usluga");
                if (!System.IO.Directory.Exists(dir))
                {
                    System.IO.Directory.CreateDirectory(dir);
                }
                var putanja = Path.Combine(dir + ds + sifraPruzateljUsluge + "_" + System.IO.Path.GetExtension(datoteka.FileName));
                Stream fileStream = new FileStream(putanja, FileMode.Create);
                await datoteka.CopyToAsync(fileStream);
                return Ok("Datoteka pohranjena");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
