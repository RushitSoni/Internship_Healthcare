﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Online_Survey.Models;

#nullable disable

namespace Online_Survey.Migrations.InternshipOnlineSurvey
{
    [DbContext(typeof(InternshipOnlineSurveyContext))]
    [Migration("20240309104146_username")]
    partial class username
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

            modelBuilder.Entity("Online_Survey.Models.QuestionBankOptionTable", b =>
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

                    b.HasKey("OptionId")
                        .HasName("PK__Question__F4EACE1BAAF789A9");

                    b.HasIndex("QuestionId");

                    b.ToTable("QuestionBank_Option_table", (string)null);
                });

            modelBuilder.Entity("Online_Survey.Models.QuestionBankQuestionTable", b =>
                {
                    b.Property<int>("QuestionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("question_id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("QuestionId"));

                    b.Property<int?>("CompanyId")
                        .HasColumnType("int")
                        .HasColumnName("company_id");

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

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasMaxLength(450)
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("user_id");

                    b.HasKey("QuestionId")
                        .HasName("PK__Question__2EC21549762ED5C1");

                    b.HasIndex("CompanyId");

                    b.ToTable("QuestionBank_Question_table", (string)null);
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

            modelBuilder.Entity("Online_Survey.Models.RespondentAnswer", b =>
                {
                    b.Property<int>("Id1")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id1"));

                    b.Property<string>("AnswerText")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("answer_text");

                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<int?>("OptionId")
                        .HasColumnType("int")
                        .HasColumnName("Option_id");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int")
                        .HasColumnName("Question_id");

                    b.HasKey("Id1")
                        .HasName("PK__tmp_ms_x__C49607F54BB01EE1");

                    b.HasIndex("Id");

                    b.HasIndex("OptionId");

                    b.HasIndex("QuestionId");

                    b.ToTable("Respondent_Answer", (string)null);
                });

            modelBuilder.Entity("Online_Survey.Models.RespondentDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)")
                        .HasColumnName("Phone_number");

                    b.HasKey("Id")
                        .HasName("PK__Responde__3214EC07D5D5904C");

                    b.ToTable("Respondent_Details", (string)null);
                });

            modelBuilder.Entity("Online_Survey.Models.RespondentRecord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("RespondentId")
                        .HasColumnType("int")
                        .HasColumnName("Respondent_id");

                    b.Property<int>("SurveyId")
                        .HasColumnType("int")
                        .HasColumnName("Survey_id");

                    b.HasKey("Id")
                        .HasName("PK__Responde__3214EC07EB3BA6FE");

                    b.ToTable("Respondent_Record", (string)null);
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

                    b.Property<int?>("DeptId")
                        .HasColumnType("int")
                        .HasColumnName("deptId");

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

                    b.HasIndex("DeptId");

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

            modelBuilder.Entity("Online_Survey.Models.TemplateDetail", b =>
                {
                    b.Property<int>("SurveyId")
                        .HasColumnType("int")
                        .HasColumnName("survey_id");

                    b.Property<string>("SurveyName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("survey_name");

                    b.Property<string>("SurveyorId")
                        .IsRequired()
                        .HasMaxLength(450)
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("surveyor_id");

                    b.HasKey("SurveyId")
                        .HasName("PK__tmp_ms_x__9DC31A07E75EA175");

                    b.ToTable("Template_Details", (string)null);
                });

            modelBuilder.Entity("Online_Survey.Models.TemplateOption", b =>
                {
                    b.Property<int>("OptionId")
                        .HasColumnType("int")
                        .HasColumnName("option_id");

                    b.Property<int?>("NextQuestion")
                        .HasColumnType("int")
                        .HasColumnName("next_question");

                    b.Property<string>("OptionText")
                        .IsRequired()
                        .HasMaxLength(256)
                        .IsUnicode(false)
                        .HasColumnType("varchar(256)")
                        .HasColumnName("option_text");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int")
                        .HasColumnName("question_id");

                    b.HasKey("OptionId")
                        .HasName("PK__Template__F4EACE1B4D36DA9C");

                    b.HasIndex("QuestionId");

                    b.ToTable("Template_Options", (string)null);
                });

            modelBuilder.Entity("Online_Survey.Models.TemplateQuestion", b =>
                {
                    b.Property<int>("QuestionId")
                        .HasColumnType("int")
                        .HasColumnName("question_id");

                    b.Property<string>("OptionType")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)")
                        .HasColumnName("option_type");

                    b.Property<string>("QuestionText")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)")
                        .HasColumnName("question_text");

                    b.Property<int>("SurveyId")
                        .HasColumnType("int")
                        .HasColumnName("survey_id");

                    b.HasKey("QuestionId")
                        .HasName("PK__Template__2EC21549B389D668");

                    b.HasIndex("SurveyId");

                    b.ToTable("Template_Questions", (string)null);
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

            modelBuilder.Entity("Online_Survey.Models.QuestionBankOptionTable", b =>
                {
                    b.HasOne("Online_Survey.Models.QuestionBankQuestionTable", "Question")
                        .WithMany("QuestionBankOptionTables")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__QuestionB__quest__2116E6DF");

                    b.Navigation("Question");
                });

            modelBuilder.Entity("Online_Survey.Models.QuestionBankQuestionTable", b =>
                {
                    b.HasOne("Online_Survey.Models.Company", "Company")
                        .WithMany("QuestionBankQuestionTables")
                        .HasForeignKey("CompanyId")
                        .HasConstraintName("FK__QuestionB__compa__0EF836A4");

                    b.Navigation("Company");
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

            modelBuilder.Entity("Online_Survey.Models.RespondentAnswer", b =>
                {
                    b.HasOne("Online_Survey.Models.RespondentRecord", "IdNavigation")
                        .WithMany("RespondentAnswers")
                        .HasForeignKey("Id")
                        .IsRequired()
                        .HasConstraintName("FK__Respondent_A__Id__67DE6983");

                    b.HasOne("Online_Survey.Models.OptionTable", "Option")
                        .WithMany("RespondentAnswers")
                        .HasForeignKey("OptionId")
                        .HasConstraintName("FK__Responden__Optio__69C6B1F5");

                    b.HasOne("Online_Survey.Models.QuestionTable", "Question")
                        .WithMany("RespondentAnswers")
                        .HasForeignKey("QuestionId")
                        .IsRequired()
                        .HasConstraintName("FK__Responden__Quest__68D28DBC");

                    b.Navigation("IdNavigation");

                    b.Navigation("Option");

                    b.Navigation("Question");
                });

            modelBuilder.Entity("Online_Survey.Models.SurveyTable", b =>
                {
                    b.HasOne("Online_Survey.Models.Department", "Dept")
                        .WithMany("SurveyTables")
                        .HasForeignKey("DeptId")
                        .HasConstraintName("FK__Survey_ta__deptI__7908F585");

                    b.Navigation("Dept");
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

            modelBuilder.Entity("Online_Survey.Models.TemplateDetail", b =>
                {
                    b.HasOne("Online_Survey.Models.SurveyTable", "Survey")
                        .WithOne("TemplateDetail")
                        .HasForeignKey("Online_Survey.Models.TemplateDetail", "SurveyId")
                        .IsRequired()
                        .HasConstraintName("FK__Template___surve__361203C5");

                    b.Navigation("Survey");
                });

            modelBuilder.Entity("Online_Survey.Models.TemplateOption", b =>
                {
                    b.HasOne("Online_Survey.Models.TemplateQuestion", "Question")
                        .WithMany("TemplateOptions")
                        .HasForeignKey("QuestionId")
                        .IsRequired()
                        .HasConstraintName("FK__Template___quest__41B8C09B");

                    b.Navigation("Question");
                });

            modelBuilder.Entity("Online_Survey.Models.TemplateQuestion", b =>
                {
                    b.HasOne("Online_Survey.Models.TemplateDetail", "Survey")
                        .WithMany("TemplateQuestions")
                        .HasForeignKey("SurveyId")
                        .IsRequired()
                        .HasConstraintName("FK__Template___surve__370627FE");

                    b.Navigation("Survey");
                });

            modelBuilder.Entity("Online_Survey.Models.Company", b =>
                {
                    b.Navigation("Departments");

                    b.Navigation("QuestionBankQuestionTables");

                    b.Navigation("SurveyerDepts");
                });

            modelBuilder.Entity("Online_Survey.Models.Department", b =>
                {
                    b.Navigation("SurveyTables");

                    b.Navigation("SurveyerDepts");
                });

            modelBuilder.Entity("Online_Survey.Models.OptionTable", b =>
                {
                    b.Navigation("RespondentAnswers");
                });

            modelBuilder.Entity("Online_Survey.Models.QuestionBankQuestionTable", b =>
                {
                    b.Navigation("QuestionBankOptionTables");
                });

            modelBuilder.Entity("Online_Survey.Models.QuestionTable", b =>
                {
                    b.Navigation("OptionTables");

                    b.Navigation("RespondentAnswers");
                });

            modelBuilder.Entity("Online_Survey.Models.RespondentRecord", b =>
                {
                    b.Navigation("RespondentAnswers");
                });

            modelBuilder.Entity("Online_Survey.Models.SurveyTable", b =>
                {
                    b.Navigation("OptionTables");

                    b.Navigation("QuestionTables");

                    b.Navigation("TemplateDetail");
                });

            modelBuilder.Entity("Online_Survey.Models.TemplateDetail", b =>
                {
                    b.Navigation("TemplateQuestions");
                });

            modelBuilder.Entity("Online_Survey.Models.TemplateQuestion", b =>
                {
                    b.Navigation("TemplateOptions");
                });
#pragma warning restore 612, 618
        }
    }
}
