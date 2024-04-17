using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OfficeOpenXml;
using Online_Survey.Areas.Identity.Data;
using Online_Survey.Data;
using Online_Survey.Models;
using Online_Survey.Services;
using System.Collections.Generic;
using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;

namespace Online_Survey.Controllers
{
    public class ActivityReportData
    {
        public string SurveyorId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string Action { get; set; }

        public string Email { get; set; }
        public string Name { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {

        private readonly Online_SurveyContext context;
        private readonly InternshipOnlineSurveyContext _context2;

        private readonly IWebHostEnvironment _hostingEnvironment;

        public ReportController(Online_SurveyContext context, InternshipOnlineSurveyContext context2, IWebHostEnvironment hostingEnvironment)
        {
           
            this.context = context;
            this._context2 = context2;
            this._hostingEnvironment = hostingEnvironment;
        }


        [HttpGet("generate/user")]
        public IActionResult GenerateReport()
        {
            // Fetch data from the user table
            var users = context.Users.ToList();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            // Generate Excel file
            using (ExcelPackage package = new ExcelPackage())
            {


               

                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Users");

                // Add header row
                worksheet.Cells[1, 1].Value = "First Name";
                worksheet.Cells[1, 2].Value = "Last Name";
                worksheet.Cells[1, 3].Value = "Date Created";
                worksheet.Cells[1, 4].Value = "Email";
                worksheet.Cells[1, 5].Value = "Role";
                worksheet.Cells[1, 6].Value = "Provider";


                // Add other columns as needed

                // Add data rows
                int row = 2;
                foreach (var user in users)
                {
                    worksheet.Cells[row, 1].Value = user.FirstName;
                    worksheet.Cells[row, 2].Value = user.LastName;
                    worksheet.Cells[row, 3].Value = user.DateCreated.ToString("dd-MM-yyyy");
                    worksheet.Cells[row, 4].Value = user.Email;
                    worksheet.Cells[row, 5].Value = user.Role;
                    worksheet.Cells[row, 6].Value = user.Provider;
                   


                    row++;
                }

                // Save the Excel file to a MemoryStream
                MemoryStream stream = new MemoryStream();
                package.SaveAs(stream);
                stream.Position = 0;

                // Return the Excel file as a response
                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Users.xlsx");
            }
        }

        [HttpGet("generate/workspace")]
        public IActionResult GenerateworkspaceReport()
        {
            var surveyers = _context2.SurveyerDepts.ToList();
            var companies = _context2.Companies.ToList();
            var departments = _context2.Departments.ToList();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (ExcelPackage package = new ExcelPackage())
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Surveyer Data");

                // Add header row
                
                worksheet.Cells[1, 1].Value = "Company Name";
                worksheet.Cells[1, 2].Value = "Department Name";
                worksheet.Cells[1, 3].Value = "Surveyer";

                // Add data rows
                int row = 2;
                foreach (var surveyer in surveyers)
                {
                    var company = companies.FirstOrDefault(c => c.CompanyId == surveyer.CompanyId);
                    var department = departments.FirstOrDefault(d => d.DepartmentId == surveyer.DeptId);
                    var user = context.Users.FirstOrDefault(u => u.Id == surveyer.UserId);

                    
                    worksheet.Cells[row, 1].Value = company?.Name;
                    worksheet.Cells[row, 2].Value = department?.Name;
                    worksheet.Cells[row, 3].Value = user.Email;

                    row++;
                }

                MemoryStream stream = new MemoryStream();
                package.SaveAs(stream);
                stream.Position = 0;

                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Workspace.xlsx");
            }
        }

        [HttpGet("generate/survey")]
        public IActionResult GenerateSurveyReport()
        {
            var surveys = _context2.SurveyTables.ToList();
            var departments = _context2.Departments.ToList();
            var companies=_context2.Companies.ToList();


            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (ExcelPackage package = new ExcelPackage())
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Survey Data");

                // Add header row
                worksheet.Cells[1, 1].Value = "Survey Name";
                worksheet.Cells[1, 2].Value = "Description";
                worksheet.Cells[1, 3].Value = "Surveyor";
                
                worksheet.Cells[1, 4].Value = "Date Created";
                worksheet.Cells[1, 5].Value = "Launch Date";
                worksheet.Cells[1, 6].Value = "End Date";
                worksheet.Cells[1, 7].Value = "Start Time";
                worksheet.Cells[1, 8].Value = "End Time";

                worksheet.Cells[1, 9].Value = "Department Name";
                worksheet.Cells[1, 10].Value = "Company Name";
                worksheet.Cells[1, 11].Value = "Response Allowed";

                // Add data rows
                int row = 2;
                foreach (var survey in surveys)
                {
                    var department = departments.FirstOrDefault(d => d.DepartmentId == survey.DeptId);
                    var user = context.Users.FirstOrDefault(u => u.Id == survey.SurveyorId);
                    var company= department != null ? companies.FirstOrDefault(c => c.CompanyId == department.CompanyId) : null;

                    worksheet.Cells[row, 1].Value = survey.SurveyName;
                    worksheet.Cells[row, 2].Value = survey.Description;
                    worksheet.Cells[row, 3].Value = user.Email;

                    worksheet.Cells[row, 4].Value = survey.DateCreated.ToString("dd-MM-yyyy");
                    worksheet.Cells[row, 5].Value = survey.LaunchDate;
                    worksheet.Cells[row, 6].Value = survey.EndDate;
                    worksheet.Cells[row, 7].Value = survey.StartTime;
                    worksheet.Cells[row, 8].Value = survey.EndTime;

                    worksheet.Cells[row, 9].Value = department != null ? department.Name : "No Department";
                    worksheet.Cells[row, 10].Value = company != null ? company.Name : "No Compnay";
                    worksheet.Cells[row, 11].Value = survey.Count == 0 ? "single response" : "multiple responses";
                    

                    row++;
                }

                MemoryStream stream = new MemoryStream();
                package.SaveAs(stream);
                stream.Position = 0;

                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Surveys.xlsx");
            }
        }

        [HttpGet("generate/respondent")]
        public IActionResult GenerateRespondentRecordReport()
        {
            var respondentRecords = _context2.RespondentRecords.ToList();
            var respondentDetails = _context2.RespondentDetails.ToList();
            var surveys = _context2.SurveyTables.ToList();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (ExcelPackage package = new ExcelPackage())
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Respondent Record Data");

                // Add header row
               
                worksheet.Cells[1, 1].Value = "Respondent";
                worksheet.Cells[1, 2].Value = "Survey Name";

                // Add data rows
                int row = 2;
                foreach (var record in respondentRecords)
                {
                    var respondentDetail = respondentDetails.FirstOrDefault(r => r.Id == record.RespondentId);
                    var survey = surveys.FirstOrDefault(s => s.SurveyId == record.SurveyId);

                   
                    worksheet.Cells[row, 1].Value = respondentDetail.Email;
                    worksheet.Cells[row, 2].Value = survey.SurveyName ;

                    row++;
                }

                MemoryStream stream = new MemoryStream();
                package.SaveAs(stream);
                stream.Position = 0;

                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Respondent.xlsx");
            }
        }

        [HttpGet("generate/activity")]
        public IActionResult GenerateActivityReport()
        {
            
           

            string rootPath = _hostingEnvironment.ContentRootPath;

            // Navigate to the "Audit" folder from the root path
            string auditFolderPath = Path.Combine(rootPath, "Audit");

            // Construct the file path to the JSON file
            string jsonFilePath = Path.Combine(auditFolderPath, "audit.json");

            List<ActivityReportData> activityData;

            try
            {
                string jsonData = System.IO.File.ReadAllText(jsonFilePath);
                activityData = JsonConvert.DeserializeObject<List<ActivityReportData>>(jsonData);
            }
            catch (Exception ex)
            {
                // Handle file read or deserialization errors
                return StatusCode(500, $"Error reading JSON data: {ex.Message}");
            }

            // Replace Surveyor ID with email using user data
            foreach (var activity in activityData)
            {
                var user = context.Users.FirstOrDefault(u => u.Id == activity.SurveyorId);
                activity.Email =user.Email;
                activity.Name = $"{user.FirstName} {user.LastName}"; 
            }

            // Generate Excel report based on activity data
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (ExcelPackage package = new ExcelPackage())
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Activity Report");

                // Add header row
                worksheet.Cells[1, 1].Value = "User Name";
                worksheet.Cells[1, 2].Value = "Email";
                worksheet.Cells[1, 3].Value = "Date";
                worksheet.Cells[1, 4].Value = "Time";
                worksheet.Cells[1, 5].Value = "Action";

                // Add data rows
                int row = 2;
                foreach (var activity in activityData)
                {
                    worksheet.Cells[row, 1].Value = activity.Name;
                    worksheet.Cells[row, 2].Value = activity.Email;
                    worksheet.Cells[row, 3].Value = activity.Date.ToString("dd-MM-yyyy");
                    worksheet.Cells[row, 4].Value = activity.Time.ToString(@"hh\:mm\:ss");
                    worksheet.Cells[row, 5].Value = activity.Action;

                    row++;
                }

                // Save the Excel file to a MemoryStream
                MemoryStream stream = new MemoryStream();
                package.SaveAs(stream);
                stream.Position = 0;

                // Return the Excel file as a response
                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "AuditReport.xlsx");
            }
        }

    }





}
