using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UslugeZaKucneLjubimce.Data;
using UslugeZaKucneLjubimce.Extensions;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PruzateljUslugeController : ControllerBase
    {
        private readonly KucniLjubimciContext _context;

        public PruzateljUslugeController(KucniLjubimciContext context)
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
                var lista = _context.PruzateljiUsluga
                    .Include(pu => pu.Usluga)
                    .ToList();

                if (lista == null || lista.Count == 0)
                {
                    return BadRequest("Ne postoje pruzatelji usluga u bazi");
                }

                return new JsonResult(lista.MapPruzateljUslugeReadList());
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
                var u = _context.PruzateljiUsluga.Include(i => i.Usluga).FirstOrDefault(x => x.Sifra == sifra);

                if (u == null)
                {
                    return BadRequest("Ne postoji pruzatelj usluge s šifrom " + sifra + " u bazi");
                }

                return new JsonResult(u.MapPruzateljUslugeInsertUpdatedToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }


        [HttpPost]
        public IActionResult Post(PruzateljUslugeDTOInsertUpdate pruzateljUslugeDTO)
        {
            if (!ModelState.IsValid || pruzateljUslugeDTO == null)
            {
                return BadRequest();
            }

            var usluga = _context.Usluge.Find(pruzateljUslugeDTO.uslugaSifra);

            if (usluga == null)
            {
                return BadRequest();
            }

            var entitet = pruzateljUslugeDTO.MapPruzateljUslugeInsertUpdateFromDTO(new PruzateljUsluge());
            entitet.Usluga = usluga;

            try
            {
                _context.PruzateljiUsluga.Add(entitet);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status201Created, entitet.MapPruzateljUslugeReadToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }


        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, PruzateljUslugeDTOInsertUpdate pruzateljUslugeDTO)
        {
            if (sifra <= 0 || !ModelState.IsValid || pruzateljUslugeDTO == null)
            {
                return BadRequest();
            }

            try
            {
                var entitet = _context.PruzateljiUsluga.Include(i => i.Usluga).FirstOrDefault(x => x.Sifra == sifra);

                if (entitet == null)
                {
                    return BadRequest();
                }

                var usluga = _context.Usluge.Find(pruzateljUslugeDTO.uslugaSifra);

                if (usluga == null)
                {
                    return BadRequest();
                }

                entitet = pruzateljUslugeDTO.MapPruzateljUslugeInsertUpdateFromDTO(entitet);
                entitet.Usluga = usluga;

                _context.PruzateljiUsluga.Update(entitet);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, entitet.MapPruzateljUslugeReadToDTO());
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
                var entitetIzBaze = _context.PruzateljiUsluga.Find(sifra);

                if (entitetIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.PruzateljiUsluga.Remove(entitetIzBaze);
                _context.SaveChanges();

                return new JsonResult(new { poruka = "Pružatelj usluge obrisan" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

    }
}