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

    public virtual DbSet<Table> Tables { get; set; }

    public virtual DbSet<Table1> Table1s { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=Internship_Online_Survey;Trusted_Connection=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Table>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Table__3214EC07551B4BFD");

            entity.ToTable("Table");

            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<Table1>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Table1__3214EC078650053E");

            entity.ToTable("Table1");

            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
