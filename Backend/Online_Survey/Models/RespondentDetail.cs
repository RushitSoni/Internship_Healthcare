using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class RespondentDetail
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Email { get; set; }

    public string PhoneNumber { get; set; }
}
