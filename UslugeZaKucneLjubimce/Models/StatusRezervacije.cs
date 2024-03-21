using System.ComponentModel.DataAnnotations;

namespace UslugeZaKucneLjubimce.Models
{
    /// <summary>
    /// Ovo mi je POCO koji je mapiran na bazu
    /// </summary>
    public class StatusRezervacije : Entitet
    {
        /// <summary>
        /// Stanje u bazi
        /// </summary>
        [Required(ErrorMessage = "Unesite stanje obrade u bazi")]
        public bool? Pokazatelj { get; set; }

        /// <summary>
        /// Potrebno je unijeti stanje
        /// </summary>
        [Required(ErrorMessage = "Pokazatelj statusa obavezna")]

        public string Stanje { get; set; }

    }
}
