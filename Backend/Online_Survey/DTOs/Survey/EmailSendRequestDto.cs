using System.Collections.Generic;

namespace Online_Survey.DTOs.Survey
{
    public class EmailSendRequestDto
    {
        public List<string> Recipients { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
