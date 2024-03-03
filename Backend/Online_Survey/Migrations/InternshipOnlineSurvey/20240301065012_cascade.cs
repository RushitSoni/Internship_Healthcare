using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Online_Survey.Migrations.InternshipOnlineSurvey
{
    /// <inheritdoc />
    public partial class cascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Department_Company",
                table: "Department");

            migrationBuilder.DropForeignKey(
                name: "FK_Surveyer_Dept_DeptId",
                table: "Surveyer_Dept");

            migrationBuilder.AddForeignKey(
                name: "FK_Department_Company",
                table: "Department",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Surveyer_Dept_DeptId",
                table: "Surveyer_Dept",
                column: "DeptId",
                principalTable: "Department",
                principalColumn: "DepartmentId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Department_Company",
                table: "Department");

            migrationBuilder.DropForeignKey(
                name: "FK_Surveyer_Dept_DeptId",
                table: "Surveyer_Dept");

            migrationBuilder.AddForeignKey(
                name: "FK_Department_Company",
                table: "Department",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Surveyer_Dept_DeptId",
                table: "Surveyer_Dept",
                column: "DeptId",
                principalTable: "Department",
                principalColumn: "DepartmentId");
        }
    }
}
