using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Online_Survey.Models;

public partial class InternshipOnlineSurveyContext : DbContext
{
    private IConfiguration _configuration;
    public InternshipOnlineSurveyContext(IConfiguration config)
    {
        _configuration = config;
    }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<OptionTable> OptionTables { get; set; }

    public virtual DbSet<QuestionBankOptionTable> QuestionBankOptionTables { get; set; }

    public virtual DbSet<QuestionBankQuestionTable> QuestionBankQuestionTables { get; set; }

    public virtual DbSet<QuestionTable> QuestionTables { get; set; }

    public virtual DbSet<RespondentAnswer> RespondentAnswers { get; set; }

    public virtual DbSet<RespondentDetail> RespondentDetails { get; set; }

    public virtual DbSet<RespondentRecord> RespondentRecords { get; set; }

    public virtual DbSet<SurveyTable> SurveyTables { get; set; }

    public virtual DbSet<SurveyerDept> SurveyerDepts { get; set; }

    public virtual DbSet<Table> Tables { get; set; }

    public virtual DbSet<TemplateDetail> TemplateDetails { get; set; }

    public virtual DbSet<TemplateOption> TemplateOptions { get; set; }

    public virtual DbSet<TemplateQuestion> TemplateQuestions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.CompanyId).HasName("PK__Company__2D971CAC662AD6BF");

            entity.ToTable("Company");

            entity.Property(e => e.AdminId)
                .IsRequired()
                .HasMaxLength(450);
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.DepartmentId).HasName("PK__Departme__B2079BED3DB2728B");

            entity.ToTable("Department");

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.HasOne(d => d.Company).WithMany(p => p.Departments)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_Department_Company");
        });

        modelBuilder.Entity<OptionTable>(entity =>
        {
            entity.HasKey(e => e.OptionId).HasName("PK__Option_t__F4EACE1BF1662605");

            entity.ToTable("Option_table");

            entity.Property(e => e.OptionId).HasColumnName("option_id");
            entity.Property(e => e.OptionText)
                .IsRequired()
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("option_text");
            entity.Property(e => e.QuestionId).HasColumnName("question_id");
            entity.Property(e => e.SurveyId).HasColumnName("survey_id");

            entity.HasOne(d => d.Question).WithMany(p => p.OptionTables)
                .HasForeignKey(d => d.QuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Option_ta__quest__0BB1B5A5");

            entity.HasOne(d => d.Survey).WithMany(p => p.OptionTables)
                .HasForeignKey(d => d.SurveyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Option_ta__surve__542C7691");
        });

        modelBuilder.Entity<QuestionBankOptionTable>(entity =>
        {
            entity.HasKey(e => e.OptionId).HasName("PK__Question__F4EACE1BAAF789A9");

            entity.ToTable("QuestionBank_Option_table");

            entity.Property(e => e.OptionId).HasColumnName("option_id");
            entity.Property(e => e.OptionText)
                .IsRequired()
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("option_text");
            entity.Property(e => e.QuestionId).HasColumnName("question_id");

            entity.HasOne(d => d.Question).WithMany(p => p.QuestionBankOptionTables)
                .HasForeignKey(d => d.QuestionId)
                .HasConstraintName("FK__QuestionB__quest__2116E6DF");
        });

        modelBuilder.Entity<QuestionBankQuestionTable>(entity =>
        {
            entity.HasKey(e => e.QuestionId).HasName("PK__Question__2EC21549762ED5C1");

            entity.ToTable("QuestionBank_Question_table");

            entity.Property(e => e.QuestionId).HasColumnName("question_id");
            entity.Property(e => e.CompanyId).HasColumnName("company_id");
            entity.Property(e => e.QuestionOptionType)
                .IsRequired()
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("question_option_type");
            entity.Property(e => e.QuestionText)
                .IsRequired()
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("question_text");
            entity.Property(e => e.UserId)
                .IsRequired()
                .HasMaxLength(450)
                .HasColumnName("user_id");

            entity.HasOne(d => d.Company).WithMany(p => p.QuestionBankQuestionTables)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__QuestionB__compa__0EF836A4");
        });

        modelBuilder.Entity<QuestionTable>(entity =>
        {
            entity.HasKey(e => e.QuestionId).HasName("PK__Question__2EC2154938FBC299");

            entity.ToTable("Question_table");

            entity.Property(e => e.QuestionId).HasColumnName("question_id");
            entity.Property(e => e.QuestionOptionType)
                .IsRequired()
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("question_option_type");
            entity.Property(e => e.QuestionText)
                .IsRequired()
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("question_text");
            entity.Property(e => e.SurveyId).HasColumnName("survey_id");

            entity.HasOne(d => d.Survey).WithMany(p => p.QuestionTables)
                .HasForeignKey(d => d.SurveyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Question___surve__53385258");
        });

        modelBuilder.Entity<RespondentAnswer>(entity =>
        {
            entity.HasKey(e => e.Id1).HasName("PK__tmp_ms_x__C49607F54BB01EE1");

            entity.ToTable("Respondent_Answer");

            entity.Property(e => e.AnswerText).HasColumnName("answer_text");
            entity.Property(e => e.OptionId).HasColumnName("Option_id");
            entity.Property(e => e.QuestionId).HasColumnName("Question_id");

            entity.HasOne(d => d.IdNavigation).WithMany(p => p.RespondentAnswers)
                .HasForeignKey(d => d.Id)
                .HasConstraintName("FK__Respondent_A__Id__06ED0088");

            entity.HasOne(d => d.Option).WithMany(p => p.RespondentAnswers)
                .HasForeignKey(d => d.OptionId)
                .HasConstraintName("FK__Responden__Optio__69C6B1F5");

            entity.HasOne(d => d.Question).WithMany(p => p.RespondentAnswers)
                .HasForeignKey(d => d.QuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Responden__Quest__68D28DBC");
        });

        modelBuilder.Entity<RespondentDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Responde__3214EC07D5D5904C");

            entity.ToTable("Respondent_Details");

            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(40);
        });

        modelBuilder.Entity<RespondentRecord>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Responde__3214EC07EB3BA6FE");

            entity.ToTable("Respondent_Record");

            entity.Property(e => e.RespondentId).HasColumnName("Respondent_id");
            entity.Property(e => e.SurveyId).HasColumnName("Survey_id");

            entity.HasOne(d => d.Respondent).WithMany(p => p.RespondentRecords)
                .HasForeignKey(d => d.RespondentId)
                .HasConstraintName("FK__Responden__Respo__76818E95");
        });

        modelBuilder.Entity<SurveyTable>(entity =>
        {
            entity.HasKey(e => e.SurveyId).HasName("PK__tmp_ms_x__6C05F07CAC17ED02");

            entity.ToTable("Survey_table");

            entity.Property(e => e.SurveyId).HasColumnName("Survey_id");
            entity.Property(e => e.Count).HasColumnName("count");
            entity.Property(e => e.DateCreated).HasColumnName("date_created");
            entity.Property(e => e.DeptId).HasColumnName("deptId");
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.EndTime).HasColumnName("end_time");
            entity.Property(e => e.LaunchDate).HasColumnName("launch_date");
            entity.Property(e => e.StartTime).HasColumnName("start_time");
            entity.Property(e => e.SurveyName)
                .IsRequired()
                .HasMaxLength(30)
                .HasColumnName("Survey_name");
            entity.Property(e => e.SurveyorId)
                .IsRequired()
                .HasMaxLength(450)
                .HasColumnName("Surveyor_id");

            entity.HasOne(d => d.Dept).WithMany(p => p.SurveyTables)
                .HasForeignKey(d => d.DeptId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Survey_ta__deptI__5614BF03");
        });

        modelBuilder.Entity<SurveyerDept>(entity =>
        {
            entity.ToTable("Surveyer_Dept");

            entity.Property(e => e.SurveyerDeptId).HasColumnName("Surveyer_DeptId");
            entity.Property(e => e.UserId)
                .IsRequired()
                .HasMaxLength(450);
            entity.Property(e => e.UserName)
                .IsRequired()
                .HasMaxLength(256);

            entity.HasOne(d => d.Company).WithMany(p => p.SurveyerDepts)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Surveyer_Dept_CompanyId");

            entity.HasOne(d => d.Dept).WithMany(p => p.SurveyerDepts)
                .HasForeignKey(d => d.DeptId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Surveyer_Dept_DeptId");
        });

        modelBuilder.Entity<Table>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Table__3214EC07C83EBAD5");

            entity.ToTable("Table");

            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<TemplateDetail>(entity =>
        {
            entity.HasKey(e => e.SurveyId).HasName("PK__tmp_ms_x__9DC31A07B589E68D");

            entity.ToTable("Template_Details");

            entity.Property(e => e.SurveyId).HasColumnName("survey_id");
            entity.Property(e => e.SurveyName)
                .IsRequired()
                .HasMaxLength(20)
                .HasColumnName("survey_name");
            entity.Property(e => e.SurveyorId)
                .IsRequired()
                .HasMaxLength(450)
                .HasColumnName("surveyor_id");
        });

        modelBuilder.Entity<TemplateOption>(entity =>
        {
            entity.HasKey(e => e.OptionId).HasName("PK__Template__F4EACE1B4D36DA9C");

            entity.ToTable("Template_Options");

            entity.Property(e => e.OptionId)
                .ValueGeneratedNever()
                .HasColumnName("option_id");
            entity.Property(e => e.NextQuestion).HasColumnName("next_question");
            entity.Property(e => e.OptionText)
                .IsRequired()
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("option_text");
            entity.Property(e => e.QuestionId).HasColumnName("question_id");

            entity.HasOne(d => d.Question).WithMany(p => p.TemplateOptions)
                .HasForeignKey(d => d.QuestionId)
                .HasConstraintName("FK__Template___quest__09C96D33");
        });

        modelBuilder.Entity<TemplateQuestion>(entity =>
        {
            entity.HasKey(e => e.QuestionId).HasName("PK__Template__2EC21549B389D668");

            entity.ToTable("Template_Questions");

            entity.Property(e => e.QuestionId)
                .ValueGeneratedNever()
                .HasColumnName("question_id");
            entity.Property(e => e.OptionType)
                .IsRequired()
                .HasMaxLength(30)
                .HasColumnName("option_type");
            entity.Property(e => e.QuestionText)
                .IsRequired()
                .HasMaxLength(256)
                .HasColumnName("question_text");
            entity.Property(e => e.SurveyId).HasColumnName("survey_id");

            entity.HasOne(d => d.Survey).WithMany(p => p.TemplateQuestions)
                .HasForeignKey(d => d.SurveyId)
                .HasConstraintName("FK__Template___surve__08D548FA");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
