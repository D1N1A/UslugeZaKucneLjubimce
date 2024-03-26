using System.ComponentModel.DataAnnotations;

namespace UslugeZaKucneLjubimce.Models
{
    /// <summary>
    /// Ovo mi je POCO koji je mapiran na bazu
    /// </summary>
    public class StatusRezervacije : Entitet
    {
        /// <summary>
        ///     Unesite pokazatelja
        /// </summary>

        public bool? Pokazatelj { get; set; }

        /// <summary>
        /// Potrebno unjeti stanje
        /// </summary>

        public string? Stanje { get; set; }

    }
}
