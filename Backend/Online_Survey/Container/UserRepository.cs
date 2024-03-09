using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Online_Survey.DTOs;
using Online_Survey.Models;
using Online_Survey.Pococlass;
using Online_Survey.PocoClass;
using System.Linq;

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
            return _ef.TemplateDetails;
        }


        IQueryable<SurveyTable> IUserRepository.GetAllSurveys()
        {
            return _ef.SurveyTables;
        }
    }
}
