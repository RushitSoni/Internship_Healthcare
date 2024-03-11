using System.Collections.Generic;

namespace Online_Survey.DTOs.Respondent
{
    public class OptionDTO
    {
        public string OptionText { get; set; }
    }

    public class QuestionDTO
    {
        public string QuestionText { get; set; }
        public string QuestionType { get; set; }

        public List<string> AnswerTexts { get; set; } // List of answer texts

        public List<OptionDTO> Options { get; set; }
    }

    public class ResponseViaSurveyId
    {
        public int ResponseId { get; set; }
        public int RespondentId { get; set; }
        public int SurveyId { get; set; }

        public List<QuestionDTO> QuestionList { get; set; }
    }
}
