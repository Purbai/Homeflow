using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using HomeFlow.Enums;
using HomeFlow.Models.Data;
using HomeFlow.Models.Request;
using HomeFlow.Models.Response;

namespace HomeFlow.Controllers;

[ApiController]
[Route("/auth")]
public class AuthController(UserManager<User> userManager, RoleManager<Role> roleManager, IConfiguration configuration)
    : Controller
{
    private readonly UserManager<User> _userManager = userManager;
    private readonly RoleManager<Role> _roleManager = roleManager;
    private readonly IConfiguration _configuration = configuration;

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserRequest loginUserRequest)
    {
        var matchingUser = await _userManager.FindByNameAsync(loginUserRequest.UserName);
        if (matchingUser != null && await _userManager.CheckPasswordAsync(matchingUser, loginUserRequest.Password))
        {
            var matchingUserRoles = await _userManager.GetRolesAsync(matchingUser);
            var authClaims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, matchingUser.Id.ToString()),
                new(ClaimTypes.Name, matchingUser.UserName!),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            foreach (var role in matchingUserRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                expires: DateTime.UtcNow.AddHours(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.Default.GetBytes(_configuration["Jwt:Secret"]!)),
                    SecurityAlgorithms.HmacSha256
                )
            );
            return Ok(
                new TokenResponse
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    Expiration = token.ValidTo,
                    RoleType = token.Claims.ElementAt(3).Value
                }
            );
        }
        return Unauthorized();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserRequest registerUserRequest)
    {
        var newUser = new User
        {
            FirstName = registerUserRequest.FirstName,
            LastName = registerUserRequest.LastName,
            Email = registerUserRequest.Email,
            UserName = registerUserRequest.UserName,
            AboutMe = registerUserRequest.AboutMe
        };
        var result = await _userManager.CreateAsync(newUser, registerUserRequest.Password);
        if (!result.Succeeded)
        {
            var errorResponse = new ErrorResponse();
            var userNameErrors = new List<string>();
            var passwordErrors = new List<string>();
            var generalErrors = new List<string>();
            foreach (var error in result.Errors)
            {
                var errorCategory = error.Description switch
                {
                    var userNameError when userNameError.Contains("Username") => userNameErrors,
                    var passwordError when passwordError.Contains("Password") => passwordErrors,
                    _ => generalErrors,
                };
                errorCategory.Add(error.Description);
            }
            if (userNameErrors.Count > 0)
            {
                errorResponse.Errors["UserName"] = userNameErrors;
            }
            if (passwordErrors.Count > 0)
            {
                errorResponse.Errors["Password"] = passwordErrors;
            }
            if (generalErrors.Count > 0)
            {
                errorResponse.Errors["General"] = generalErrors;
            }
            return BadRequest(errorResponse);
        }
        await _userManager.AddToRoleAsync(newUser, RoleType.User.ToString());
        return CreatedAtAction(
            nameof(UserController.GetByUserName),
            nameof(UserController)[..^"Controller".Length],
            new { newUser.UserName },
            new UserResponse { Id = newUser.Id, UserName = newUser.UserName, }
        );
    }
}
