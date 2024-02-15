using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class OptionTable
{
    public int OptionId { get; set; }

    public string OptionText { get; set; }

    public int QuestionId { get; set; }

    public int SurveyId { get; set; }

    public virtual QuestionTable Question { get; set; }

    public virtual SurveyTable Survey { get; set; }
}
