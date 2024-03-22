using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Online_Survey.Migrations.InternshipOnlineSurvey
{
    /// <inheritdoc />
    public partial class ts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Timestamp",
                table: "Company",
                type: "rowversion",
                rowVersion: true,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "Company");
        }
    }
}
