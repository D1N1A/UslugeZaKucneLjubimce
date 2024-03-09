using System.ComponentModel.DataAnnotations;

namespace UslugeZaKucneLjubimce.Models
{
    /// <summary>
    /// Ovo mi je POCO koji je mapiran na bazu
    /// </summary>
    public class StatusRezervacije:Entitet
    {
        /// <summary>
        /// Naziv u bazi
        /// </summary>
        [Required(ErrorMessage ="Unesite naziv usluge")]
        public string? Naziv { get; set; }
        /// <summary>
        /// Potrebno je unijeti boju pomoću stringa
        /// </summary>
        [Required(ErrorMessage = "Pokazatelj statusa obavezna")]
       
        public string Pokazatelj { get; set; }
    }
}
