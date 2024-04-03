using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using UslugeZaKucneLjubimce.Data;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Controllers
{
    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetom usluga u bazi
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UslugeController : ControllerBase
    {
        private readonly KucniLjubimciContext _context;

        public UslugeController(KucniLjubimciContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Dohvaća sve usluge iz baze
        /// </summary>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var usluge = _context.Usluge.ToList();
                if (usluge == null || !usluge.Any())
                    return NoContent();

                return Ok(usluge);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

        /// <summary>
        /// Dohvaća uslugu po šifri
        /// </summary>
        [HttpGet("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            try
            {
                var usluga = _context.Usluge.Find(sifra);
                if (usluga == null)
                    return NoContent();

                return Ok(usluga);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

        /// <summary>
        /// Dodaje novu uslugu
        /// </summary>
        [HttpPost]
        public IActionResult Post(Usluga usluga)
        {
            if (!ModelState.IsValid || usluga == null)
                return BadRequest();

            try
            {
                _context.Usluge.Add(usluga);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, usluga);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

        /// <summary>
        /// Mijenja podatke postojeće usluge
        /// </summary>
        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, Usluga usluga)
        {
            if (sifra <= 0 || !ModelState.IsValid || usluga == null)
                return BadRequest();

            try
            {
                var existingUsluga = _context.Usluge.Find(sifra);
                if (existingUsluga == null)
                    return NoContent();

                existingUsluga.Naziv = usluga.Naziv; // Pretpostavljamo da samo mijenjamo naziv usluge

                _context.Usluge.Update(existingUsluga);
                _context.SaveChanges();

                return Ok(existingUsluga);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

        /// <summary>
        /// Briše uslugu
        /// </summary>
        [HttpDelete("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid || sifra <= 0)
                return BadRequest();

            try
            {
                var existingUsluga = _context.Usluge.Find(sifra);
                if (existingUsluga == null)
                    return NoContent();

                _context.Usluge.Remove(existingUsluga);
                _context.SaveChanges();

                return Ok(new { poruka = "Usluga obrisana" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }
    }
}