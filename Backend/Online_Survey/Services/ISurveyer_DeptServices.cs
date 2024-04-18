using Online_Survey.DTOs.Company;
using Online_Survey.Helper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Online_Survey.Services
{
    public interface ISurveyer_DeptServices
    {
        Task<List<Surveyer_DeptDto>> Getall();

        Task<Surveyer_DeptDto> GetbyCode(int id);

        Task<APIResponse> Remove(int id,string surveyorId);
        Task<APIResponse> Create(Surveyer_DeptDto data);

        Task<APIResponse> Update(Surveyer_DeptDto data, int id);
    }
}
