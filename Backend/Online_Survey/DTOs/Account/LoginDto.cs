using System.ComponentModel.DataAnnotations;

namespace Online_Survey.DTOs.Account
{
    public class LoginDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]

        public string Password { get; set; }
    }
}
