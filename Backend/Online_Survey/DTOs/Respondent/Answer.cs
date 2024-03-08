using System.Collections.Generic;

namespace Online_Survey.DTOs.Respondent
{
    public class Answer
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public List<int> OptionId{ get; set; }
        public string AnswerText { get; set; }
    }
}

