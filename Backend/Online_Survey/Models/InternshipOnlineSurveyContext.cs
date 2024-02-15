using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Online_Survey.Models;

public partial class InternshipOnlineSurveyContext : DbContext
{
    public InternshipOnlineSurveyContext()
    {
    }

    public InternshipOnlineSurveyContext(DbContextOptions<InternshipOnlineSurveyContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<SurveyerDept> SurveyerDepts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=Internship_Online_Survey;Trusted_Connection=True;");

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
