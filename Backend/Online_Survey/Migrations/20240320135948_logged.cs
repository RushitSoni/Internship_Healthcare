using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Online_Survey.Migrations
{
    /// <inheritdoc />
    public partial class logged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsLogged",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsLogged",
                table: "AspNetUsers");
        }
    }
}
