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

   

    //public InternshipOnlineSurveyContext(DbContextOptions<InternshipOnlineSurveyContext> options)
    //    : base(options)
    //{
    //}

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<OptionTable> OptionTables { get; set; }

    public virtual DbSet<QuestionTable> QuestionTables { get; set; }

    public virtual DbSet<SurveyTable> SurveyTables { get; set; }

    public virtual DbSet<SurveyerDept> SurveyerDepts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
         => optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.CompanyId).HasName("PK__Company__2D971CACA30DF15B");

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
            entity.HasKey(e => e.DepartmentId).HasName("PK__Departme__B2079BED11F3BEEA");

            entity.ToTable("Department");

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.HasOne(d => d.Company).WithMany(p => p.Departments)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Department_Company");
        });

        modelBuilder.Entity<OptionTable>(entity =>
        {
            entity.HasKey(e => e.OptionId).HasName("PK__Option_t__F4EACE1B4E432151");

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
                .HasConstraintName("FK__Option_ta__quest__2EDAF651");

            entity.HasOne(d => d.Survey).WithMany(p => p.OptionTables)
                .HasForeignKey(d => d.SurveyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Option_ta__surve__2FCF1A8A");
        });

        modelBuilder.Entity<QuestionTable>(entity =>
        {
            entity.HasKey(e => e.QuestionId).HasName("PK__Question__2EC21549FF6E9401");

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
                .HasConstraintName("FK__Question___surve__2BFE89A6");
        });

        modelBuilder.Entity<SurveyTable>(entity =>
        {
            entity.HasKey(e => e.SurveyId).HasName("PK__Survey_t__6C05F07CD91E0574");

            entity.ToTable("Survey_table");

            entity.Property(e => e.SurveyId).HasColumnName("Survey_id");
            entity.Property(e => e.DateCreated).HasColumnName("date_created");
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
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Surveyer_Dept_DeptId");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
