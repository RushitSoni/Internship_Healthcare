using Online_Survey.DTOs.Company;
using Online_Survey.DTOs.QuestionBank;
using Online_Survey.Helper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Online_Survey.Services
{
    public interface IQuestionBankOptionServices
    {
        Task<List<QuestionBank_OptionDto>> Getall();

        Task<QuestionBank_OptionDto> GetbyCode(int id);

        Task<APIResponse> Remove(int id);
        Task<APIResponse> Create(QuestionBank_OptionDto data);

        Task<APIResponse> Update(QuestionBank_OptionDto data, int id);
    }
}
