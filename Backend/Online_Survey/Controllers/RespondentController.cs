using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Online_Survey.Data;
using Online_Survey.DTOs.Respondent;
using Online_Survey.Models;
using System.Collections.Generic;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Online_Survey.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RespondentController : Controller
    {
        private readonly IUserRepository _userRepository;
        IMapper mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RespondentController(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            mapper = new Mapper(new MapperConfiguration(cfg => {
                cfg.CreateMap<RespondentDTO, RespondentDetail>();
                cfg.CreateMap<RecordDTOcs, RespondentRecord>();
                cfg.CreateMap<AnswerDTO, RespondentAnswer>();
            }));
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        [HttpPost("AddRespondent")]
        public int AddRespondent(RespondentDTO respondentDTO)
        {
            RespondentDetail respondentDetail = mapper.Map<RespondentDetail>(respondentDTO);
            _userRepository.AddEntity(respondentDetail);

            if (_userRepository.SaveChange())
            {
                return respondentDetail.Id;
            }

            throw new Exception("Oops! could not add respondent.");
        }

        [HttpPost("AddRecord")]
        public int AddRecord(RecordDTOcs recordDTOcs)
        {
            RespondentRecord respondentRecord = mapper.Map<RespondentRecord>(recordDTOcs);
            _userRepository.AddEntity(respondentRecord);

            if (_userRepository.SaveChange())
            {
                return respondentRecord.Id;
            }

            throw new Exception("Oops! Cannot add details.");
        }

        [HttpPost("AddAnswers")]
        public IActionResult AddAnswers(List<Answer> answers)
        {
            foreach (Answer answer in answers)
            {
                if (answer.OptionId.Count > 0)
                {
                    foreach (int options in answer.OptionId)
                    {
                        AnswerDTO answerDTO = new AnswerDTO()
                        {
                            Id = answer.Id,
                            QuestionId = answer.QuestionId,
                            OptionId = options,
                            AnswerText = answer.AnswerText
                        };

                        RespondentAnswer respondentAnswer = mapper.Map<RespondentAnswer>(answerDTO);
                        _userRepository.AddEntity(respondentAnswer);

                        _userRepository.SaveChange();
                    }
                }
                else
                {
                    AnswerDTO answerDTO = new AnswerDTO()
                    {
                        Id = answer.Id,
                        QuestionId = answer.QuestionId,
                        OptionId = null,
                        AnswerText = answer.AnswerText
                    };

                    RespondentAnswer respondentAnswer = mapper.Map<RespondentAnswer>(answerDTO);
                    _userRepository.AddEntity(respondentAnswer);

                    _userRepository.SaveChange();
                }

            }
            return Ok();
        }


        [HttpGet("CheckDate")]
        public IActionResult CheckDate([FromQuery] int surveyId)
        {
            IQueryable<SurveyTable> surveyTable = _userRepository.GetAllSurveys().Where<SurveyTable>(survey => survey.SurveyId == surveyId);

            DateOnly currentDate = DateOnly.FromDateTime(DateTime.Now.Date);
            TimeOnly currentTime = TimeOnly.FromDateTime(DateTime.Now);

            SurveyTable surveyDetail = surveyTable.FirstOrDefault();

            DateOnly startDate = (DateOnly)surveyDetail.LaunchDate;
            DateOnly endDate = (DateOnly)surveyDetail.EndDate;

            TimeOnly startTime = (TimeOnly)surveyDetail.StartTime;
            TimeOnly endTime = (TimeOnly)surveyDetail.EndTime;

            if(currentDate < startDate || (currentDate == startDate && currentTime < startTime))
            {
                return Ok(1);
            }
            else if(currentDate > endDate || (currentDate == endDate && currentTime > endTime)) {
                return Ok(2);
            }
            

            return Ok(0);
        }

        [HttpGet("Survey")]
        public IActionResult GetSurvey([FromQuery] string surveyorId)
        {
            List<SurveyTable> survey = _userRepository.GetAllSurveys().Where(survey => survey.SurveyorId == surveyorId).ToList<SurveyTable>();
            return Ok(survey);
            
        }
            


        [HttpGet("GetSurveyResponseBySurveyId/{surveyId}")]
        public IActionResult GetSurveyResponseBySurveyId(int surveyId)
        {
            try
            {
                var surveyResponse = _userRepository.GetSurveyResponseBySurveyId(surveyId);

                if (surveyResponse == null)
                {
                    return NotFound($"No survey response found for the survey ID: {surveyId}");
                }
                   

                return Ok(surveyResponse);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing the request: {ex.Message}");
            }

        }

        [HttpGet("CheckAccess")]
        public IActionResult GetSurveyAccess([FromQuery] int surveyId, [FromQuery] string Email)
        {
            int surveyaccess = _userRepository.GetSurveyTables(surveyId);

            if(surveyaccess == 0)
            {
                var flag = _userRepository.Check(Email, surveyId);

                Console.WriteLine(flag);

                if (flag.Count == 0)
                {
                    return Ok(false);
                }

                return Ok(true);
            }

            return Ok(false);
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