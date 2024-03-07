using System;

namespace Online_Survey.DTO
{
    public class SurveyDTO
    {
        public string SurveyorId { get; set; }

        public string Description { get; set; }

        public DateOnly DateCreated { get; set; }

        public DateOnly? LaunchDate { get; set; }

        public DateOnly? EndDate { get; set; }

        public TimeOnly? StartTime { get; set; }
        public int? DeptId { get; set; }
    }
}
