using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Online_Survey.Migrations.InternshipOnlineSurvey
{
    /// <inheritdoc />
    public partial class respondent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "Respondent_Answer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Question_id = table.Column<int>(type: "int", nullable: false),
                    Option_id = table.Column<int>(type: "int", nullable: true),
                    answer_text = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Responde__3214EC075B3D7952", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Responden__Optio__5A846E65",
                        column: x => x.Option_id,
                        principalTable: "Option_table",
                        principalColumn: "option_id");
                    table.ForeignKey(
                        name: "FK__Responden__Quest__59904A2C",
                        column: x => x.Question_id,
                        principalTable: "Question_table",
                        principalColumn: "question_id");
                    table.ForeignKey(
                        name: "FK__Respondent_A__Id__589C25F3",
                        column: x => x.Id,
                        principalTable: "Respondent_Record",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Respondent_Answer_Option_id",
                table: "Respondent_Answer",
                column: "Option_id");

            migrationBuilder.CreateIndex(
                name: "IX_Respondent_Answer_Question_id",
                table: "Respondent_Answer",
                column: "Question_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Respondent_Answer");

            migrationBuilder.DropTable(
                name: "Respondent_Details");

            migrationBuilder.DropTable(
                name: "Respondent_Record");
        }
    }
}
