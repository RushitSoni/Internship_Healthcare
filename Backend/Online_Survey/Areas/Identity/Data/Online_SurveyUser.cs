using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Online_Survey.Areas.Identity.Data;

// Add profile data for application users by adding properties to the Online_SurveyUser class
public class Online_SurveyUser : IdentityUser
{
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }

    [Required]
    public DateTime DateCreated { get; set; } = DateTime.UtcNow;

    public string Provider { get; set; }

    public string Role { get; set; }

    
}

