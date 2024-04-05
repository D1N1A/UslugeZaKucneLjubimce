using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UslugeZaKucneLjubimce.Models
{
    public class Klijent : Entitet
    {
        
        [ForeignKey("pruzateljusluge")]
        public PruzateljUsluge? PruzateljUsluge { get; set; }

        [Required(ErrorMessage = "Unos imena klijenta je obavezno")]
        public string ImeKlijenta { get; set; }


        [Required(ErrorMessage = "Unos pasmine životinje je obavezan")]
        public string Pasmina { get; set; }

        [Required(ErrorMessage = "Unos napomene ili opisa usluge je obavezna")]
        public string Napomena { get; set; }

        [Required(ErrorMessage = "Unos imena vlasnika je obavzean")]
        public string ImeVlasnika { get; set; }

        [Required(ErrorMessage = "Obavezno je unijeti prezime vlasnika")]
        public string PrezimeVlasnika { get; set; }

        [Required(ErrorMessage = "Obavezan je unos telefonskog broja")]
        public string Telefon {  get; set; }

        public string? ePosta { get; set; }

        [Required(ErrorMessage = "Status rezervacije je obavezan")]
        [ForeignKey("statusrezervacije")]
        public StatusRezervacije StatusRezervacije{ get; set; }


    }


}
