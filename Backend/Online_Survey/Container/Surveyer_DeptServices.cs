using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Online_Survey.DTOs.Company;
using Online_Survey.Helper;
using Online_Survey.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Online_Survey.Services;
using Google.Apis.Logging;
using Microsoft.Extensions.Logging;
using Online_Survey.Audit;

namespace Online_Survey.Container
{
    public class Surveyer_DeptServices: ISurveyer_DeptServices
    {

        private readonly InternshipOnlineSurveyContext context;
        private readonly IMapper mapper;
        private readonly ILogger<Surveyer_DeptServices> logger;
        private AuditClass _audit;
        public Surveyer_DeptServices(InternshipOnlineSurveyContext context, IMapper mapper,ILogger<Surveyer_DeptServices> logger)
        {
            this.context = context;
            this.mapper = mapper;
            this.logger = logger;
            this._audit = new AuditClass();
        }

        public async Task<APIResponse> Create(Surveyer_DeptDto data)
        {
            APIResponse response = new APIResponse();
            try
            {
                var existingSurveyer = await context.SurveyerDepts.FirstOrDefaultAsync(s => s.UserId == data.UserId  &&  s.DeptId==data.DeptId) ;
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
                this.logger.LogInformation($"Surveyer Created : {data.UserId}");
                this._audit.AddAudit(data.UserId, "Surveyer Created with Id: " + data.SurveyerDeptId + "For Department: " + data.DeptId + "in Company With Id: " + data.CompanyId);

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

        public async Task<APIResponse> Remove(int id,string surveyorId)
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
                    this.logger.LogInformation($"Surveyer Removed : {id} ");
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

        public async Task<APIResponse> Update(Surveyer_DeptDto data, int id)
        {
            APIResponse response = new APIResponse();
            try
            {

                var _surveyer = await this.context.SurveyerDepts.FindAsync(id);
                if (_surveyer != null)
                {
                    var existingSurveyer = await context.SurveyerDepts.FirstOrDefaultAsync(s => s.UserId == data.UserId && s.SurveyerDeptId != id && s.DeptId == data.DeptId);
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

                    this.logger.LogInformation($"Surveyer Updated : {id} , New : {_surveyer.UserId} ");
                    this._audit.AddAudit(data.UserId, "Surveyer Created with Id: " + id + "For Department: " + data.DeptId + "in Company With Id: " + data.CompanyId);
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
