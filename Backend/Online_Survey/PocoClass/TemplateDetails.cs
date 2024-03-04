using System.Globalization;

namespace Online_Survey.Pococlass
{
    public class TemplateDetails
    {
        public int surveyid { get; set; }
        public string surveyName { get; set; }

        public TemplateQuestions[] question { get; set; }
    }
}
