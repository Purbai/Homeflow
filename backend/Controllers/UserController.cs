using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using HomeFlow.Models.Data;
using HomeFlow.Models.Request;
using HomeFlow.Models.Response;
using HomeFlow.Services;

namespace HomeFlow.Controllers;

[Authorize]
[ApiController]
[Route("/users")]
public class UserController(IUserService userService) : Controller
{
    private readonly IUserService _userService = userService;

    [HttpGet("{userName}")]
    public IActionResult GetByUserName([FromRoute] string userName)
    {
        User? matchingUser = _userService.FindByName(userName).Result;

        if (matchingUser == null)
        {
            return NotFound();
        }
        return Ok(new UserResponse { Id = matchingUser.Id, UserName = matchingUser.UserName, });
    }

/*     [HttpGet("profile")]
    public IActionResult GetUserProfile()
    {
        string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        User? user = _userService.FindById(userId).Result;
        if (user == null)
        {
            return NotFound();
        }
        return Ok(
            new ProfileResponse
            {
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                TotalPointsEarned = user.TotalPointsEarned,
                AboutMe = user.AboutMe
            }
        );
    } */

/*     [HttpGet("leaderboard")]
    public ActionResult<List<User>> GetLeaderBoardUserList()
    {
        try
        {
            var users = _userService.GetLeaderBoardUserList();
            return Ok(users);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    } */

    [HttpPut("update")]
    public async Task<IActionResult> UpdateUser(UpdateUserRequest userRequest)
    {
        try
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User? user = _userService.FindById(userId).Result;
            var errorResponse = new ErrorResponse();
            var generalErrors = new List<string>();

            if (user == null)
            {
                return NotFound();
            }

            if (user.IsSuspended)
            {
                errorResponse.Errors["User is suspended"] = generalErrors;
                return BadRequest(errorResponse);
            }

            if (userRequest.FirstName != null)
            {
                user.FirstName = userRequest.FirstName;
            }
            if (userRequest.LastName != null)
            {
                user.LastName = userRequest.LastName;
            }
            if (userRequest.AboutMe != null)
            {
                user.AboutMe = userRequest.AboutMe;
            }

            await _userService.Update(user);

            return Ok(
                new UpdateUserResponse
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    AboutMe = user.AboutMe
                }
            );
        }
        catch (NullReferenceException ex)
        {
            return BadRequest($"User identifier not found. {ex.Message}");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("")]
    public async Task<IActionResult> Delete()
    {
        try
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            User? user = _userService.FindById(userId).Result;

            if (user == null)
            {
                return NotFound();
            }

            IdentityResult result = _userService.Delete(user).Result;

            if (!result.Succeeded)
            {
                var errorResponse = new ErrorResponse();
                var generalErrors = new List<string>();
                foreach (var error in result.Errors)
                {
                    generalErrors.Add(error.Description);
                }
                errorResponse.Errors["General"] = generalErrors;
                return BadRequest(errorResponse);
            }

            return Ok();
        }
        catch (NullReferenceException ex)
        {
            return BadRequest($"User identifier not found. {ex.Message}");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
