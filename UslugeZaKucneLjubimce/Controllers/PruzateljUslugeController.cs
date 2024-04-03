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
            try
            {
                var pruzateljiUsluga = _context.PruzateljiUsluga.ToList();
                if (pruzateljiUsluga == null || !pruzateljiUsluga.Any())
                    return NoContent();

                return Ok(pruzateljiUsluga);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var pruzateljUsluge = _context.PruzateljiUsluga.Find(id);
                if (pruzateljUsluge == null)
                    return NoContent();

                return Ok(pruzateljUsluge);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(PruzateljUsluge pruzateljUsluge)
        {
            if (!ModelState.IsValid || pruzateljUsluge == null)
                return BadRequest();

            try
            {
                _context.PruzateljiUsluga.Add(pruzateljUsluge);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, pruzateljUsluge);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

        [HttpPut("{id:int}")]
        public IActionResult Put(int id, PruzateljUsluge pruzateljUsluge)
        {
            if (id <= 0 || !ModelState.IsValid || pruzateljUsluge == null)
                return BadRequest();

            try
            {
                var existingPruzateljUsluge = _context.PruzateljiUsluga.Find(id);
                if (existingPruzateljUsluge == null)
                    return NotFound();

                existingPruzateljUsluge.Ime = pruzateljUsluge.Ime;
                existingPruzateljUsluge.Prezime = pruzateljUsluge.Prezime;
                // Dodajte ostale atribute za ažuriranje

                _context.PruzateljiUsluga.Update(existingPruzateljUsluge);
                _context.SaveChanges();

                return Ok(existingPruzateljUsluge);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest();

            try
            {
                var pruzateljUsluge = _context.PruzateljiUsluga.Find(id);
                if (pruzateljUsluge == null)
                    return NotFound();

                _context.PruzateljiUsluga.Remove(pruzateljUsluge);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }
    }
}