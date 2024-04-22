using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using UslugeZaKucneLjubimce.Models;

namespace UslugezaKucneLjubimce.Models
{
    public class Operater: Entitet
    {
        public string? KorisnickoIme { get; set; }
        public string? Lozinka { get; set; }
    }
}
