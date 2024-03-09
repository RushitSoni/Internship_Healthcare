namespace Online_Survey.DTOs.Survey
{
    public class SurveyorDTO
    {
        public string SurveyorId { get; set; }

        public string Description { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public int? DepartmentId { get; set; }
    }
}
