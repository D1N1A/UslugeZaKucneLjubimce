using Microsoft.EntityFrameworkCore;
using System.Reflection;
using UslugeZaKucneLjubimce.Data;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UslugezaKucneLjubimce.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddKucniLjubimciSwaggerGen();
builder.Services.AddEdunovaCORS();

// dodavanje baze podataka
builder.Services.AddDbContext<KucniLjubimciContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString(name: "KucniLjubimciContext"))
);

// Security
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Moj kljuc koji je tajan i dovoljno dugaèak da se može koristiti")),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = false
    };
});

builder.Services.AddAuthorization();
// End Security


var app = builder.Build();



// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    // moguænost generiranja poziva rute u CMD i Powershell
    app.UseSwaggerUI(opcije =>
    {
        opcije.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
        opcije.ConfigObject.
        AdditionalItems.Add("requestSnippetsEnabled", true);
    });
//}

app.UseHttpsRedirection();

// Security
app.UseAuthentication();
app.UseAuthorization();
// End Security

app.MapControllers();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseDefaultFiles();
app.UseDeveloperExceptionPage();
app.MapFallbackToFile("index.html");

app.Run();
