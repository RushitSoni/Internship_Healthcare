using Microsoft.AspNetCore.Mvc;
using Online_Survey.DTOs;
using Online_Survey.DTOs.Company;
using Online_Survey.DTOs.Respondent;
using Online_Survey.Models;
using Online_Survey.PocoClass;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Online_Survey.Data
{
    public interface IUserRepository
    {
        public bool SaveChange();
        public void AddEntity<T>(T data);
        public IQueryable<QuestionTable> QuestionOption();
        public IQueryable<TemplateDetail> Template(string id);
        public IQueryable<SurveyTable> GetAllSurveys();
        public IQueryable<TemplateQuestion> TemplateData();
        public void DeleteTemplate(int id);
        Task<List<ResponseViaSurveyId>> GetSurveyResponseBySurveyId(int surveyId);

    }
}