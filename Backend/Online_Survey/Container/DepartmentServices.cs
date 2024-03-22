using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Online_Survey.DTOs.Company;
using Online_Survey.Helper;
using Online_Survey.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Online_Survey.Services;
using Microsoft.Extensions.Logging;

namespace Online_Survey.Container
{
    public class DepartmentServices : IDepartmentServices
    {


        private readonly InternshipOnlineSurveyContext context;
        private readonly IMapper mapper;
        private readonly ILogger<DepartmentServices> logger;

        public DepartmentServices(InternshipOnlineSurveyContext context, IMapper mapper, ILogger<DepartmentServices> logger)
        {
            this.context = context;
            this.mapper = mapper;
            this.logger = logger;

        }

        public async Task<APIResponse> Create(DepartmentDto data)
        {
            APIResponse response = new APIResponse();
            try
            {

                var existingDepartment = await context.Departments.FirstOrDefaultAsync(d => d.Name == data.Name);
                if (existingDepartment != null)
                {
                    response.ResponseCode = 400;
                    response.ErrorMsg = "Department with the same name already exists.";
                    return response;
                }


                Department _department = this.mapper.Map<DepartmentDto, Department>(data);
                await this.context.Departments.AddAsync(_department);
                await this.context.SaveChangesAsync();



                response.ResponseCode = 201;
                response.Result = _department.DepartmentId.ToString();
                this.logger.LogInformation($"Department Created : {data.Name}");

            }
            catch (DbUpdateException ex)
            {


                if (ex.InnerException != null)
                {
                    response.ErrorMsg = ex.InnerException.Message;

                }

                response.ResponseCode = 400;
                response.ErrorMsg = ex.Message;
                this.logger.LogError(ex.Message, ex);
            }
            catch (Exception ex)
            {
                response.ResponseCode = 400;
                response.ErrorMsg = ex.Message;
                this.logger.LogError(ex.Message, ex);

            }
            return response;
        }

        public async Task<List<DepartmentDto>> Getall()
        {

            List<DepartmentDto> _response = new List<DepartmentDto>();
            var _data = await this.context.Departments.ToListAsync();

            if (_data != null)
            {
                _response = this.mapper.Map<List<Department>, List<DepartmentDto>>(_data);
            }


            return _response;
        }

        public async Task<DepartmentDto> GetbyCode(int id)
        {
            DepartmentDto _response = new DepartmentDto();
            var _data = await this.context.Departments.FindAsync(id);

            if (_data != null)
            {
                _response = this.mapper.Map<Department, DepartmentDto>(_data);
            }


            return _response;
        }

        public async Task<APIResponse> Remove(int id)
        {
            APIResponse response = new APIResponse();
            try
            {

                var _department = await this.context.Departments.FindAsync(id);
                if (_department != null)
                {
                    this.context.Departments.Remove(_department);
                    await this.context.SaveChangesAsync();
                    response.ResponseCode = 200;
                    response.Result = "";
                    this.logger.LogInformation($"Department Removed : {id}");
                }
                else
                {
                    response.ResponseCode = 404;
                    response.ErrorMsg = "Data Not Found";
                  
                }


            }
            catch (Exception ex)
            {
                response.ResponseCode = 400;
                response.ErrorMsg = ex.Message;
                this.logger.LogError(ex.Message, ex);

            }
            return response;
        }

        public async Task<APIResponse> Update(DepartmentDto data, int id)
        {
            APIResponse response = new APIResponse();
            try
            {

                var existingDepartment = await context.Departments.FirstOrDefaultAsync(d => d.Name == data.Name && d.DepartmentId != id);
                if (existingDepartment != null)
                {
                    response.ResponseCode = 400;
                    response.ErrorMsg = "Department with the same name already exists.";
                    return response;
                }

                var _department = await this.context.Departments.FindAsync(id);
                if (_department != null)
                {
                    _department.Name = data.Name;


                    await this.context.SaveChangesAsync();
                    response.ResponseCode = 200;
                    response.Result = "";
                    this.logger.LogInformation($"Department {id} Updated ,New Name : {_department.Name}");
                }
                else
                {
                    response.ResponseCode = 404;
                    response.ErrorMsg = "Data Not Found";
                }


            }
            catch (Exception ex)
            {
                response.ResponseCode = 400;
                response.ErrorMsg = ex.Message;
                this.logger.LogError(ex.Message, ex);
            }
            return response;
        }
    }
}
