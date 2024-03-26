using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using UslugeZaKucneLjubimce.Data;
using UslugeZaKucneLjubimce.Models;

namespace UslugeZaKucneLjubimce.Controllers
{
    /// <summary>
    /// Namjenjeno za CRUD operacije nad entitetom status rezervacije u bazi
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StatusRezervacijeController : ControllerBase
    {
        /// <summary>
        /// Kontest za rad s bazom koji će biti postavljen s pomoću Dependecy Injection-om
        /// </summary>
        private readonly KucniLjubimciContext _context;
        /// <summary>
        /// Konstruktor klase koja prima Edunova kontext
        /// pomoću DI principa
        /// </summary>
        /// <param name="context"></param>
        public StatusRezervacijeController(KucniLjubimciContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Dohvaća sve statuse rezervacije iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita
        /// 
        ///    GET api/v1/StatusRezervacije
        ///    
        /// </remarks>
        /// <returns>Statusi rezervacije u bazi</returns>
        /// <response code="200">Sve OK, ako nema podataka content-length: 0 </response>
        /// <response code="400">Zahtjev nije valjan</response>
        /// <response code="503">Baza na koju se spajam nije dostupna</response>
        [HttpGet]
        public IActionResult Get()
        {
            // kontrola ukoliko upit nije valjan
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var statusiRezervacija = _context.StatusiRezervacija.ToList();
                if (statusiRezervacija==null || statusiRezervacija.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(statusiRezervacija);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Dodaje novi status rezervacije u bazu
        /// </summary>
        /// <remarks>
        ///     POST api/v1/StatusRezervacije
        ///     {stanje: "Primjer stanja"}
        /// </remarks>
        /// <param name="status rezervacije">Status rezervacije za unijeti u JSON formatu</param>
        /// <response code="201">Kreirano</response>

        /// <response code="503">Baza nedostupna iz razno raznih razloga</response> 
        /// <returns>Status rezervacije s šifrom koju je dala baza</returns>
        [HttpPost]
        public IActionResult Post(StatusRezervacije statusRezervacije)
        {
            if (!ModelState.IsValid || statusRezervacije==null)
            {
                return BadRequest();
            }
            try
            {
                _context.StatusiRezervacija.Add(statusRezervacije);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, statusRezervacije);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }
        }

        /// <summary>
        /// Mijenja podatke postojećeg statusa rezervacije u bazi
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    PUT api/v1/statusRezervacije/1
        ///
        /// {
        ///  "sifra": 0,
        ///  "pokazatelj": "true",
        ///  "stanje": "OK",
        /// }
        ///
        /// </remarks>
        /// <param name="sifra">Šifra statusa rezervacije koji se mijenja</param>  
        /// <param name="stanje">Status rezervacije za unijeti u JSON formatu</param> 
        /// <param name="pokazatelj">Boja rezervacije za unijeti u JSON formatu</param>  
        /// <returns>Svi poslani podaci od statusa rezervacije koji su spremljeni u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi statusa rezervacije kojeg želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Baza nedostupna</response> 


        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, StatusRezervacije statusRezervacije)
        {
            if (sifra<=0 || !ModelState.IsValid || statusRezervacije == null)
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


                // inače ovo rade mapperi
                // za sada ručno
                statusRezervacijeIzBaze.Stanje = statusRezervacije.Stanje;
                statusRezervacijeIzBaze.Pokazatelj= statusRezervacije.Pokazatelj;
    
 

                _context.StatusiRezervacija.Update(statusRezervacijeIzBaze);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, statusRezervacijeIzBaze);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }

        /// <summary>
        /// Briše status rezervacije iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    DELETE api/v1/statusRezervacije/1
        ///    
        /// </remarks>
        /// <param name="sifra">Šifra statusa rezervacije koji se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu, obrisano je u bazi</response>
        /// <response code="204">Nema u bazi statusa rezervacije kojeg želimo obrisati</response>
        /// <response code="503">Problem s bazom</response> 
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
                var statusRezervacijeIzbaze = _context.StatusiRezervacija.Find(sifra);

                if (statusRezervacijeIzbaze == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, sifra);
                }

                _context.StatusiRezervacija.Remove(statusRezervacijeIzbaze);
                _context.SaveChanges();

                return new JsonResult( new { poruka = "Obrisano" }); 

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }

        }



    }
}