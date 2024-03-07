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

    public virtual DbSet<SurveyTable> SurveyTables { get; set; }

    public virtual DbSet<SurveyerDept> SurveyerDepts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
<<<<<<< HEAD
        => optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=Internship_Online_Survey;Trusted_Connection=True;");
=======
    => optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
>>>>>>> 9b85e261289591d56333691047f59cea2a3dfd26

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

            entity.HasIndex(e => e.CompanyId, "IX_Department_CompanyId");

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.HasOne(d => d.Company).WithMany(p => p.Departments)
                .HasForeignKey(d => d.CompanyId)
<<<<<<< HEAD
=======
                .OnDelete(DeleteBehavior.ClientSetNull)
>>>>>>> 9b85e261289591d56333691047f59cea2a3dfd26
                .HasConstraintName("FK_Department_Company");
        });

        modelBuilder.Entity<OptionTable>(entity =>
        {
            entity.HasKey(e => e.OptionId).HasName("PK__Option_t__F4EACE1BF1662605");

            entity.ToTable("Option_table");

            entity.HasIndex(e => e.QuestionId, "IX_Option_table_question_id");

            entity.HasIndex(e => e.SurveyId, "IX_Option_table_survey_id");

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

        modelBuilder.Entity<QuestionBankOptionTable>(entity =>
        {
<<<<<<< HEAD
            entity.HasKey(e => e.OptionId).HasName("PK__Question__F4EACE1B90A54BC3");
=======
            entity.HasKey(e => e.OptionId).HasName("PK__Question__F4EACE1BAAF789A9");
>>>>>>> 9b85e261289591d56333691047f59cea2a3dfd26

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
<<<<<<< HEAD
                .HasConstraintName("FK__QuestionB__quest__3B40CD36");
=======
                .HasConstraintName("FK__QuestionB__quest__2116E6DF");
>>>>>>> 9b85e261289591d56333691047f59cea2a3dfd26
        });

        modelBuilder.Entity<QuestionBankQuestionTable>(entity =>
        {
<<<<<<< HEAD
            entity.HasKey(e => e.QuestionId).HasName("PK__Question__2EC2154954A35152");
=======
            entity.HasKey(e => e.QuestionId).HasName("PK__Question__2EC21549762ED5C1");
>>>>>>> 9b85e261289591d56333691047f59cea2a3dfd26

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
<<<<<<< HEAD
                .HasConstraintName("FK__QuestionB__compa__17036CC0");
=======
                .HasConstraintName("FK__QuestionB__compa__0EF836A4");
>>>>>>> 9b85e261289591d56333691047f59cea2a3dfd26
        });

        modelBuilder.Entity<QuestionTable>(entity =>
        {
            entity.HasKey(e => e.QuestionId).HasName("PK__Question__2EC2154938FBC299");

            entity.ToTable("Question_table");

            entity.HasIndex(e => e.SurveyId, "IX_Question_table_survey_id");

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

        modelBuilder.Entity<SurveyTable>(entity =>
        {
            entity.HasKey(e => e.SurveyId).HasName("PK__tmp_ms_x__6C05F07C8F39CE93");

            entity.ToTable("Survey_table");

            entity.Property(e => e.SurveyId).HasColumnName("Survey_id");
            entity.Property(e => e.DateCreated).HasColumnName("date_created");
            entity.Property(e => e.DeptId).HasColumnName("deptId");
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.EndTime).HasColumnName("end_time");
            entity.Property(e => e.LaunchDate).HasColumnName("launch_date");
            entity.Property(e => e.StartTime).HasColumnName("start_time");
            entity.Property(e => e.SurveyorId)
                .IsRequired()
                .HasMaxLength(450)
                .HasColumnName("Surveyor_id");

            entity.HasOne(d => d.Dept).WithMany(p => p.SurveyTables)
                .HasForeignKey(d => d.DeptId)
                .HasConstraintName("FK__Survey_ta__deptI__7908F585");
        });

        modelBuilder.Entity<SurveyerDept>(entity =>
        {
            entity.ToTable("Surveyer_Dept");

            entity.HasIndex(e => e.CompanyId, "IX_Surveyer_Dept_CompanyId");

            entity.HasIndex(e => e.DeptId, "IX_Surveyer_Dept_DeptId");

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
<<<<<<< HEAD
=======
                .OnDelete(DeleteBehavior.ClientSetNull)
>>>>>>> 9b85e261289591d56333691047f59cea2a3dfd26
                .HasConstraintName("FK_Surveyer_Dept_DeptId");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
