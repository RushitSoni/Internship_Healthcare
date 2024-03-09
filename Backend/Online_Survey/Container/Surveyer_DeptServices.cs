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
    public class Surveyer_DeptServices: ISurveyer_DeptServices
    {

        private readonly InternshipOnlineSurveyContext context;
        private readonly IMapper mapper;

        public Surveyer_DeptServices(InternshipOnlineSurveyContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;

        }

        public async Task<APIResponse> Create(Surveyer_DeptDto data)
        {
            APIResponse response = new APIResponse();
            try
            {
                var existingSurveyer = await context.SurveyerDepts.FirstOrDefaultAsync(s => s.UserId == data.UserId);
                if (existingSurveyer != null)
                {
                    response.ResponseCode = 400;
                    response.ErrorMsg = "Surveyer with the same UserId already exists in the department.";
                    return response;
                }

                SurveyerDept _surveyer = this.mapper.Map<Surveyer_DeptDto,SurveyerDept>(data);
                await this.context.SurveyerDepts.AddAsync(_surveyer);
                await this.context.SaveChangesAsync();



                response.ResponseCode = 201;
                response.Result = $"{data.UserId}";

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

        public async Task<List<Surveyer_DeptDto>> Getall()
        {

            List<Surveyer_DeptDto> _response = new List<Surveyer_DeptDto>();
            var _data = await this.context.SurveyerDepts.ToListAsync();

            if (_data != null)
            {
                _response = this.mapper.Map<List<SurveyerDept>, List<Surveyer_DeptDto>>(_data);
            }


            return _response;
        }

        public async Task<Surveyer_DeptDto> GetbyCode(int id)
        {
            Surveyer_DeptDto _response = new Surveyer_DeptDto();
            var _data = await this.context.SurveyerDepts.FindAsync(id);

            if (_data != null)
            {
                _response = this.mapper.Map<SurveyerDept, Surveyer_DeptDto>(_data);
            }


            return _response;
        }

        public async Task<APIResponse> Remove(int id)
        {
            APIResponse response = new APIResponse();
            try
            {

                var _surveyer = await this.context.SurveyerDepts.FindAsync(id);
                if (_surveyer != null)
                {
                    this.context.SurveyerDepts.Remove(_surveyer);
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

        public async Task<APIResponse> Update(Surveyer_DeptDto data, int id)
        {
            APIResponse response = new APIResponse();
            try
            {

                var _surveyer = await this.context.SurveyerDepts.FindAsync(id);
                if (_surveyer != null)
                {
                    var existingSurveyer = await context.SurveyerDepts.FirstOrDefaultAsync(s => s.UserId == data.UserId && s.SurveyerDeptId != id);
                    if (existingSurveyer != null)
                    {
                        response.ResponseCode = 400;
                        response.ErrorMsg = "Surveyer with the same UserId already exists in the department.";
                        return response;
                    }



                    _surveyer.UserId = data.UserId;


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
