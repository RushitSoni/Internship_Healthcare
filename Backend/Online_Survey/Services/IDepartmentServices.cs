using Online_Survey.DTOs.Company;
using Online_Survey.Helper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Online_Survey.Services
{
    public interface IDepartmentServices
    {
        Task<List<DepartmentDto>> Getall();

        Task<DepartmentDto> GetbyCode(int id);

        Task<APIResponse> Remove(int id);
        Task<APIResponse> Create(DepartmentDto data);

        Task<APIResponse> Update(DepartmentDto data, int id);
    }
}
