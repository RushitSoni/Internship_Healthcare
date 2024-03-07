using System;
using System.Collections.Generic;

namespace Online_Survey.Models;

public partial class QuestionBankQuestionTable
{
    public int QuestionId { get; set; }

    public string QuestionText { get; set; }

    public string QuestionOptionType { get; set; }

    public int? CompanyId { get; set; }

    public string UserId { get; set; }

    public virtual Company Company { get; set; }

    public virtual ICollection<QuestionBankOptionTable> QuestionBankOptionTables { get; set; } = new List<QuestionBankOptionTable>();
}
