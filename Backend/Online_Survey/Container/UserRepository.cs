using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Online_Survey.DTOs;
using Online_Survey.DTOs.Respondent;
using Online_Survey.Models;
using Online_Survey.Pococlass;
using Online_Survey.PocoClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Online_Survey.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly InternshipOnlineSurveyContext _ef;
        private InternshipOnlineSurveyContext _ef1;
        public UserRepository(IConfiguration config, InternshipOnlineSurveyContext ef1)
        {
            _ef = new InternshipOnlineSurveyContext(config);
            _ef1 = ef1;
        }

        bool IUserRepository.SaveChange()
        {
            return _ef.SaveChanges() > 0;
        }
        
        void IUserRepository.AddEntity<T>(T data)
        {
            if(data!=null)
            {
                _ef.Add(data);
            }
        }

        IQueryable<QuestionTable> IUserRepository.QuestionOption()
        {
            return _ef.QuestionTables.Include(q => q.OptionTables);
        }

        IQueryable<TemplateDetail> IUserRepository.Template(string id)
        {
            return _ef.TemplateDetails.Where(q => q.SurveyorId == id);
        }

        IQueryable<TemplateQuestion> IUserRepository.TemplateData()
        {
            return _ef.TemplateQuestions.Include(q => q.TemplateOptions);
        }


        IQueryable<SurveyTable> IUserRepository.GetAllSurveys()
        {
            return _ef.SurveyTables;
        }


        List<string> IUserRepository.Check(string email,int surveyId)
        {
            return (from rd in _ef.RespondentDetails
                           join rr in _ef.RespondentRecords on rd.Id equals rr.RespondentId
                           where rd.Email == email && rr.SurveyId == surveyId
                           select rd.Email).ToList();
        }

        IQueryable<RespondentDetail> IUserRepository.GetAllResponses()
        {
            return _ef.RespondentDetails;
        }



        Task<List<ResponseViaSurveyId>> IUserRepository.GetSurveyResponseBySurveyId(int surveyId)
        {
            var responseList = new List<ResponseViaSurveyId>();

            var respondentRecords = _ef.RespondentRecords.Where(rr => rr.SurveyId == surveyId).ToList();

            foreach (var respondentRecord in respondentRecords)
            {
                var response = new ResponseViaSurveyId
                {
                    RespondentId = respondentRecord.RespondentId,
                    SurveyId = respondentRecord.SurveyId,
                    ResponseId = respondentRecord.Id
                };

                response.QuestionList = (from q in _ef.QuestionTables
                                         where q.SurveyId == surveyId
                                         select new QuestionDTO
                                         {
                                             QuestionText = q.QuestionText,
                                             QuestionType = q.QuestionOptionType,
                                             AnswerTexts = (q.QuestionOptionType == "3") ?
                                                    _ef.RespondentAnswers
                                                       .Where(ra => ra.QuestionId == q.QuestionId && ra.Id == respondentRecord.Id)
                                                       .Select(ra => ra.AnswerText)
                                                       .ToList() :
                                                    _ef.RespondentAnswers
                                                       .Where(ra => ra.QuestionId == q.QuestionId && ra.Id == respondentRecord.Id && ra.OptionId != null)
                                                       .Join(_ef.OptionTables,
                                                             ra => ra.OptionId,
                                                             o => o.OptionId,
                                                             (ra, o) => o.OptionText)
                                                       .ToList(),


                                             Options = (from o in q.OptionTables
                                                        select new OptionDTO
                                                        {
                                                            OptionText = o.OptionText
                                                        }).ToList()
                                         }).ToList();





                responseList.Add(response);
            }

            return Task.FromResult(responseList);
        }
      

        void IUserRepository.DeleteTemplate(int id)
        {
            var deleteData = _ef.TemplateDetails.FirstOrDefault(q => q.SurveyId == id);

            _ef.TemplateDetails.Remove((TemplateDetail)deleteData);
            _ef.SaveChanges();
        }
            
        }
}