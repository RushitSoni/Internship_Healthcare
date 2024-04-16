using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace Online_Survey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelpController : ControllerBase
    {
        private readonly string _uploadDirectory = "uploads"; 

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Invalid file");

            // Ensure the directory exists
            Directory.CreateDirectory(_uploadDirectory);

            // Generate a unique file name
            var fileName = Path.Combine(_uploadDirectory, "Help.pdf");

            // Save the file to the server
            using (var stream = new FileStream(fileName, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { fileName });
        }

        [HttpGet("download/{fileName}")]
        public IActionResult Download(string fileName)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), _uploadDirectory, fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound();

            // Return the file with correct content type
            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File(fileBytes, "application/pdf", fileName);
        }


    }

}
