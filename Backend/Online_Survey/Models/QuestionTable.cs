using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class QuestionTable
{
    public int QuestionId { get; set; }

    public string QuestionText { get; set; }

    public string QuestionOptionType { get; set; }

    public int SurveyId { get; set; }

    public virtual ICollection<OptionTable> OptionTables { get; set; } = new List<OptionTable>();

    public virtual ICollection<RespondentAnswer> RespondentAnswers { get; set; } = new List<RespondentAnswer>();

    public virtual SurveyTable Survey { get; set; }
}
