using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Online_Survey.Migrations.InternshipOnlineSurvey
{
    /// <inheritdoc />
    public partial class _18_3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Company",
                columns: table => new
                {
                    CompanyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AdminId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Company__2D971CAC662AD6BF", x => x.CompanyId);
                });

            migrationBuilder.CreateTable(
                name: "Respondent_Details",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Phone_number = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Responde__3214EC07D5D5904C", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Respondent_Record",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Respondent_id = table.Column<int>(type: "int", nullable: false),
                    Survey_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Responde__3214EC07EB3BA6FE", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Table",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Table__3214EC07C83EBAD5", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Template_Details",
                columns: table => new
                {
                    survey_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    surveyor_id = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    survey_name = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tmp_ms_x__9DC31A07B589E68D", x => x.survey_id);
                });

            migrationBuilder.CreateTable(
                name: "Department",
                columns: table => new
                {
                    DepartmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Departme__B2079BED3DB2728B", x => x.DepartmentId);
                    table.ForeignKey(
                        name: "FK_Department_Company",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "CompanyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionBank_Question_table",
                columns: table => new
                {
                    question_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    question_text = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: false),
                    question_option_type = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    company_id = table.Column<int>(type: "int", nullable: true),
                    user_id = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Question__2EC21549762ED5C1", x => x.question_id);
                    table.ForeignKey(
                        name: "FK__QuestionB__compa__0EF836A4",
                        column: x => x.company_id,
                        principalTable: "Company",
                        principalColumn: "CompanyId");
                });

            migrationBuilder.CreateTable(
                name: "Template_Questions",
                columns: table => new
                {
                    question_id = table.Column<int>(type: "int", nullable: false),
                    survey_id = table.Column<int>(type: "int", nullable: false),
                    question_text = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    option_type = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Template__2EC21549B389D668", x => x.question_id);
                    table.ForeignKey(
                        name: "FK__Template___surve__08D548FA",
                        column: x => x.survey_id,
                        principalTable: "Template_Details",
                        principalColumn: "survey_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Survey_table",
                columns: table => new
                {
                    Survey_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Survey_name = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Surveyor_id = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    date_created = table.Column<DateOnly>(type: "date", nullable: false),
                    launch_date = table.Column<DateOnly>(type: "date", nullable: true),
                    end_date = table.Column<DateOnly>(type: "date", nullable: true),
                    start_time = table.Column<TimeOnly>(type: "time", nullable: true),
                    end_time = table.Column<TimeOnly>(type: "time", nullable: true),
                    deptId = table.Column<int>(type: "int", nullable: true),
                    count = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tmp_ms_x__6C05F07CAC17ED02", x => x.Survey_id);
                    table.ForeignKey(
                        name: "FK__Survey_ta__deptI__5614BF03",
                        column: x => x.deptId,
                        principalTable: "Department",
                        principalColumn: "DepartmentId",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Surveyer_Dept",
                columns: table => new
                {
                    Surveyer_DeptId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeptId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Surveyer_Dept", x => x.Surveyer_DeptId);
                    table.ForeignKey(
                        name: "FK_Surveyer_Dept_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "CompanyId");
                    table.ForeignKey(
                        name: "FK_Surveyer_Dept_DeptId",
                        column: x => x.DeptId,
                        principalTable: "Department",
                        principalColumn: "DepartmentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionBank_Option_table",
                columns: table => new
                {
                    option_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    option_text = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: false),
                    question_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Question__F4EACE1BAAF789A9", x => x.option_id);
                    table.ForeignKey(
                        name: "FK__QuestionB__quest__2116E6DF",
                        column: x => x.question_id,
                        principalTable: "QuestionBank_Question_table",
                        principalColumn: "question_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Template_Options",
                columns: table => new
                {
                    option_id = table.Column<int>(type: "int", nullable: false),
                    option_text = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: false),
                    question_id = table.Column<int>(type: "int", nullable: false),
                    next_question = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Template__F4EACE1B4D36DA9C", x => x.option_id);
                    table.ForeignKey(
                        name: "FK__Template___quest__09C96D33",
                        column: x => x.question_id,
                        principalTable: "Template_Questions",
                        principalColumn: "question_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Question_table",
                columns: table => new
                {
                    question_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    question_text = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: false),
                    question_option_type = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    survey_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Question__2EC2154938FBC299", x => x.question_id);
                    table.ForeignKey(
                        name: "FK__Question___surve__53385258",
                        column: x => x.survey_id,
                        principalTable: "Survey_table",
                        principalColumn: "Survey_id");
                });

            migrationBuilder.CreateTable(
                name: "Option_table",
                columns: table => new
                {
                    option_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    option_text = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: false),
                    question_id = table.Column<int>(type: "int", nullable: false),
                    survey_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Option_t__F4EACE1BF1662605", x => x.option_id);
                    table.ForeignKey(
                        name: "FK__Option_ta__quest__0BB1B5A5",
                        column: x => x.question_id,
                        principalTable: "Question_table",
                        principalColumn: "question_id");
                    table.ForeignKey(
                        name: "FK__Option_ta__surve__542C7691",
                        column: x => x.survey_id,
                        principalTable: "Survey_table",
                        principalColumn: "Survey_id");
                });

            migrationBuilder.CreateTable(
                name: "Respondent_Answer",
                columns: table => new
                {
                    Id1 = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id = table.Column<int>(type: "int", nullable: false),
                    Question_id = table.Column<int>(type: "int", nullable: false),
                    Option_id = table.Column<int>(type: "int", nullable: true),
                    answer_text = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tmp_ms_x__C49607F54BB01EE1", x => x.Id1);
                    table.ForeignKey(
                        name: "FK__Responden__Optio__69C6B1F5",
                        column: x => x.Option_id,
                        principalTable: "Option_table",
                        principalColumn: "option_id");
                    table.ForeignKey(
                        name: "FK__Responden__Quest__68D28DBC",
                        column: x => x.Question_id,
                        principalTable: "Question_table",
                        principalColumn: "question_id");
                    table.ForeignKey(
                        name: "FK__Respondent_A__Id__06ED0088",
                        column: x => x.Id,
                        principalTable: "Respondent_Record",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Department_CompanyId",
                table: "Department",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Option_table_question_id",
                table: "Option_table",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "IX_Option_table_survey_id",
                table: "Option_table",
                column: "survey_id");

            migrationBuilder.CreateIndex(
                name: "IX_Question_table_survey_id",
                table: "Question_table",
                column: "survey_id");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionBank_Option_table_question_id",
                table: "QuestionBank_Option_table",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionBank_Question_table_company_id",
                table: "QuestionBank_Question_table",
                column: "company_id");

            migrationBuilder.CreateIndex(
                name: "IX_Respondent_Answer_Id",
                table: "Respondent_Answer",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Respondent_Answer_Option_id",
                table: "Respondent_Answer",
                column: "Option_id");

            migrationBuilder.CreateIndex(
                name: "IX_Respondent_Answer_Question_id",
                table: "Respondent_Answer",
                column: "Question_id");

            migrationBuilder.CreateIndex(
                name: "IX_Survey_table_deptId",
                table: "Survey_table",
                column: "deptId");

            migrationBuilder.CreateIndex(
                name: "IX_Surveyer_Dept_CompanyId",
                table: "Surveyer_Dept",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Surveyer_Dept_DeptId",
                table: "Surveyer_Dept",
                column: "DeptId");

            migrationBuilder.CreateIndex(
                name: "IX_Template_Options_question_id",
                table: "Template_Options",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "IX_Template_Questions_survey_id",
                table: "Template_Questions",
                column: "survey_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuestionBank_Option_table");

            migrationBuilder.DropTable(
                name: "Respondent_Answer");

            migrationBuilder.DropTable(
                name: "Respondent_Details");

            migrationBuilder.DropTable(
                name: "Surveyer_Dept");

            migrationBuilder.DropTable(
                name: "Table");

            migrationBuilder.DropTable(
                name: "Template_Options");

            migrationBuilder.DropTable(
                name: "QuestionBank_Question_table");

            migrationBuilder.DropTable(
                name: "Option_table");

            migrationBuilder.DropTable(
                name: "Respondent_Record");

            migrationBuilder.DropTable(
                name: "Template_Questions");

            migrationBuilder.DropTable(
                name: "Question_table");

            migrationBuilder.DropTable(
                name: "Template_Details");

            migrationBuilder.DropTable(
                name: "Survey_table");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropTable(
                name: "Company");
        }
    }
}
