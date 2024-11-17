using Microsoft.AspNetCore.Identity;
using HomeFlow.Migrations;
using HomeFlow.Models.Data;
using HomeFlow.Models.Response;

namespace HomeFlow.Services;

public interface IUserService
{
    public Task<User> FindByName(string userName);
    //public Task<UserLeaderBoardListResponse> GetLeaderBoardUserList();
    //public Task<ProfileListResponse> GetAllUsers();
    public Task<User> FindById(string userId);
    public Task Update(User user);
    public Task<IdentityResult> Delete(User user);
    //public Task AddPoint(string userId);
}

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;

    public UserService(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<User> FindByName(string userName)
    {
        return await _userManager.FindByNameAsync(userName);
    }

/*     public async Task<UserLeaderBoardListResponse> GetLeaderBoardUserList()
    {
        List<User> userList = _userManager.Users.OrderByDescending(u => u.TotalPointsEarned).ToList();
        UserLeaderBoardListResponse userLeaderBoardListResponse = new UserLeaderBoardListResponse();
        userLeaderBoardListResponse.SetList(userList.ToList());

        return userLeaderBoardListResponse;
    } */
/* 
    public async Task<ProfileListResponse> GetAllUsers()
    {
        List<User> userList = _userManager.Users.OrderBy(u => u.LastName).ToList();
        ProfileListResponse profileListResponse = new ProfileListResponse();
        profileListResponse.SetList(userList.ToList());

        return profileListResponse;
    } */

    public async Task<User> FindById(string userId)
    {
        return await _userManager.FindByIdAsync(userId);
    }

    public async Task Update(User user)
    {
        await _userManager.UpdateAsync(user);
    }

/*     public async Task AddPoint(string userId)
    {
        User? user = await _userManager.FindByIdAsync(userId);
        user.TotalPointsEarned += 1;
        await _userManager.UpdateAsync(user);
    }
 */
    public async Task<IdentityResult> Delete(User user)
    {
        return await _userManager.DeleteAsync(user);
    }
}
