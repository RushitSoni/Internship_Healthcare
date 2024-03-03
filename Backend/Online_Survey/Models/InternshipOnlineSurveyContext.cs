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

    public virtual DbSet<QuestionTable> QuestionTables { get; set; }

    public virtual DbSet<RespondentAnswer> RespondentAnswers { get; set; }

    public virtual DbSet<RespondentDetail> RespondentDetails { get; set; }

    public virtual DbSet<RespondentRecord> RespondentRecords { get; set; }

    public virtual DbSet<SurveyTable> SurveyTables { get; set; }

    public virtual DbSet<SurveyerDept> SurveyerDepts { get; set; }

    public virtual DbSet<Table> Tables { get; set; }

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
                .OnDelete(DeleteBehavior.Cascade)
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
                .HasConstraintName("FK__Option_ta__quest__160F4887");

            entity.HasOne(d => d.Survey).WithMany(p => p.OptionTables)
                .HasForeignKey(d => d.SurveyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Option_ta__surve__09746778");
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
                .HasConstraintName("FK__Question___surve__0880433F");
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
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Respondent_A__Id__67DE6983");

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
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(40);
            entity.Property(e => e.PhoneNumber)
                .IsRequired()
                .HasMaxLength(40)
                .HasColumnName("Phone_number");
        });

        modelBuilder.Entity<RespondentRecord>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Responde__3214EC07EB3BA6FE");

            entity.ToTable("Respondent_Record");

            entity.Property(e => e.RespondentId).HasColumnName("Respondent_id");
            entity.Property(e => e.SurveyId).HasColumnName("Survey_id");
        });

        modelBuilder.Entity<SurveyTable>(entity =>
        {
            entity.HasKey(e => e.SurveyId).HasName("PK__tmp_ms_x__6C05F07C8F39CE93");

            entity.ToTable("Survey_table");

            entity.Property(e => e.SurveyId).HasColumnName("Survey_id");
            entity.Property(e => e.DateCreated).HasColumnName("date_created");
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.EndTime).HasColumnName("end_time");
            entity.Property(e => e.LaunchDate).HasColumnName("launch_date");
            entity.Property(e => e.StartTime).HasColumnName("start_time");
            entity.Property(e => e.SurveyorId)
                .IsRequired()
                .HasMaxLength(450)
                .HasColumnName("Surveyor_id");
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
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Surveyer_Dept_DeptId");
        });

        modelBuilder.Entity<Table>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Table__3214EC07C83EBAD5");

            entity.ToTable("Table");

            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
