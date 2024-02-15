using Microsoft.AspNetCore.Mvc;
using Online_Survey.DTOs;
using Online_Survey.Models;

namespace Online_Survey.Data
{
    public interface IUserRepository
    {
        public bool SaveChange();
        public void AddEntity<T>(T data);
    }
}
