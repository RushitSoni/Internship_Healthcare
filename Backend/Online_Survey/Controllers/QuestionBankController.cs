using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Online_Survey.DTOs.Company;
using Online_Survey.DTOs.QuestionBank;
using Online_Survey.Helper;
using Online_Survey.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Online_Survey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionBankController : ControllerBase
    {

        private readonly IQuestionBankQuestionServices questionService;
        private readonly IQuestionBankOptionServices optionService;
        public QuestionBankController(IQuestionBankQuestionServices services, IQuestionBankOptionServices optionService)
        {

            this.questionService = services;
            this.optionService = optionService;
        }

        [HttpGet("GetQuestion")]
        public async Task<IActionResult> GetQuestion()
        {
            var data = await this.questionService.Getall();
            if (data == null)
            {
                return NotFound();

            }
            return Ok(data);
        }



        [HttpGet("GetQuestionByCode")]
        public async Task<IActionResult> GetQuestionByCode(int id)
        {
            var data = await this.questionService.GetbyCode(id);
            if (data == null)
            {
                return NotFound();

            }
            return Ok(data);
        }

        [HttpPost("CreateQuestion")]
        public async Task<IActionResult> CreateQuestion(QuestionBank_QuestionDto _data)
        {
            var data = await this.questionService.Create(_data);
            return Ok(data);
        }

        [HttpPut("UpdateQuestion/{id}")]
        public async Task<IActionResult> UpdateQuestion(QuestionBank_QuestionDto _data, int id)
        {
            var data = await this.questionService.Update(_data, id);
            return Ok(data);
        }

        [HttpDelete("RemoveQuestion/{id}")]
        public async Task<IActionResult> RemoveQuestion(int id)
        {
            var data = await this.questionService.Remove(id);
            return Ok(data);
        }


        ///options


        [HttpPost("CreateOptions")]
        public async Task<IActionResult> CreateOptions(List<QuestionBank_OptionDto> options)
        {
            var responses = new List<APIResponse>();

            foreach (var option in options)
            {
                var response = await this.optionService.Create(option);

                if (response.ResponseCode == 201)
                {
                    responses.Add(response);
                }
                else
                {
                    // If there's an error in creating any option, return the error response immediately
                    return StatusCode(400, response);
                }
            }

            return Ok(responses);
        }

        [HttpPost("CreateSingleOption")]
        public async Task<IActionResult> CreateSingleOption(QuestionBank_OptionDto option)
        {
            var response = await this.optionService.Create(option);

            if (response.ResponseCode == 201)
            {
                return Ok(response);
            }
            else
            {
                return StatusCode(400, response);
            }
        }


        [HttpGet("GetOption")]
        public async Task<IActionResult> GetOption()
        {
            var data = await this.optionService.Getall();
            if (data == null)
            {
                return NotFound();

            }
            return Ok(data);
        }


        [HttpGet("GetOptionByCode")]
        public async Task<IActionResult> GetOptionByCode(int id)
        {
            var data = await this.optionService.GetbyCode(id);
            if (data == null)
            {
                return NotFound();

            }
            return Ok(data);
        }



        [HttpPut("UpdateOption/{id}")]
        public async Task<IActionResult> UpdateOption(QuestionBank_OptionDto _data, int id)
        {
            var data = await this.optionService.Update(_data, id);
            return Ok(data);
        }

        [HttpDelete("RemoveOption/{id}")]
        public async Task<IActionResult> RemoveOption(int id)
        {
            var data = await this.optionService.Remove(id);
            return Ok(data);
        }


    }

}
