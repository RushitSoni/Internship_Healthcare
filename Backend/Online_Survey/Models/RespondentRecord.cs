using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class RespondentRecord
{
    public int Id { get; set; }

    public int RespondentId { get; set; }

    public int SurveyId { get; set; }

    public virtual RespondentDetail Respondent { get; set; }

    public virtual ICollection<RespondentAnswer> RespondentAnswers { get; set; } = new List<RespondentAnswer>();
}
