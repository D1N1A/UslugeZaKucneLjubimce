using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UslugeZaKucneLjubimce.Data;
using UslugeZaKucneLjubimce.Extensions;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class Klijent : ControllerBase
    {
        private readonly KucniLjubimciContext _context;

        public Klijent(KucniLjubimciContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var lista = _context.Klijent
                    .Include(k => k.PruzateljUsluge)
                    .Include(k=> k.StatusRezervacije)
                    .ToList();

                if (lista == null || lista.Count == 0)
                {
                    return BadRequest("Ne postojeklijenti u bazi");
                }

                return new JsonResult(lista.MapKlijentReadList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }


        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var k = _context.Klijent.Include(i => i.Klijent).FirstOrDefault(x => x.Sifra == sifra);

                if (k == null)
                {
                    return BadRequest("Ne postoji klijent sa šifrom " + sifra + " u bazi");
                }

                return new JsonResult(k.MapKlijentInsertUpdatedToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }

            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var k = _context.Klijent.Include(i => i.StatusRezervacije).FirstOrDefault(x => x.Sifra == sifra);

                if (k == null)
                {
                    return BadRequest("Ne postoji klijent sa šifrom " + sifra + " u bazi");
                }

                return new JsonResult(k.MapKlijentInsertUpdatedToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }


        [HttpPost]
        public IActionResult Post(KlijentDTOInsertUpdate klijentDTO)
        {
            if (!ModelState.IsValid || KlijentDTO == null)
            {
                return BadRequest();
            }

            var klijent
                = _context.Klijent.Find(KlijentDTORead.;

            if (klijent == null)
            {
                return BadRequest();
            }

            var entitet = klijentDTO.MapKlijentInsertUpdateFromDTO(new Klijent());
            entitet.klijent = klijent;

            try
            {
                _context.Klijenti.Add(entitet);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, entitet.MapKlijentReadToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }


        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, KlijentDTOInsertUpdate klijentDTO)
        {
            if (sifra <= 0 || !ModelState.IsValid || klijentDTO == null)
            {
                return BadRequest();
            }

            try
            {
                var entitet = _context.Klijenti.Include(i => i.Usluga).FirstOrDefault(x => x.Sifra == sifra);

                if (entitet == null)
                {
                    return BadRequest();
                }

                var usluga = _context.Usluge.Find(klijentDTO.pruzateljSifra);

                if (usluga == null)
                {
                    return BadRequest();
                }

                entitet = klijentDTO.MapKlijentInsertUpdateFromDTO(entitet);
                entitet.Usluga = usluga;

                _context.Klijenti.Update(entitet);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, entitet.MapKlijentReadToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }


        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest();
            }

            try
            {
                var entitetIzBaze = _context.Klijenti.Find(sifra);

                if (entitetIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Klijenti.Remove(entitetIzBaze);
                _context.SaveChanges();

                return new JsonResult(new { poruka = "Klijent obrisan" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

    }
}