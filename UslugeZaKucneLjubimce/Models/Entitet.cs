using System.ComponentModel.DataAnnotations;

namespace UslugeZaKucneLjubimce.Models
{
    /// <summary>
    /// Ovo je vršna nadklasa koja služi za osnovne atribute
    /// tipa sifra, operater, datum unosa, promjene itd.
    /// </summary>
    public class Entitet
    {

        /// <summary>
        /// Ovo svojstvo mi služi kao primarni ključ u bazi s 
        /// generiranjem vrijenosti identity (1,1)
        /// </summary>
        /// 
        [Key]
        public int Sifra { get; set; }
    }
}
