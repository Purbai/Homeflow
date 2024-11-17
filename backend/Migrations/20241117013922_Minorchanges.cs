using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFlow.Migrations
{
    /// <inheritdoc />
    public partial class Minorchanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NeedTypeId",
                table: "Patient");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NeedTypeId",
                table: "Patient",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
