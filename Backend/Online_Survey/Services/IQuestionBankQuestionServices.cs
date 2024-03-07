using Online_Survey.DTOs.Company;
using Online_Survey.DTOs.QuestionBank;
using Online_Survey.Helper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Online_Survey.Services
{
    public interface IQuestionBankQuestionServices
    {

        Task<List<QuestionBank_QuestionDto>> Getall();

        Task<QuestionBank_QuestionDto> GetbyCode(int id);

        Task<APIResponse> Remove(int id);
        Task<APIResponse> Create(QuestionBank_QuestionDto data);

        Task<APIResponse> Update(QuestionBank_QuestionDto data, int id);
    }
}
