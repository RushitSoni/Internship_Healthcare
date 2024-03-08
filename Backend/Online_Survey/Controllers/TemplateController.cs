using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Online_Survey.Data;
using Online_Survey.Models;
using System.Linq;

namespace Online_Survey.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TemplateController : Controller
    {
        private readonly IUserRepository _userRepository;
        IMapper mapper;
        TemplateController(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor) {
            _userRepository = userRepository;
        }

        [HttpGet("GetTemplate")]
        public IQueryable<TemplateDetail> GetTemplate([FromQuery] int id)
        {
            IQueryable<TemplateDetail> data = _userRepository.Template(id);
            return data;
        }
    }
}
