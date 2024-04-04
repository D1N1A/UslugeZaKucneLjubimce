using Microsoft.AspNetCore.Mvc;
using UslugeZaKucneLjubimce.Data;
using UslugeZaKucneLjubimce.Extensions;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UslugaController : ControllerBase
    {
        private readonly KucniLjubimciContext _context;

        public UslugaController(KucniLjubimciContext context)
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
                var lista = _context.Usluge.ToList();
                if (lista == null || lista.Count <= 0)
                {
                    return new EmptyResult();
                }

                return new JsonResult(lista.MapUslugaReadList());
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
                var usluga = _context.Usluge.Find(sifra);
                if (usluga == null)
                {
                    return new EmptyResult();
                }

                return new JsonResult(usluga.MapUslugaInsertUpdatedToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }


        [HttpPost]
        public IActionResult Post(UslugaDTOInsertUpdate uslugaDTO)
        {
            if (!ModelState.IsValid || uslugaDTO == null)
            {
                return BadRequest();
            }

            try
            {
                var usluga = uslugaDTO.MapUslugaInsertUpdateFromDTO(new Usluga());
                _context.Usluge.Add(usluga);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, usluga.MapUslugaReadToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }


        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, UslugaDTOInsertUpdate uslugaDTO)
        {
            if (sifra <= 0 || !ModelState.IsValid || uslugaDTO == null)
            {
                return BadRequest();
            }

            try
            {
                var uslugaIzBaze = _context.Usluge.Find(sifra);
                if (uslugaIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                var usluga = uslugaDTO.MapUslugaInsertUpdateFromDTO(uslugaIzBaze);

                _context.Usluge.Update(usluga);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, usluga.MapUslugaReadToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }


        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid || sifra <= 0)
            {
                return BadRequest();
            }

            try
            {
                var uslugaIzBaze = _context.Usluge.Find(sifra);

                if (uslugaIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.Usluge.Remove(uslugaIzBaze);
                _context.SaveChanges();

                return new JsonResult(new { poruka = "Usluga obrisana" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }
    }
}