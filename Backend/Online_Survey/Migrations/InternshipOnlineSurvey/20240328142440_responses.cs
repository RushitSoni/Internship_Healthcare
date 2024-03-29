using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Online_Survey.Migrations.InternshipOnlineSurvey
{
    /// <inheritdoc />
    public partial class responses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Surveyer_Dept_DeptId",
                table: "Surveyer_Dept");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Respondent_Details");

            migrationBuilder.DropColumn(
                name: "Phone_number",
                table: "Respondent_Details");

            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "Company");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Surveyer_Dept",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Respondent_Record_Respondent_id",
                table: "Respondent_Record",
                column: "Respondent_id");

            migrationBuilder.AddForeignKey(
                name: "FK__Responden__Respo__76818E95",
                table: "Respondent_Record",
                column: "Respondent_id",
                principalTable: "Respondent_Details",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
                name: "FK__Responden__Respo__76818E95",
                table: "Respondent_Record");

            migrationBuilder.DropForeignKey(
                name: "FK_Surveyer_Dept_DeptId",
                table: "Surveyer_Dept");

            migrationBuilder.DropIndex(
                name: "IX_Respondent_Record_Respondent_id",
                table: "Respondent_Record");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Surveyer_Dept");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Respondent_Details",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone_number",
                table: "Respondent_Details",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte[]>(
                name: "Timestamp",
                table: "Company",
                type: "rowversion",
                rowVersion: true,
                nullable: true);

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
