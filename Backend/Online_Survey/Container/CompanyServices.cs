using AutoMapper;
using Microsoft.CodeAnalysis.Elfie.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Online_Survey.Audit;
using Online_Survey.DTOs.Company;
using Online_Survey.Helper;
using Online_Survey.Models;
using Online_Survey.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Online_Survey.Container
{
    public class CompanyServices : ICompanyServices
    {
  
        private readonly InternshipOnlineSurveyContext context;
        private readonly IMapper mapper;
        private readonly ILogger<CompanyServices> logger;
        private AuditClass _auditClass;
       
        public CompanyServices(InternshipOnlineSurveyContext context, IMapper mapper, ILogger<CompanyServices> logger)
        {
            this.context = context;
            this.mapper = mapper;
            this.logger = logger;
            this._auditClass = new AuditClass();
        }

        public async Task<APIResponse> Create(CompanyDto data)
        {
            APIResponse response = new APIResponse();
            try
            {
               
                var existingCompany = await context.Companies.FirstOrDefaultAsync(c => c.Name == data.Name && c.AdminId==data.AdminId);
                if (existingCompany != null)
                {
                    response.ResponseCode = 400;
                    response.ErrorMsg = "Company with the same name already exists.";
                    return response;
                }

                Company _company = this.mapper.Map<CompanyDto, Company>(data);
                await this.context.Companies.AddAsync(_company);
                await this.context.SaveChangesAsync();
                _auditClass.AddAudit(_company.AdminId, "Company Created With Id: " + _company.CompanyId);


                response.ResponseCode = 201;
                response.Result = data.Name;
                this.logger.LogInformation($"Created Company {data.Name}.");

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
                this.logger.LogError(ex.Message,ex);

            }
            return response;
        }

        public async Task<List<CompanyDto>> Getall()
        {

            List<CompanyDto> _response = new List<CompanyDto>();
            var _data = await this.context.Companies.ToListAsync();

            if (_data != null)
            {
                _response = this.mapper.Map<List<Company>, List<CompanyDto>>(_data);
            }

            //this.logger.LogInformation($"Get All Company.");
            return _response;
        }

        public async Task<CompanyDto> GetbyCode(int id)
        {
            CompanyDto _response = new CompanyDto();
            var _data = await this.context.Companies.FindAsync(id);

            if (_data != null)
            {
                _response = this.mapper.Map<Company, CompanyDto>(_data);
            }

            this.logger.LogInformation($"Get Company By Code : {id}.");
            return _response;
        }

        public async Task<APIResponse> Remove(int id,string surveyorId)
        {
            APIResponse response = new APIResponse();
            try
            {

                var _company = await this.context.Companies.FindAsync(id);
                if (_company != null)
                {
                    this.context.Companies.Remove(_company);
                    await this.context.SaveChangesAsync();
                    response.ResponseCode = 200;
                    response.Result = "";
                    this.logger.LogInformation($"Remove Company : {id}.");
                    _auditClass.AddAudit(surveyorId.Replace("\"", "").Replace("\\", ""), "Comapny Remove with ID: "+id);
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

        public async Task<APIResponse> Update(CompanyDto data, int id)
        {
            APIResponse response = new APIResponse();
            try
            {
                var existingCompany = await context.Companies.FirstOrDefaultAsync(c => c.Name == data.Name && c.CompanyId != id && c.AdminId == data.AdminId);
                if (existingCompany != null)
                {
                    response.ResponseCode = 400;
                    response.ErrorMsg = "Company with the same name already exists.";
                    return response;
                }

                var _company = await this.context.Companies.FindAsync(id);
                if (_company != null)
                {
                    _company.Name = data.Name;
                   

                    await this.context.SaveChangesAsync();
                    response.ResponseCode = 200;
                    response.Result = "Updated !!";
                    this.logger.LogInformation($"Updated Company {id} , New Name {data.Name}.");
                    _auditClass.AddAudit(_company.AdminId,"Comapany Update with ID : "+id);
                }
                else
                {
                    response.ResponseCode = 404;
                    response.ErrorMsg = $"Data Not Found.";
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
