using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Online_Survey.DTOs.Company;
using Online_Survey.Services;
using System.Threading.Tasks;

namespace Online_Survey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Surveyer_DeptController : ControllerBase
    {

        private readonly ISurveyer_DeptServices service;
        public Surveyer_DeptController(ISurveyer_DeptServices services)
        {

            this.service = services;

        }

        [HttpGet("Get")]
        public async Task<IActionResult> Get()
        {
            var data = await this.service.Getall();
            if (data == null)
            {
                return NotFound();

            }
            return Ok(data);
        }



        [HttpGet("GetByCode")]
        public async Task<IActionResult> GetByCode(int id)
        {
            var data = await this.service.GetbyCode(id);
            if (data == null)
            {
                return NotFound();

            }
            return Ok(data);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(Surveyer_DeptDto _data)
        {
            var data = await this.service.Create(_data);
            return Ok(data);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Update(Surveyer_DeptDto _data, int id)
        {
            var data = await this.service.Update(_data, id);
            return Ok(data);
        }

        [HttpDelete("Remove/{id}")]
        public async Task<IActionResult> Remove(int id)
        {
            var data = await this.service.Remove(id);
            return Ok(data);
        }
    }
}

