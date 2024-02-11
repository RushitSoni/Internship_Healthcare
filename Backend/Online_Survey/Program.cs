using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Online_Survey.Areas.Identity.Data;
using Online_Survey.Data;
var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("Online_SurveyContextConnection") ?? throw new InvalidOperationException("Connection string 'Online_SurveyContextConnection' not found.");

builder.Services.AddDbContext<Online_SurveyContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddDefaultIdentity<Online_SurveyUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<Online_SurveyContext>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
