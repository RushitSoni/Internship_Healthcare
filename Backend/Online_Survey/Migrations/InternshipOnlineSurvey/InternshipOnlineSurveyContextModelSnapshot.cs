﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Online_Survey.Models;

#nullable disable

namespace Online_Survey.Migrations.InternshipOnlineSurvey
{
    [DbContext(typeof(InternshipOnlineSurveyContext))]
    partial class InternshipOnlineSurveyContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Online_Survey.Models.Company", b =>
                {
                    b.Property<int>("CompanyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CompanyId"));

                    b.Property<string>("AdminId")
                        .IsRequired()
                        .HasMaxLength(450)
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("CompanyId")
                        .HasName("PK__Company__2D971CAC662AD6BF");

                    b.ToTable("Company", (string)null);
                });

            modelBuilder.Entity("Online_Survey.Models.Department", b =>
                {
                    b.Property<int>("DepartmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DepartmentId"));

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("DepartmentId")
                        .HasName("PK__Departme__B2079BED3DB2728B");

                    b.HasIndex("CompanyId");

                    b.ToTable("Department", (string)null);
                });

            modelBuilder.Entity("Online_Survey.Models.OptionTable", b =>
                {
                    b.Property<int>("OptionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("option_id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OptionId"));

                    b.Property<string>("OptionText")
                        .IsRequired()
                        .HasMaxLength(256)
                        .IsUnicode(false)
                        .HasColumnType("varchar(256)")
                        .HasColumnName("option_text");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int")
                        .HasColumnName("question_id");

                    b.Property<int>("SurveyId")
                        .HasColumnType("int")
                        .HasColumnName("survey_id");

                    b.HasKey("OptionId")
                        .HasName("PK__Option_t__F4EACE1BF1662605");

                    b.HasIndex("QuestionId");

                    b.HasIndex("SurveyId");

                    b.ToTable("Option_table", (string)null);
                });

            modelBuilder.Entity("Online_Survey.Models.QuestionTable", b =>
                {
                    b.Property<int>("QuestionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("question_id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("QuestionId"));

                    b.Property<string>("QuestionOptionType")
                        .IsRequired()
                        .HasMaxLength(30)
                        .IsUnicode(false)
                        .HasColumnType("varchar(30)")
                        .HasColumnName("question_option_type");

                    b.Property<string>("QuestionText")
                        .IsRequired()
                        .HasMaxLength(256)
                        .IsUnicode(false)
                        .HasColumnType("varchar(256)")
                        .HasColumnName("question_text");

                    b.Property<int>("SurveyId")
                        .HasColumnType("int")
                        .HasColumnName("survey_id");

                    b.HasKey("QuestionId")
                        .HasName("PK__Question__2EC2154938FBC299");

                    b.HasIndex("SurveyId");

                    b.ToTable("Question_table", (string)null);
                });

            modelBuilder.Entity("Online_Survey.Models.SurveyTable", b =>
                {
                    b.Property<int>("SurveyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Survey_id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SurveyId"));

                    b.Property<DateOnly>("DateCreated")
                        .HasColumnType("date")
                        .HasColumnName("date_created");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly?>("EndDate")
                        .HasColumnType("date")
                        .HasColumnName("end_date");

                    b.Property<int?>("EndTime")
                        .HasColumnType("int")
                        .HasColumnName("end_time");

                    b.Property<DateOnly?>("LaunchDate")
                        .HasColumnType("date")
                        .HasColumnName("launch_date");

                    b.Property<TimeOnly?>("StartTime")
                        .HasColumnType("time")
                        .HasColumnName("start_time");

                    b.Property<string>("SurveyorId")
                        .IsRequired()
                        .HasMaxLength(450)
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("Surveyor_id");

                    b.HasKey("SurveyId")
                        .HasName("PK__tmp_ms_x__6C05F07C8F39CE93");

                    b.ToTable("Survey_table", (string)null);
                });

            modelBuilder.Entity("Online_Survey.Models.SurveyerDept", b =>
                {
                    b.Property<int>("SurveyerDeptId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Surveyer_DeptId");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SurveyerDeptId"));

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<int>("DeptId")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasMaxLength(450)
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("SurveyerDeptId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("DeptId");

                    b.ToTable("Surveyer_Dept", (string)null);
                });

            modelBuilder.Entity("Online_Survey.Models.Table", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PK__Table__3214EC07C83EBAD5");

                    b.ToTable("Table", (string)null);
                });

            modelBuilder.Entity("Online_Survey.Models.Department", b =>
                {
                    b.HasOne("Online_Survey.Models.Company", "Company")
                        .WithMany("Departments")
                        .HasForeignKey("CompanyId")
                        .IsRequired()
                        .HasConstraintName("FK_Department_Company");

                    b.Navigation("Company");
                });

            modelBuilder.Entity("Online_Survey.Models.OptionTable", b =>
                {
                    b.HasOne("Online_Survey.Models.QuestionTable", "Question")
                        .WithMany("OptionTables")
                        .HasForeignKey("QuestionId")
                        .IsRequired()
                        .HasConstraintName("FK__Option_ta__quest__160F4887");

                    b.HasOne("Online_Survey.Models.SurveyTable", "Survey")
                        .WithMany("OptionTables")
                        .HasForeignKey("SurveyId")
                        .IsRequired()
                        .HasConstraintName("FK__Option_ta__surve__09746778");

                    b.Navigation("Question");

                    b.Navigation("Survey");
                });

            modelBuilder.Entity("Online_Survey.Models.QuestionTable", b =>
                {
                    b.HasOne("Online_Survey.Models.SurveyTable", "Survey")
                        .WithMany("QuestionTables")
                        .HasForeignKey("SurveyId")
                        .IsRequired()
                        .HasConstraintName("FK__Question___surve__0880433F");

                    b.Navigation("Survey");
                });

            modelBuilder.Entity("Online_Survey.Models.SurveyerDept", b =>
                {
                    b.HasOne("Online_Survey.Models.Company", "Company")
                        .WithMany("SurveyerDepts")
                        .HasForeignKey("CompanyId")
                        .IsRequired()
                        .HasConstraintName("FK_Surveyer_Dept_CompanyId");

                    b.HasOne("Online_Survey.Models.Department", "Dept")
                        .WithMany("SurveyerDepts")
                        .HasForeignKey("DeptId")
                        .IsRequired()
                        .HasConstraintName("FK_Surveyer_Dept_DeptId");

                    b.Navigation("Company");

                    b.Navigation("Dept");
                });

            modelBuilder.Entity("Online_Survey.Models.Company", b =>
                {
                    b.Navigation("Departments");

                    b.Navigation("SurveyerDepts");
                });

            modelBuilder.Entity("Online_Survey.Models.Department", b =>
                {
                    b.Navigation("SurveyerDepts");
                });

            modelBuilder.Entity("Online_Survey.Models.QuestionTable", b =>
                {
                    b.Navigation("OptionTables");
                });

            modelBuilder.Entity("Online_Survey.Models.SurveyTable", b =>
                {
                    b.Navigation("OptionTables");

                    b.Navigation("QuestionTables");
                });
#pragma warning restore 612, 618
        }
    }
}
