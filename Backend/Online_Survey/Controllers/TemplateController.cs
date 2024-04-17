using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Online_Survey.Data;
using Online_Survey.Models;
using System;
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
        public TemplateController(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
        }

        [HttpGet("GetTemplate")]
        public IActionResult GetTemplate([FromQuery] string id)
        {
            var data = _userRepository.Template(id).ToList();
            return Ok(data);
        }

        
        [HttpGet("TemplateData")]
        public ActionResult GetTData([FromQuery] int templateId)
        {
            var templateData = _userRepository.TemplateData();

            var result = templateData
            .Where(q => q.SurveyId == templateId)
            .Select(q => new
            {
                q.QuestionText,
                q.OptionType,
                Options = q.TemplateOptions
                .Where(o => o.QuestionId == q.QuestionId)
                .Select(o => new
                {
                   o.OptionText,
                }).ToList()
            }).ToList();


            return Ok(result);
        }

        [HttpDelete("DeleteTemplate/{id}")]
        public IActionResult DeleteTemplate(int id) 
        {
            _userRepository.DeleteTemplate(id);
            return Ok();
        }
    }
}
