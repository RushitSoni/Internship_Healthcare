using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Online_Survey.Data;
using Online_Survey.DTO;
using Online_Survey.DTOs.Survey;
using Online_Survey.Models;
using Online_Survey.Pococlass;
using Online_Survey.PocoClass;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Online_Survey.Controllers
{
    [Authorize]
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
        public int AddQuestion(QuestionDTO question_option)
        {
            //foreach(Question_Option questionoption in question_option)
            //{
            //    QuestionDTO questionDTO = new QuestionDTO()
            //    {
            //        QuestionText = questionoption.questionText,
            //        QuestionOptionType = ""+questionoption.questionOptionType,
            //        SurveyId = questionoption.surveyId
            //    };

            //    QuestionTable question = mapper.Map<QuestionTable>(questionDTO);
            //    _userRepository.AddEntity<QuestionTable>(question);
            //    _userRepository.SaveChange();

            //    int questionid = question.QuestionId;

            //    foreach(OptionList option in questionoption.options)
            //    {
            //        OptionDTO optionDTO = new OptionDTO()
            //        {
            //            OptionText = option.optionText,
            //            QuestionId = questionid,
            //            SurveyId = option.surveyId
            //        };

            //        OptionTable optionTable = mapper.Map<OptionTable>(optionDTO);
            //        _userRepository.AddEntity<OptionTable>(optionTable);

            //        _userRepository.SaveChange();
            //    }

            //}

            QuestionTable question = mapper.Map<QuestionTable>(question_option);
            _userRepository.AddEntity<QuestionTable>(question);
            if (_userRepository.SaveChange())
            {
                return question.QuestionId;
            }

            throw new Exception("Your Account has not been Created!");
        }

        [HttpPost("QuestionOption")]
        public IActionResult QuestionOption(Question_Option[] question_option)
        {
            List<OptionList> options = new List<OptionList>();

            foreach (Question_Option questionoption in question_option)
            {
                QuestionDTO questionDTO = new QuestionDTO()
                {
                    QuestionText = questionoption.questionText,
                    QuestionOptionType = ""+questionoption.questionOptionType,
                    SurveyId = questionoption.surveyId
                };

                    QuestionTable question = mapper.Map<QuestionTable>(questionDTO);
                    _userRepository.AddEntity<QuestionTable>(question);
                    _userRepository.SaveChange();

                    int questionid = question.QuestionId;

                    //options.AddRange(questionoption.options);

                    foreach(OptionList option in questionoption.options)
                    {
                        OptionDTO optionDTO = new OptionDTO()
                        {
                            OptionText = option.optionText,
                            QuestionId = questionid,
                            SurveyId = option.surveyId
                        };

                        OptionTable optionTable = mapper.Map<OptionTable>(optionDTO);
                        _userRepository.AddEntity<OptionTable>(optionTable);

                        _userRepository.SaveChange();
                    }

                }

                return Ok();

        }

        [HttpPost("CreateTemplate")]
        public IActionResult createTemplate(TemplateDetails templateDetails)
        {
            TemplateDetail templateDetail = new TemplateDetail(){
                SurveyorId = templateDetails.surveyorId,
                SurveyName = templateDetails.surveyname,
            };

            _userRepository.AddEntity(templateDetail);

            _userRepository.SaveChange();

            int surveyId = templateDetail.SurveyId;

            foreach(TemplateQuestions question in templateDetails.questions)
            {
                TemplateQuestion templateQuestion = new TemplateQuestion()
                {
                    QuestionId = question.questionId,
                    QuestionText = question.questionText,
                    SurveyId = surveyId,
                    OptionType = ""+question.questionOptionType
                };

                _userRepository.AddEntity(templateQuestion);
                if(_userRepository.SaveChange())
                {
                    foreach (TemplateOptions options in question.options)
                    {
                        TemplateOption optionsOption = new TemplateOption()
                        {
                            OptionId = options.optionId,
                            OptionText = options.optionText,
                            QuestionId = question.questionId,
                            NextQuestion = 0
                        };

                        _userRepository.AddEntity(optionsOption);
                        _userRepository.SaveChange();
                    }
                }                
            }

            return Ok();
        }

        [HttpPost("CreateSurvey")]
        public int CreateSurvey(SurveyorDTO surveyorid)
        {
            DateOnly today = DateOnly.FromDateTime(DateTime.Today);
            TimeOnly time = TimeOnly.FromDateTime(DateTime.Now);
            
            SurveyDTO surveyDTO = new SurveyDTO()
            {
                SurveyorId = surveyorid.SurveyorId,
                Description = surveyorid.Description,
                DateCreated = today,
                StartTime = time,
                LaunchDate = DateOnly.FromDateTime(DateTime.Parse(surveyorid.StartDate)),
                EndDate = DateOnly.FromDateTime(DateTime.Parse(surveyorid.EndDate)),
                DeptId = surveyorid.DeptId
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
    }
}
