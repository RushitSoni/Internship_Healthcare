using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class Company
{
    public int CompanyId { get; set; }

    public string Name { get; set; }

    public string AdminId { get; set; }

    public virtual ICollection<Department> Departments { get; set; } = new List<Department>();

    public virtual ICollection<SurveyerDept> SurveyerDepts { get; set; } = new List<SurveyerDept>();
}
