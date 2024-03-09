using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Online_Survey.Migrations.InternshipOnlineSurvey
{
    /// <inheritdoc />
    public partial class template : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Department_Company",
                table: "Department");

            migrationBuilder.DropForeignKey(
                name: "FK__QuestionB__quest__3B40CD36",
                table: "QuestionBank_Option_table");

            migrationBuilder.DropForeignKey(
                name: "FK__QuestionB__compa__17036CC0",
                table: "QuestionBank_Question_table");

            migrationBuilder.DropForeignKey(
                name: "FK_Surveyer_Dept_DeptId",
                table: "Surveyer_Dept");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Question__2EC2154954A35152",
                table: "QuestionBank_Question_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Question__F4EACE1B90A54BC3",
                table: "QuestionBank_Option_table");

            migrationBuilder.AddColumn<int>(
                name: "deptId",
                table: "Survey_table",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK__Question__2EC21549762ED5C1",
                table: "QuestionBank_Question_table",
                column: "question_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Question__F4EACE1BAAF789A9",
                table: "QuestionBank_Option_table",
                column: "option_id");

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
                    survey_id = table.Column<int>(type: "int", nullable: false),
                    surveyor_id = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    survey_name = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tmp_ms_x__9DC31A07E75EA175", x => x.survey_id);
                    table.ForeignKey(
                        name: "FK__Template___surve__361203C5",
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
                        name: "FK__Respondent_A__Id__67DE6983",
                        column: x => x.Id,
                        principalTable: "Respondent_Record",
                        principalColumn: "Id");
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
                        name: "FK__Template___surve__370627FE",
                        column: x => x.survey_id,
                        principalTable: "Template_Details",
                        principalColumn: "survey_id");
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
                        name: "FK__Template___quest__41B8C09B",
                        column: x => x.question_id,
                        principalTable: "Template_Questions",
                        principalColumn: "question_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Survey_table_deptId",
                table: "Survey_table",
                column: "deptId");

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
                name: "IX_Template_Options_question_id",
                table: "Template_Options",
                column: "question_id");

            migrationBuilder.CreateIndex(
                name: "IX_Template_Questions_survey_id",
                table: "Template_Questions",
                column: "survey_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Department_Company",
                table: "Department",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK__QuestionB__quest__2116E6DF",
                table: "QuestionBank_Option_table",
                column: "question_id",
                principalTable: "QuestionBank_Question_table",
                principalColumn: "question_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__QuestionB__compa__0EF836A4",
                table: "QuestionBank_Question_table",
                column: "company_id",
                principalTable: "Company",
                principalColumn: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK__Survey_ta__deptI__7908F585",
                table: "Survey_table",
                column: "deptId",
                principalTable: "Department",
                principalColumn: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Surveyer_Dept_DeptId",
                table: "Surveyer_Dept",
                column: "DeptId",
                principalTable: "Department",
                principalColumn: "DepartmentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Department_Company",
                table: "Department");

            migrationBuilder.DropForeignKey(
                name: "FK__QuestionB__quest__2116E6DF",
                table: "QuestionBank_Option_table");

            migrationBuilder.DropForeignKey(
                name: "FK__QuestionB__compa__0EF836A4",
                table: "QuestionBank_Question_table");

            migrationBuilder.DropForeignKey(
                name: "FK__Survey_ta__deptI__7908F585",
                table: "Survey_table");

            migrationBuilder.DropForeignKey(
                name: "FK_Surveyer_Dept_DeptId",
                table: "Surveyer_Dept");

            migrationBuilder.DropTable(
                name: "Respondent_Answer");

            migrationBuilder.DropTable(
                name: "Respondent_Details");

            migrationBuilder.DropTable(
                name: "Table");

            migrationBuilder.DropTable(
                name: "Template_Options");

            migrationBuilder.DropTable(
                name: "Respondent_Record");

            migrationBuilder.DropTable(
                name: "Template_Questions");

            migrationBuilder.DropTable(
                name: "Template_Details");

            migrationBuilder.DropIndex(
                name: "IX_Survey_table_deptId",
                table: "Survey_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Question__2EC21549762ED5C1",
                table: "QuestionBank_Question_table");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Question__F4EACE1BAAF789A9",
                table: "QuestionBank_Option_table");

            migrationBuilder.DropColumn(
                name: "deptId",
                table: "Survey_table");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Question__2EC2154954A35152",
                table: "QuestionBank_Question_table",
                column: "question_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Question__F4EACE1B90A54BC3",
                table: "QuestionBank_Option_table",
                column: "option_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Department_Company",
                table: "Department",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__QuestionB__quest__3B40CD36",
                table: "QuestionBank_Option_table",
                column: "question_id",
                principalTable: "QuestionBank_Question_table",
                principalColumn: "question_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__QuestionB__compa__17036CC0",
                table: "QuestionBank_Question_table",
                column: "company_id",
                principalTable: "Company",
                principalColumn: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Surveyer_Dept_DeptId",
                table: "Surveyer_Dept",
                column: "DeptId",
                principalTable: "Department",
                principalColumn: "DepartmentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
