using System.ComponentModel.DataAnnotations;

namespace UslugeZaKucneLjubimce.Models
{
    public class StatusRezervacije : Entitet
    {
        public bool? Pokazatelj { get; set; }

        public string? Stanje { get; set; }

    }
}
