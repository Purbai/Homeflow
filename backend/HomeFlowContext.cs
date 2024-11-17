using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using HomeFlow.Enums;
using HomeFlow.Models.Data;

namespace HomeFlow;

public class HomeFlowContext(DbContextOptions<HomeFlowContext> options)
    : IdentityDbContext<User, Role, int>(options)
{
    public DbSet<Patient> Patient { get; set; }
    public DbSet<Beds> Beds { get; set; }
    public DbSet<CarePackage> CarePackage { get; set; }
    public DbSet<PatientCare> PatientCare { get; set; }
    public DbSet<PatientNeedType> PatientNeedType { get; set; }
    public DbSet<Provider> Provider { get; set; }
    public DbSet<Supplier> Supplier { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        var userRole = new Role
        {
            Id = (int)RoleType.User,
            Name = RoleType.User.ToString(),
            NormalizedName = RoleType.User.ToString().ToUpper(),
        };
        var adminRole = new Role
        {
            Id = (int)RoleType.Admin,
            Name = RoleType.Admin.ToString(),
            NormalizedName = RoleType.Admin.ToString().ToUpper(),
        };
        builder.Entity<Role>().HasData(userRole, adminRole);

        builder.Entity<Supplier>(builder =>
        {
            builder.HasMany(e => e.CarePackage).WithOne(e => e.Supplier).HasForeignKey(e => e.SupplierId).IsRequired();
        });
        builder.Entity<Provider>(builder =>
        {
            builder.HasMany(e => e.PatientCare).WithOne(e => e.Provider).HasForeignKey(e => e.ProviderId).IsRequired();
        });
    }
}
