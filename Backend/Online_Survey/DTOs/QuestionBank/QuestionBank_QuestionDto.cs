namespace Online_Survey.DTOs.QuestionBank
{
    public class QuestionBank_QuestionDto
    {

        public int QuestionId { get; set; }

        public string QuestionText { get; set; }

        public string QuestionOptionType { get; set; }

        public int? CompanyId { get; set; }

        public string UserId { get; set; }
    }
}
