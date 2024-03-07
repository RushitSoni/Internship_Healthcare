using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class QuestionBankOptionTable
{
    public int OptionId { get; set; }

    public string OptionText { get; set; }

    public int QuestionId { get; set; }

    public virtual QuestionBankQuestionTable Question { get; set; }
}
