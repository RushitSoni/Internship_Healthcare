using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Online_Survey.DTOs.Company;
using Online_Survey.Helper;
using Online_Survey.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Online_Survey.Services;

namespace Online_Survey.Container
{
    public class DepartmentServices : IDepartmentServices
    {


        private readonly InternshipOnlineSurveyContext context;
        private readonly IMapper mapper;

        public DepartmentServices(InternshipOnlineSurveyContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;

        }

        public async Task<APIResponse> Create(DepartmentDto data)
        {
            APIResponse response = new APIResponse();
            try
            {


                Department _department = this.mapper.Map<DepartmentDto, Department>(data);
                await this.context.Departments.AddAsync(_department);
                await this.context.SaveChangesAsync();



                response.ResponseCode = 201;
                response.Result = _department.DepartmentId.ToString();

            }
            catch (DbUpdateException ex)
            {


                if (ex.InnerException != null)
                {
                    response.ErrorMsg = ex.InnerException.Message;

                }

                response.ResponseCode = 400;
                response.ErrorMsg = ex.Message;
            }
            catch (Exception ex)
            {
                response.ResponseCode = 400;
                response.ErrorMsg = ex.Message;


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

            }
            return response;
        }

        public async Task<APIResponse> Update(DepartmentDto data, int id)
        {
            APIResponse response = new APIResponse();
            try
            {

                var _department = await this.context.Departments.FindAsync(id);
                if (_department != null)
                {
                    _department.Name = data.Name;


                    await this.context.SaveChangesAsync();
                    response.ResponseCode = 200;
                    response.Result = "";
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

            }
            return response;
        }
    }
}
