using Online_Survey.Models;

namespace Online_Survey.DTOs.Company
{
    public class Surveyer_DeptDto
    {
        public int SurveyerDeptId { get; set; }
        public int DeptId { get; set; }

        public string UserId { get; set; }

       // public string UserName { get; set; }

        public int CompanyId { get; set; }


    }
}
