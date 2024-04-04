using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UslugeZaKucneLjubimce.Models
{
    public class PruzateljUsluge : Entitet
    {
        [Required(ErrorMessage = "Ime pružatelja usluge je obavezno")]
        public string? Ime { get; set; }

        public string? Prezime { get; set; }

        [Required(ErrorMessage = "Usluga koju pruža je obavezna")]
        [ForeignKey("usluga")]
        public Usluga? Usluga { get; set; }

        [Required(ErrorMessage = "Telefon pružatelja usluge je obavezan")]
        public string? Telefon { get; set; }

        [Required(ErrorMessage = "Adresa pružatelja usluge je obavezna")]
        public string? Adresa { get; set; }

        [EmailAddress(ErrorMessage = "Neispravna e-mail adresa")]
        public string? Eposta { get; set; }
    }
}
