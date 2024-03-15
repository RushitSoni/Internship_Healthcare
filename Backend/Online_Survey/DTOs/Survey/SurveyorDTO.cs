namespace Online_Survey.DTOs.Survey
{
    public class SurveyorDTO
    {
        public string SurveyorId { get; set; }

        public string SurveyName { get; set; }
        public string Description { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public string startTime { get; set; }

        public string endTime { get; set; }

        public int? DeptId { get; set; }

        public int Count { get; set; }
    }
}
