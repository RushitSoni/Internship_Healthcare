using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Online_Survey.Models;

public partial class InternshipOnlineSurveyContext : DbContext
{
    //Server=(localdb)\\mssqllocaldb; Database=Internship_Online_Survey; Trusted_Connection=True; TrustServerCertificate=true

    private IConfiguration _configuration;
    public InternshipOnlineSurveyContext(IConfiguration config)
    {
        _configuration = config;
    }

    public virtual DbSet<OptionTable> OptionTables { get; set; }

    public virtual DbSet<QuestionTable> QuestionTables { get; set; }

    public virtual DbSet<SurveyTable> SurveyTables { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
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
                .HasConstraintName("FK__Option_ta__surve__17036CC0");
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
                .HasConstraintName("FK__Question___surve__03F0984C");
        });

        modelBuilder.Entity<SurveyTable>(entity =>
        {
<<<<<<< HEAD
            entity.ToTable("Surveyer_Dept");
=======
            entity.HasKey(e => e.SurveyId).HasName("PK__Survey_t__6C05F07C35E3ED22");

            entity.ToTable("Survey_table");
>>>>>>> bc548c0521cca6e16d8b6647a4705c53dbb1239c

            entity.Property(e => e.SurveyId).HasColumnName("Survey_id");
            entity.Property(e => e.DateCreated).HasColumnName("date_created");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.EndTime).HasColumnName("end_time");
            entity.Property(e => e.LaunchDate).HasColumnName("launch_date");
            entity.Property(e => e.StartTime).HasColumnName("start_time");
            entity.Property(e => e.SurveyorId)
                .IsRequired()
<<<<<<< HEAD
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
=======
                .HasMaxLength(450)
                .HasColumnName("Surveyor_id");
>>>>>>> bc548c0521cca6e16d8b6647a4705c53dbb1239c
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
