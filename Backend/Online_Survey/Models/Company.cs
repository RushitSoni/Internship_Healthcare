using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Online_Survey.Models;

public partial class Company
{
    public int CompanyId { get; set; }

    public string Name { get; set; }

    public string AdminId { get; set; }

    [Timestamp]
    public byte[] Timestamp { get; set; }

    public virtual ICollection<Department> Departments { get; set; } = new List<Department>();

    public virtual ICollection<QuestionBankQuestionTable> QuestionBankQuestionTables { get; set; } = new List<QuestionBankQuestionTable>();

    public virtual ICollection<SurveyerDept> SurveyerDepts { get; set; } = new List<SurveyerDept>();
}
