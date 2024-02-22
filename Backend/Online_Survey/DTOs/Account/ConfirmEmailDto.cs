using System.ComponentModel.DataAnnotations;

namespace Online_Survey.DTOs.Account
{
    public class ConfirmEmailDto
    {
        [Required]

        public string Token { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
