namespace Online_Survey.DTO
{
    public class QuestionDTO
    {
        public string QuestionText { get; set; } = null!;
        public string QuestionOptionType { get; set; } = null!;
        public int? SurveyId { get; set; }
    }
}
