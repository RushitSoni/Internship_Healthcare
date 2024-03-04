using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class TemplateOption
{
    public int OptionId { get; set; }

    public string OptionText { get; set; }

    public int QuestionId { get; set; }

    public int? NextQuestion { get; set; }

    public virtual TemplateQuestion Question { get; set; }
}
