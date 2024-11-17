using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HomeFlow.Models.Data;
using HomeFlow.Models.Request;
using HomeFlow.Models.Response;
using HomeFlow.Services;

namespace HomeFlow.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("/admin")]
//public class AdminController(ISightingsService sightingsService, IUserService userService) : Controller
public class AdminController( IUserService userService) : Controller
{
    // private readonly ISightingsService _sightingsService = sightingsService;

    private readonly IUserService _userService = userService;

/*     [HttpPut("approve/sighting={sightingId}")]
    public async Task<IActionResult> ApproveSighting([FromRoute] int sightingId)
    {
        try
        {
            await _sightingsService.ApproveSighting(sightingId);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    } */

    [HttpGet("users/username={username}")]
    public async Task<IActionResult> FindByName([FromRoute] string username)
    {
        User? matchingUser = _userService.FindByName(username).Result;
        if (matchingUser == null)
        {
            return NotFound();
        }
        return Ok(new UserResponse { Id = matchingUser.Id, UserName = matchingUser.UserName });
    }

    [HttpPut("users/update/{username}")]
    public async Task<IActionResult> UpdateUser(string username, UpdateUserRequest userRequest)
    {
        User? user = _userService.FindByName(username).Result;
        var errorResponse = new ErrorResponse();
        var generalErrors = new List<string>();

        if (user == null)
        {
            return NotFound();
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

    [HttpDelete("users/delete/{username}")]
    public async Task<IActionResult> DeleteUser([FromRoute] string username)
    {
        try
        {
            User? user = await _userService.FindByName(username);

            if (user is null)
            {
                return NotFound($"User {username} does not exist");
            }

            await _userService.Delete(user);
            return Ok($"User {username} has been deleted successfully");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

/*     [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        try
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    } */
}
