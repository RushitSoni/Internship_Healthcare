using System.Globalization;

namespace Online_Survey.Pococlass
{
    public class TemplateDetails
    {
        public string surveyorId { get; set; }
        public int surveyid { get; set; }
        public string surveyname { get; set; }
        public TemplateQuestions[] questions { get; set; }
    }
}
