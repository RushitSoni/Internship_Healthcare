using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Online_Survey.Migrations.InternshipOnlineSurvey
{
    /// <inheritdoc />
    public partial class questionBank : Migration
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
                name: "Survey_table",
                columns: table => new
                {
                    Survey_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Surveyor_id = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    date_created = table.Column<DateOnly>(type: "date", nullable: false),
                    launch_date = table.Column<DateOnly>(type: "date", nullable: true),
                    end_date = table.Column<DateOnly>(type: "date", nullable: true),
                    start_time = table.Column<TimeOnly>(type: "time", nullable: true),
                    end_time = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tmp_ms_x__6C05F07C8F39CE93", x => x.Survey_id);
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
                    table.PrimaryKey("PK__Question__2EC2154954A35152", x => x.question_id);
                    table.ForeignKey(
                        name: "FK__QuestionB__compa__17036CC0",
                        column: x => x.company_id,
                        principalTable: "Company",
                        principalColumn: "CompanyId");
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
                        name: "FK__Question___surve__0880433F",
                        column: x => x.survey_id,
                        principalTable: "Survey_table",
                        principalColumn: "Survey_id");
                });

            migrationBuilder.CreateTable(
                name: "Surveyer_Dept",
                columns: table => new
                {
                    Surveyer_DeptId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeptId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
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
                    table.PrimaryKey("PK__Question__F4EACE1B90A54BC3", x => x.option_id);
                    table.ForeignKey(
                        name: "FK__QuestionB__quest__3B40CD36",
                        column: x => x.question_id,
                        principalTable: "QuestionBank_Question_table",
                        principalColumn: "question_id",
                        onDelete: ReferentialAction.Cascade);
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
                        name: "FK__Option_ta__quest__160F4887",
                        column: x => x.question_id,
                        principalTable: "Question_table",
                        principalColumn: "question_id");
                    table.ForeignKey(
                        name: "FK__Option_ta__surve__09746778",
                        column: x => x.survey_id,
                        principalTable: "Survey_table",
                        principalColumn: "Survey_id");
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
                name: "IX_Surveyer_Dept_CompanyId",
                table: "Surveyer_Dept",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Surveyer_Dept_DeptId",
                table: "Surveyer_Dept",
                column: "DeptId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Option_table");

            migrationBuilder.DropTable(
                name: "QuestionBank_Option_table");

            migrationBuilder.DropTable(
                name: "Surveyer_Dept");

            migrationBuilder.DropTable(
                name: "Question_table");

            migrationBuilder.DropTable(
                name: "QuestionBank_Question_table");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropTable(
                name: "Survey_table");

            migrationBuilder.DropTable(
                name: "Company");
        }
    }
}
