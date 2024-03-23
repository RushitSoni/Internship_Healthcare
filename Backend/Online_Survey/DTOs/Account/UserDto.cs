using System;

namespace Online_Survey.DTOs.Account
{
    public class UserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

        public string Id {  get; set; }

        public string JWT { get; set; }

        public string Provider { get; set; }

        public DateTime DateCreated { get; set; } 

        public int IsLogged { get; set; }
    }
}
