using System.ComponentModel.DataAnnotations;

namespace Online_Survey.DTOs.Account
{
    public class LoginWithExternal
    {
        [Required]
        public string AccessToken { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public string Provider { get; set; }
    }
}
