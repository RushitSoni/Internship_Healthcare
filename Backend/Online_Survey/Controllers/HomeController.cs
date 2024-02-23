using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Online_Survey.Data;
using Online_Survey.DTO;
using Online_Survey.DTOs.Survey;
using Online_Survey.Models;
using System;
using System.Linq;

namespace Online_Survey.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class HomeController : Controller
    {
        private readonly IUserRepository _userRepository;
        IMapper mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HomeController(IUserRepository userRepository,IHttpContextAccessor httpContextAccessor)
        {
            mapper = new Mapper(new MapperConfiguration(cfg => {
                cfg.CreateMap<SurveyDTO, SurveyTable>();
                cfg.CreateMap<QuestionDTO, QuestionTable>();
                cfg.CreateMap<OptionDTO, OptionTable>();
            }));
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        [HttpPost("AddQuestion")]
        public int AddQuestion(QuestionDTO questionDTO)
        {
            QuestionTable question = mapper.Map<QuestionTable>(questionDTO);
            _userRepository.AddEntity<QuestionTable>(question);

            if (_userRepository.SaveChange())
            {
                return question.QuestionId;
            }

            throw new Exception("Your Account has not been Created!");
        }

        [HttpPost("CreateSurvey")]
        public int CreateSurvey(SurveyorIdDTO surveyorid)
        {
            DateOnly today = DateOnly.FromDateTime(DateTime.Today);
            TimeOnly time = TimeOnly.FromDateTime(DateTime.Now);
            SurveyDTO surveyDTO = new SurveyDTO()
            {
                SurveyorId = surveyorid.SurveyorId,
                DateCreated = today,
                EndDate = today,
                LaunchDate = today,
                StartTime = time,
                EndTime = 0,
            };

            SurveyTable surveyTable = mapper.Map<SurveyTable>(surveyDTO);
            _userRepository.AddEntity<SurveyTable>(surveyTable);

            if (_userRepository.SaveChange())
            {
                return surveyTable.SurveyId;
            }

            throw new Exception("Oops! Survey cannot be created");
        }

        [HttpPost("AddOptions")]
        public IActionResult AddOptions(OptionDTO[] options)
        {
            foreach (OptionDTO optionDTO in options)
            {
                OptionTable optionTable = mapper.Map<OptionTable>(optionDTO);
                _userRepository.AddEntity<OptionTable>(optionTable);

                _userRepository.SaveChange();
            }

            return Ok();
        }

        [HttpGet("GetQuestionOption")]
        public ActionResult GetQuestionwithOptions([FromQuery] int SurveyId)
        {
            var questionwithoptions = _userRepository.QuestionOption();
  
            var result = questionwithoptions
            .Where(q => q.SurveyId == SurveyId)
            .Select(q => new
            {
                q.QuestionId,
                q.QuestionText,
                q.QuestionOptionType,
                Options = q.OptionTables
                .Where(o => o.QuestionId == q.QuestionId)
                .Select(o => new
                {
                    o.OptionId,
                    o.OptionText,
                    
                }).ToList()
            }).ToList();

            return Ok(result);
        }

        //[HttpGet("GetURL")]
        //public IActionResult GetURL(int surveyid)
        //{
        //    var request = _httpContextAccessor.HttpContext.Request;
        //    var baseUrl = $"{request.Scheme}: {request.Host}";

        //    var surveyurl = $"{baseUrl}/survey/{surveyid}";

        //    return Ok(surveyurl);
        //}
    }
}
