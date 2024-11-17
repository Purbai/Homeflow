using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using HomeFlow;
using HomeFlow.Models.Data;
using HomeFlow.SeedData;
using HomeFlow.Services;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.WithOrigins(builder.Configuration["Cors:Frontend"]!).AllowAnyMethod().AllowAnyHeader();
            });
        });

        builder
            .Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

        builder.Services.AddTransient<IPatientService, PatientService>();

        builder.Services.AddDbContext<HomeFlowContext>(options =>
        {
            options.UseNpgsql(builder.Configuration.GetConnectionString("Postgres"));
        });

        builder
            .Services.AddIdentity<User, Role>()
            .AddEntityFrameworkStores<HomeFlowContext>()
            .AddDefaultTokenProviders();
 
        builder.Services.AddTransient<SeedSupplier>();
        builder.Services.AddTransient<IUserService, UserService>();

        builder.Services.AddTransient<SeedPatientNeedType>();
        builder.Services.AddTransient<IPatientNeedTypeService, PatientNeedTypeService>();

        builder.Services.AddTransient<SeedPatient>();
        builder.Services.AddTransient<ISupplierService, SupplierService>(); 

        builder
            .Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.Default.GetBytes(builder.Configuration["Jwt:Secret"]!)
                    ),
                };
            });

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "JWTToken_Auth_API", Version = "v1" });
            c.AddSecurityDefinition(
                "Bearer",
                new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description =
                        "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
                }
            );
            c.AddSecurityRequirement(
                new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
                        },
                        new string[] { }
                    }
                }
            );
            c.OperationFilter<AuthorizationOperationFilter>();
        });

        var app = builder.Build();

        using (var scope = app.Services.CreateScope())
        {
            var supplierSeeder = scope.ServiceProvider.GetService<SeedSupplier>();
            supplierSeeder.SupplierSeed();
            var patientNeedTypeSeeder = scope.ServiceProvider.GetService<SeedPatientNeedType>();
            patientNeedTypeSeeder.PatientNeedTypeSeed();
        }

        if (app.Environment.IsDevelopment())
        {
            using (var scope = app.Services.CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                await SampleUsers.CreateAdminAsync(userManager);
                await SampleUsers.CreateUsersAsync(userManager);

                var patientSeeder = scope.ServiceProvider.GetService<SeedPatient>();
                patientSeeder.SeedPatients();
            }

            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors();
        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
