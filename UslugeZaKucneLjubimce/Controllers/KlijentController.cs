

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
    public class KlijentController : KucniLjubimciController<Klijent, KlijentDTORead, KlijentDTOInsertUpdate>
    {
        public KlijentController(KucniLjubimciContext context) : base(context)
        {
            DbSet = _context.Klijenti;
            _mapper = new MappingKlijent();
        }

        //[HttpGet]
        //[Route("trazi/{uvjet}")]
        //public IActionResult TraziKlijent(string uvjet)
        //{


        //    if (uvjet == null || uvjet.Length < 3)
        //    {
        //        return BadRequest(ModelState);
        //    }


        //    uvjet = uvjet.ToLower();
        //    try
        //    {
        //        IEnumerable<Klijent> query = _context.Klijenti;
        //        var niz = uvjet.Split(" ");

        //        foreach (var s in uvjet.Split(" "))
        //        {
        //            query = query.Where(k => k.ImeKlijenta.ToLower().Contains(s) ||k.Pasmina.ToLower().Contains(s));
        //        }


        //        var klijenti = query.ToList();

        //        return new JsonResult(_mapper.MapReadList(klijenti));

        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}




        //[HttpGet]
        //[Route("traziStranicenje/{stranica}")]
        //public IActionResult TraziKlijentaStranicenje(int stranica, string uvjet = "")
        //{
        //    var poStranici = 8;
        //    uvjet = uvjet.ToLower();
        //    try
        //    {
        //        var klijenti = _context.Klijenti
        //            .Where(k => EF.Functions.Like(k.ImeKlijenta.ToLower(), "%" + uvjet + "%")
        //                        || EF.Functions.Like(k.Pasmina.ToLower(), "%" + uvjet + "%"))
        //            .Skip((poStranici * stranica) - poStranici)
        //            .Take(poStranici)
        //            .OrderBy(k => k.ImeKlijenta)
        //            .ToList();


        //        return new JsonResult(_mapper.MapReadList(klijenti));

        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}


        protected override Klijent PromjeniEntitet (KlijentDTOInsertUpdate entitetDTO, Klijent entitet)
        {
            var pruzateljUsluge = _context.PruzateljiUsluga.Find(entitetDTO.pruzateljSifra) ?? throw new Exception("Ne postoji pružatelj usluga s ugovorenim klijentom: " + entitetDTO.pruzateljSifra + " u bazi podataka.");
            var statusRezervacije = _context.StatusiRezervacija.Find(entitetDTO.statusSifra) ?? throw new Exception("Ne postoji status rezervacije s klijentom" + entitetDTO.statusSifra + "");

            entitet.PruzateljUsluge = pruzateljUsluge;
            entitet.StatusRezervacije = statusRezervacije;
            entitet.ImeKlijenta = entitetDTO.imeklijenta;
            entitet.Pasmina=entitetDTO.pasmina;
            entitet.Napomena=entitetDTO.napomena;
            entitet.ImeVlasnika=entitetDTO.imevlasnika;
            entitet.PrezimeVlasnika=entitetDTO.prezimevlasnika;
            entitet.Telefon=entitetDTO.telefon;
            entitet.ePosta=entitetDTO.eposta;



            return entitet;
        }


        protected override Klijent NadiEntitet(int sifra)
        {
            var entitet = _context.Klijenti
                .Include(pu => pu.PruzateljUsluge)
                .Include(sr => sr.StatusRezervacije)
                .FirstOrDefault(x => x.Sifra == sifra);

            if (entitet == null)
            {
                throw new Exception("Ne postoji klijent sa šifrom: " + sifra + " u bazi podataka.");
            }

            return entitet;
        }


        protected override List<KlijentDTORead> UcitajSve()
        {
            var lista = _context.Klijenti
                .Include(pu => pu.PruzateljUsluge)
                .ThenInclude(u => u.Usluga)
                .Include(sr => sr.StatusRezervacije)
                .ToList();

            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Nema podataka u bazi.");
            }

            return _mapper.MapReadList(lista);
        }


        protected override Klijent KreirajEntitet (KlijentDTOInsertUpdate entitetDTO)
        {
            var pruzateljUsluge = _context.PruzateljiUsluga.Find(entitetDTO.pruzateljSifra);
            if (pruzateljUsluge == null)
            {
                throw new Exception("Ne postoji pružatelj usluge sa šifrom: " + pruzateljUsluge.Sifra + " u bazi podataka.");
            }

            var statusRezervacije = _context.StatusiRezervacija.Find(entitetDTO.statusSifra);
            if (statusRezervacije == null)
            {
                throw new Exception("Ne postoji status rezervacije sa šifrom: " + statusRezervacije.Sifra + " u bazi podataka.");
            }

            var entitet = _mapper.MapInsertUpdatedFromDTO(entitetDTO);
            entitet.PruzateljUsluge = pruzateljUsluge;
            entitet.StatusRezervacije = statusRezervacije;

            return entitet;
        }

        protected override void KontrolaBrisanje(Klijent entitet)
        {
        }
    }
}

