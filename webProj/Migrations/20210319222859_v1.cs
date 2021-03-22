using Microsoft.EntityFrameworkCore.Migrations;

namespace webProj.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlesneSkole",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlesneSkole", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Plesovi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Oznaka = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaxBrUcenika = table.Column<int>(type: "int", nullable: false),
                    TrBrUcenika = table.Column<int>(type: "int", nullable: false),
                    PlesnaSkolaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plesovi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Plesovi_PlesneSkole_PlesnaSkolaID",
                        column: x => x.PlesnaSkolaID,
                        principalTable: "PlesneSkole",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Ucenici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PLesID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ucenici", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Ucenici_Plesovi_PLesID",
                        column: x => x.PLesID,
                        principalTable: "Plesovi",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Plesovi_PlesnaSkolaID",
                table: "Plesovi",
                column: "PlesnaSkolaID");

            migrationBuilder.CreateIndex(
                name: "IX_Ucenici_PLesID",
                table: "Ucenici",
                column: "PLesID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ucenici");

            migrationBuilder.DropTable(
                name: "Plesovi");

            migrationBuilder.DropTable(
                name: "PlesneSkole");
        }
    }
}
