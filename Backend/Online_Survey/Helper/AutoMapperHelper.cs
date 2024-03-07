using AutoMapper;
using Online_Survey.DTOs.Company;
using Online_Survey.DTOs.QuestionBank;
using Online_Survey.Models;

namespace Online_Survey.Helper
{
    public class AutoMapperHelper : Profile
    {
        public AutoMapperHelper()
        {
            CreateMap<CompanyDto, Company>(); // Map CompanyDto to Company
            CreateMap<Company, CompanyDto>(); // Map Company to CompanyDto (if needed)

            CreateMap<DepartmentDto, Department>(); 
            CreateMap<Department, DepartmentDto>();

            CreateMap<Surveyer_DeptDto,SurveyerDept>();
            CreateMap<SurveyerDept, Surveyer_DeptDto>();

            CreateMap<QuestionBank_QuestionDto, QuestionBankQuestionTable>();
            CreateMap<QuestionBankQuestionTable, QuestionBank_QuestionDto>();


            CreateMap<QuestionBank_OptionDto,QuestionBankOptionTable>();
            CreateMap<QuestionBankOptionTable,QuestionBank_OptionDto>();

        }
    }
}
