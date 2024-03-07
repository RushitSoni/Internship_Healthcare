using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Online_Survey.DTOs.Company;
using Online_Survey.Helper;
using Online_Survey.Models;
using Online_Survey.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Online_Survey.DTOs.QuestionBank;

namespace Online_Survey.Container
{
    public class QuestionBankOptionServices: IQuestionBankOptionServices
    {
      

            private readonly InternshipOnlineSurveyContext context;
            private readonly IMapper mapper;

            public QuestionBankOptionServices(InternshipOnlineSurveyContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;

            }

            public async Task<APIResponse> Create(QuestionBank_OptionDto data)
            {
                APIResponse response = new APIResponse();
                try
                {


                    QuestionBankOptionTable _option = this.mapper.Map<QuestionBank_OptionDto, QuestionBankOptionTable>(data);
                    await this.context.QuestionBankOptionTables.AddAsync(_option);
                    await this.context.SaveChangesAsync();



                    response.ResponseCode = 201;
                    response.Result = data.OptionText;

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

            public async Task<List<QuestionBank_OptionDto>> Getall()
            {

                List<QuestionBank_OptionDto> _response = new List<QuestionBank_OptionDto>();
                var _data = await this.context.QuestionBankOptionTables.ToListAsync();

                if (_data != null)
                {
                    _response = this.mapper.Map<List<QuestionBankOptionTable>, List<QuestionBank_OptionDto>>(_data);
                }


                return _response;
            }

            public async Task<QuestionBank_OptionDto> GetbyCode(int id)
            {
                QuestionBank_OptionDto _response = new QuestionBank_OptionDto();
                var _data = await this.context.QuestionBankOptionTables.FindAsync(id);

                if (_data != null)
                {
                    _response = this.mapper.Map<QuestionBankOptionTable, QuestionBank_OptionDto>(_data);
                }


                return _response;
            }

            public async Task<APIResponse> Remove(int id)
            {
                APIResponse response = new APIResponse();
                try
                {

                    var _option = await this.context.QuestionBankOptionTables.FindAsync(id);
                    if (_option != null)
                    {
                        this.context.QuestionBankOptionTables.Remove(_option);
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

            public async Task<APIResponse> Update(QuestionBank_OptionDto data, int id)
            {
                APIResponse response = new APIResponse();
                try
                {

                    var _option = await this.context.QuestionBankOptionTables.FindAsync(id);
                    if (_option != null)
                    {
                       _option.OptionText = data.OptionText;


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
