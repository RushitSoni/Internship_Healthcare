using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class TemplateQuestion
{
    public int QuestionId { get; set; }

    public int SurveyId { get; set; }

    public string QuestionText { get; set; }

    public string OptionType { get; set; }

    public virtual TemplateDetail Survey { get; set; }

    public virtual ICollection<TemplateOption> TemplateOptions { get; set; } = new List<TemplateOption>();
}
