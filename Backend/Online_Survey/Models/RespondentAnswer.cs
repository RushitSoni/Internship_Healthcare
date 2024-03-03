using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class RespondentAnswer
{
    public int Id1 { get; set; }

    public int Id { get; set; }

    public int QuestionId { get; set; }

    public int? OptionId { get; set; }

    public string AnswerText { get; set; }

    public virtual RespondentRecord IdNavigation { get; set; }

    public virtual OptionTable Option { get; set; }

    public virtual QuestionTable Question { get; set; }
}
