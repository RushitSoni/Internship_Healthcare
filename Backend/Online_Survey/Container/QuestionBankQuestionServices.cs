using AutoMapper;
using Google.Apis.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Online_Survey.DTOs.Company;
using Online_Survey.DTOs.QuestionBank;
using Online_Survey.Helper;
using Online_Survey.Models;
using Online_Survey.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Online_Survey.Container
{
    public class QuestionBankQuestionServices : IQuestionBankQuestionServices
    {
        private readonly InternshipOnlineSurveyContext context;
        private readonly IMapper mapper;
        private readonly ILogger<QuestionBankQuestionServices> logger;

        public QuestionBankQuestionServices(InternshipOnlineSurveyContext context, IMapper mapper,ILogger<QuestionBankQuestionServices> logger)
        {
            this.context = context;
            this.mapper = mapper;
            this.logger = logger;

        }

        public async Task<APIResponse> Create(QuestionBank_QuestionDto data)
        {
            APIResponse response = new APIResponse();
            try
            {


                QuestionBankQuestionTable _question = this.mapper.Map<QuestionBank_QuestionDto, QuestionBankQuestionTable>(data);
                await this.context.QuestionBankQuestionTables.AddAsync(_question);
                await this.context.SaveChangesAsync();



                response.ResponseCode = 201;
                response.Result = $"{_question.QuestionId}";
                this.logger.LogInformation($"Question For QuestionBank Created : {data.QuestionText}");

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
                this.logger.LogError(ex.Message, ex);

            }
            return response;
        }

        public async Task<List<QuestionBank_QuestionDto>> Getall()
        {

            List<QuestionBank_QuestionDto> _response = new List<QuestionBank_QuestionDto>();
            var _data = await this.context.QuestionBankQuestionTables.ToListAsync();

            if (_data != null)
            {
                _response = this.mapper.Map<List<QuestionBankQuestionTable>, List<QuestionBank_QuestionDto>>(_data);
            }


            return _response;
        }

        public async Task<QuestionBank_QuestionDto> GetbyCode(int id)
        {
            QuestionBank_QuestionDto _response = new QuestionBank_QuestionDto();
            var _data = await this.context.QuestionBankQuestionTables.FindAsync(id);

            if (_data != null)
            {
                _response = this.mapper.Map<QuestionBankQuestionTable,QuestionBank_QuestionDto>(_data);
            }


            return _response;
        }

        public async Task<APIResponse> Remove(int id)
        {
            APIResponse response = new APIResponse();
            try
            {

                var _question = await this.context.QuestionBankQuestionTables.FindAsync(id);
                if (_question != null)
                {
                    this.context.QuestionBankQuestionTables.Remove(_question);
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

        public async Task<APIResponse> Update(QuestionBank_QuestionDto data, int id)
        {
            APIResponse response = new APIResponse();
            try
            {

                var _question = await this.context.QuestionBankQuestionTables.FindAsync(id);
                if (_question != null)
                {
                    _question.QuestionText = data.QuestionText;
                    _question.QuestionOptionType = data.QuestionOptionType;


                    await this.context.SaveChangesAsync();
                    response.ResponseCode = 200;
                    response.Result = "Updated !!";
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

            }
            return response;
        }
    }
}
