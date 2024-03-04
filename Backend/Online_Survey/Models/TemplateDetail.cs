using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class TemplateDetail
{
    public int SurveyId { get; set; }

    public string SurveyName { get; set; }

    public virtual SurveyTable Survey { get; set; }

    public virtual ICollection<TemplateQuestion> TemplateQuestions { get; set; } = new List<TemplateQuestion>();
}
