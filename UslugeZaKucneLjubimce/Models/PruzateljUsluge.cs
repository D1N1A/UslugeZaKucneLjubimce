using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UslugeZaKucneLjubimce.Models
{
    public class PruzateljUsluge : Osoba
    {
        [Required(ErrorMessage = "Ime pružatelja usluge je obavezno")]
        public string? Ime { get; set; }

        public string? Prezime { get; set; }

        [Required(ErrorMessage = "Usluga koju pruža je obavezna")]
        [ForeignKey("usluga")]
        public Usluga? Usluga { get; set; }


        [Required(ErrorMessage = "Adresa pružatelja usluge je obavezna")]
        public string? Adresa { get; set; }

     

    }
}
