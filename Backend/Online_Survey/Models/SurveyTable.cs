using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class SurveyTable
{
    public int SurveyId { get; set; }

    public string SurveyName { get; set; }

    public string SurveyorId { get; set; }

    public string Description { get; set; }

    public DateOnly DateCreated { get; set; }

    public DateOnly? LaunchDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public TimeOnly? StartTime { get; set; }

    public TimeOnly? EndTime { get; set; }

    public int? DeptId { get; set; }

    public int Count { get; set; }

    public virtual Department Dept { get; set; }

    public virtual ICollection<OptionTable> OptionTables { get; set; } = new List<OptionTable>();

    public virtual ICollection<QuestionTable> QuestionTables { get; set; } = new List<QuestionTable>();
}
