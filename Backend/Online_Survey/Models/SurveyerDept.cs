using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class SurveyerDept
{
    public int SurveyerDeptId { get; set; }

    public int DeptId { get; set; }

    public string UserId { get; set; }

    public int CompanyId { get; set; }

    public virtual Company Company { get; set; }

    public virtual Department Dept { get; set; }
}
