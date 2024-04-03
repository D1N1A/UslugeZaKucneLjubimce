using System.ComponentModel.DataAnnotations;

namespace UslugeZaKucneLjubimce.Models
{
    /// <summary>
    /// Ovo je POCO koji je mapiran na bazu
    /// </summary>
    public class Usluga : Entitet
    {
        /// <summary>
        /// Naziv usluge
        /// </summary>
        [Required(ErrorMessage = "Naziv usluge je obavezan")]
        public string Naziv { get; set; }
    }
}