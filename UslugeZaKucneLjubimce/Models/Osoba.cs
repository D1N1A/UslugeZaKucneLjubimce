using System.ComponentModel.DataAnnotations;

namespace UslugeZaKucneLjubimce.Models
{
    public class Osoba : Entitet
    {
        [Required(ErrorMessage = "Telefon  je obavezan")]
        public string? Telefon { get; set; }

        [Required(ErrorMessage = "Adresa ePošte je obavezna")]

        public string? ePosta {  get; set; }
    }
}
