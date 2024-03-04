using Online_Survey.Models;
using Online_Survey.Pococlass;

namespace Online_Survey.PocoClass
{
    public class Question_Option
    {    
        public int questionId{ set; get; }
        public int surveyId { set; get; }
        public string questionText { set; get; }
        public int questionOptionType { set; get; } 
        public OptionList[] options { set; get; }
    }
}