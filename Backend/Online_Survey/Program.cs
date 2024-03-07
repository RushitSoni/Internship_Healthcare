using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Online_Survey.Areas.Identity.Data;
using Online_Survey.Container;
using Online_Survey.Data;
using Online_Survey.Helper;
using Online_Survey.Models;
using Online_Survey.Services;
using System;
using System.Linq;
using System.Text;

//Server=(localdb)\\mssqllocaldb; Database=Internship_Online_Survey; Trusted_Connection=True; TrustServerCertificate=true;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddTransient<ICompanyServices, CompanyServices>();
builder.Services.AddTransient<IDepartmentServices,DepartmentServices>();
builder.Services.AddTransient<ISurveyer_DeptServices, Surveyer_DeptServices>(); 
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddTransient<IQuestionBankQuestionServices, QuestionBankQuestionServices>();
builder.Services.AddTransient<IQuestionBankOptionServices, QuestionBankOptionServices>();


//Connection
var connectionString = builder.Configuration.GetConnectionString("Online_SurveyContextConnection") ?? throw new InvalidOperationException("Connection string 'Online_SurveyContextConnection' not found.");
builder.Services.AddDbContext<InternshipOnlineSurveyContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDbContext<Online_SurveyContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDefaultIdentity<Online_SurveyUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<Online_SurveyContext>();



//Automapper
var automapper = new MapperConfiguration(item => item.AddProfile(new AutoMapperHelper()));
IMapper mapper = automapper.CreateMapper();
builder.Services.AddSingleton(mapper);

//JWT Service
builder.Services.AddScoped<JWTServices>();
builder.Services.AddScoped<EmailService>();

//Defining Our IdentityCore Services

builder.Services.AddIdentityCore<Online_SurveyUser>(options =>
{
    //password requirements
    options.Password.RequiredLength = 6;
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;

    //email confirmation
    options.SignIn.RequireConfirmedEmail = true;
})
    .AddRoles<IdentityRole>()
    .AddRoleManager<RoleManager<IdentityRole>>()
    .AddEntityFrameworkStores<Online_SurveyContext>()
    .AddSignInManager<SignInManager<Online_SurveyUser>>()
    .AddUserManager<UserManager<Online_SurveyUser>>()
    .AddDefaultTokenProviders();

//Authentication  Service using JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"])),
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidateIssuer = true,
            //angular side
            ValidateAudience = false


        };

    });
//cors

builder.Services.AddCors();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = actionContext =>
    {
        var errors = actionContext.ModelState
        .Where(x => x.Value.Errors.Count > 0)
        .SelectMany(x => x.Value.Errors)
        .Select(x => x.ErrorMessage).ToArray();

        var toReturn = new
        {
            Errors = errors
        };

        return new BadRequestObjectResult(toReturn);
    };
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

//cors
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins(builder.Configuration["JWT:ClientUrl"]);
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//adding UserAuthentication into our pipeline and this should not come befor UserAuthentication
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
