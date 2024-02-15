﻿using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class SurveyTable
{
    public int SurveyId { get; set; }

    public string SurveyorId { get; set; }

    public DateOnly DateCreated { get; set; }

    public DateOnly LaunchDate { get; set; }

    public DateOnly EndDate { get; set; }

    public TimeOnly StartTime { get; set; }

    public int EndTime { get; set; }

    public virtual ICollection<OptionTable> OptionTables { get; set; } = new List<OptionTable>();

    public virtual ICollection<QuestionTable> QuestionTables { get; set; } = new List<QuestionTable>();
}
