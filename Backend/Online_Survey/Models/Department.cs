using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class Department
{
    public int DepartmentId { get; set; }

    public string Name { get; set; }

    public int CompanyId { get; set; }

    public virtual Company Company { get; set; }

    public virtual ICollection<SurveyerDept> SurveyerDepts { get; set; } = new List<SurveyerDept>();
}
