using Online_Survey.DTOs.Company;
using Online_Survey.Helper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Online_Survey.Services
{
    public interface ICompanyServices
    {
        Task<List<CompanyDto>> Getall();

        Task<CompanyDto> GetbyCode(int id);

        Task<APIResponse> Remove(int id,string surveyorId);
        Task<APIResponse> Create(CompanyDto data);

        Task<APIResponse> Update(CompanyDto data, int id);
    }
}
