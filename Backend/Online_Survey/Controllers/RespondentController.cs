using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Online_Survey.Data;
using Online_Survey.DTOs.Respondent;
using Online_Survey.Models;
using System.Collections.Generic;
using System;
using System.Linq;

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
    }
}
