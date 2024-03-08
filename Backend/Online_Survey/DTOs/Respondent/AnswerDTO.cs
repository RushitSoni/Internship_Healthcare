namespace Online_Survey.DTOs.Respondent
{
    public class AnswerDTO
    {
        public int Id { get; set; }

        public int QuestionId { get; set; }

        public int? OptionId { get; set; }

        public string AnswerText { get; set; }
    }
}
