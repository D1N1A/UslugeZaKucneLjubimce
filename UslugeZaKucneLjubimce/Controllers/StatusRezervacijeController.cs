using Microsoft.AspNetCore.Mvc;
using UslugeZaKucneLjubimce.Data;
using UslugeZaKucneLjubimce.Extensions;
using UslugeZaKucneLjubimce.Models;

namespace StatusiRezervacijaZaKucneLjubimce.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StatusRezervacijeController : ControllerBase
    {
        private readonly KucniLjubimciContext _context;

        public StatusRezervacijeController(KucniLjubimciContext context)
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
                var lista = _context.StatusiRezervacija.ToList();
                if (lista == null || lista.Count <= 0)
                {
                    return new EmptyResult();
                }

                return new JsonResult(lista.MapStatusRezervacijeReadList());
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
                var statusRezervacije = _context.StatusiRezervacija.Find(sifra);
                if (statusRezervacije == null)
                {
                    return new EmptyResult();
                }

                return new JsonResult(statusRezervacije.MapStatusRezervacijeInsertUpdatedToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }


        [HttpPost]
        public IActionResult Post(StatusRezervacijeDTOInsertUpdate statusRezervacijeDTO)
        {
            if (!ModelState.IsValid || statusRezervacijeDTO == null)
            {
                return BadRequest();
            }

            try
            {
                var statusRezervacije = statusRezervacijeDTO.MapStatusRezervacijeInsertUpdateFromDTO(new StatusRezervacije());
                _context.StatusiRezervacija.Add(statusRezervacije);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, statusRezervacije.MapStatusRezervacijeReadToDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }


        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, StatusRezervacijeDTOInsertUpdate statusRezervacijeDTO)
        {
            if (sifra <= 0 || !ModelState.IsValid || statusRezervacijeDTO == null)
            {
                return BadRequest();
            }

            try
            {
                var statusRezervacijeIzBaze = _context.StatusiRezervacija.Find(sifra);
                if (statusRezervacijeIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                var statusRezervacije = statusRezervacijeDTO.MapStatusRezervacijeInsertUpdateFromDTO(statusRezervacijeIzBaze);

                _context.StatusiRezervacija.Update(statusRezervacije);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, statusRezervacije.MapStatusRezervacijeReadToDTO());
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
                var statusRezervacijeIzBaze = _context.StatusiRezervacija.Find(sifra);

                if (statusRezervacijeIzBaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.StatusiRezervacija.Remove(statusRezervacijeIzBaze);
                _context.SaveChanges();

                return new JsonResult(new { poruka = "Status rezervacije obrisan" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }



    }
}