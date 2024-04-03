using System.ComponentModel.DataAnnotations;

namespace UslugeZaKucneLjubimce.Models
{
    /// <summary>
    /// POCO koji je mapiran na bazu za entitet PružateljUsluge
    /// </summary>
    public class PruzateljUsluge : Entitet
    {
        /// <summary>
        /// Ime pružatelja usluge
        /// </summary>
        [Required(ErrorMessage = "Ime pružatelja usluge je obavezno")]
        public string Ime { get; set; }

        /// <summary>
        /// Prezime pružatelja usluge
        /// </summary>
        public string Prezime { get; set; }

        /// <summary>
        /// Usluga koju pruža
        /// </summary>
        [Required(ErrorMessage = "Usluga koju pruža je obavezna")]
        public int UslugaId { get; set; }

        /// <summary>
        /// Fotografija pružatelja usluge
        /// </summary>
        public string Fotografija { get; set; }

        /// <summary>
        /// Telefon pružatelja usluge
        /// </summary>
        [Required(ErrorMessage = "Telefon pružatelja usluge je obavezan")]
        public string Telefon { get; set; }

        /// <summary>
        /// Adresa pružatelja usluge
        /// </summary>
        [Required(ErrorMessage = "Adresa pružatelja usluge je obavezna")]
        public string Adresa { get; set; }

        /// <summary>
        /// E-mail pružatelja usluge
        /// </summary>
        [EmailAddress(ErrorMessage = "Neispravna e-mail adresa")]
        public string Eposta { get; set; }
    }
}
