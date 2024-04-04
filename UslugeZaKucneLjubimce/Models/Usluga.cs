using System.ComponentModel.DataAnnotations;

namespace UslugeZaKucneLjubimce.Models
{
    public class Usluga : Entitet
    {
        [Required(ErrorMessage = "Naziv usluge je obavezan")]
        public string? Naziv { get; set; }
    }
}