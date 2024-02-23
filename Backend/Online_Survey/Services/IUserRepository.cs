using Microsoft.AspNetCore.Mvc;
using Online_Survey.DTOs;
using Online_Survey.Models;
using Online_Survey.PocoClass;
using System.Linq;

namespace Online_Survey.Data
{
    public interface IUserRepository
    {
        public bool SaveChange();
        public void AddEntity<T>(T data);

        public IQueryable<QuestionTable> QuestionOption();
    }
}
