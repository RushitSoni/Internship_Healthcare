namespace Online_Survey.DTO
{
    public class OptionDTO
    {
        public string OptionText { get; set; } = null!;

        public int? QuestionId { get; set; }

        public int? SurveyId { get; set; }

    }
}
