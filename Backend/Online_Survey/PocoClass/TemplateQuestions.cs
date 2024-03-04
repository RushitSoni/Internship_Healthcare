namespace Online_Survey.Pococlass
{
    public class TemplateQuestions
    {
        public int questionId {  get; set; }
        public string questionText {  get; set; }
        public int questionOptionType { get; set; }
        public TemplateOptions[] options { get; set; }
    }
}
