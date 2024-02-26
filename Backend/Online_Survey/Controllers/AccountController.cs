﻿using Google.Apis.Auth;
using Mailjet.Client.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Online_Survey.Areas.Identity.Data;
using Online_Survey.DTOs.Account;
using Online_Survey.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Online_Survey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly JWTServices _jwtService;
        private readonly SignInManager<Online_SurveyUser> _signInManager;
        private readonly UserManager<Online_SurveyUser> _userManager;
        private readonly EmailService _emailService;
        private readonly IConfiguration _config;
        public AccountController(JWTServices jwtServices, SignInManager<Online_SurveyUser> signInManager, UserManager<Online_SurveyUser> userManager,EmailService emailService,IConfiguration config)
        {
            _jwtService = jwtServices;
            _signInManager = signInManager;
            _userManager = userManager;
            _emailService = emailService;
            _config = config;
            

        }

        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var userDtos = users.Select(user => CreateApplicationUserDto(user)).ToList();
            return Ok(userDtos);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return Unauthorized("Invalid UserName or Password.");
            }

            if (user.EmailConfirmed == false) return Unauthorized("Please Confirm Your Email.");

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized("Invalid UserName or Password.");
            }

            return  CreateApplicationUserDto(user);

        }

        [HttpPost("Register")]

        public async Task<ActionResult> Register(RegisterDto model)
        {
            if (await CheckEmailExistsAsync(model.Email))
            {
                return BadRequest($"{model.Email} Already Exists.");
            }

            var userToAdd = new Online_SurveyUser
            {
                FirstName = model.FirstName.ToLower(),
                LastName = model.LastName.ToLower(),
                UserName = model.Email.ToLower(),
                Email = model.Email.ToLower(),
                Role="user",
                Provider="Normal"

            };

            var result = await _userManager.CreateAsync(userToAdd, model.Password);

            if (!result.Succeeded) { return BadRequest(result.Errors); }



           // return Ok(new JsonResult(new { title = "Account Created", message = "Your Account Has Been Created, Confirm your Email." }));

             try
               {
                   if (await SendConfirmEmailAsync(userToAdd))
                   {
                       return Ok(new JsonResult(new { title = "Account Created", message = "Your Account Has Been Created, Confirm your Email." }));
                   }
                   return BadRequest("Failed to send mail.Try to contact Admin.");
               }
               catch (Exception)
               {
                   return BadRequest("Failed to send mail.Try to contact Admin.");
               }
            



        }

        [HttpPut("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(ConfirmEmailDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Unauthorized("This mail address is not register yet.");
            }

            if (user.EmailConfirmed == true) return BadRequest("Your Email was confirmed before.Please login to your account.");

            try
            {
                var decodedTokenBytes = WebEncoders.Base64UrlDecode(model.Token);
                var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);

                var result = await _userManager.ConfirmEmailAsync(user, decodedToken);
                if (result.Succeeded)
                {
                    return Ok(new JsonResult(new { title = "Email Confirmed", message = "You can Login now." }));
                }

                return BadRequest("Invalid Token.Please try agian.");
            }
            catch (Exception)
            {
                return BadRequest("Invalid Token.Please try agian.");
            }
        }
        [HttpPost("resend-email-confirmation-link/{email}")]

        public async Task<IActionResult> ResendEmailConfirmationLink(string email)
        {
            if (string.IsNullOrEmpty(email)) return BadRequest("Invalid Email.");
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return Unauthorized("This Email Address has not ben registered yet");
            }
            if (user.EmailConfirmed == true) { return BadRequest("Already confirmed.Please Login ."); }

            try
            {
                if (await SendConfirmEmailAsync(user))
                {
                    return Ok(new JsonResult(new { title = "Confirmation link sent.", message = "Please confirm your email address." }));
                }

                return BadRequest("Failed to send email.Please contact admin.");
            }
            catch (Exception)
            {
                return BadRequest("Failed to send email.Please contact admin.");
            }
        }
        [HttpPost("forgot-username-or-password/{email}")]
        public async Task<IActionResult> ForgotUsernameOrPassword(string email)
        {
            if (string.IsNullOrEmpty(email)) { return BadRequest("Invalid Email"); }

            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return Unauthorized("This Email Address has not ben registered yet");
            }
            if (user.EmailConfirmed == false) { return BadRequest("Confirm First."); }

            try
            {
                if (await SendForgotUsernameOrPasswordEmail(user))
                {
                    return Ok(new JsonResult(new { title = "Forgot username or password email sent", message = "Please check email." }));

                }
                return BadRequest("Failed to send email.Please contact admin.");
            }
            catch (Exception)
            {
                return BadRequest("Failed to send email.Please contact admin.");
            }




        }

        [HttpPut("reset-password")]

        public async Task<IActionResult> ResetPassword(ResetPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null) { return Unauthorized("This email address has not ben registered yet."); }
            if (user.EmailConfirmed == false) { return BadRequest("Confirm your email address first"); }

            try
            {
                var decodedTokenBytes = WebEncoders.Base64UrlDecode(model.Token);
                var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);

                var result = await _userManager.ResetPasswordAsync(user, decodedToken, model.NewPassword);
                if (result.Succeeded)
                {
                    return Ok(new JsonResult(new { title = "password Reset Done.", message = "Your password has been changed." }));
                }

                return BadRequest("Invalid Token.Please try agian.");
            }
            catch (Exception)
            {
                return BadRequest("Invalid Token.Please try agian.");
            }

        }
        [HttpPost("login-with-third-party")]
        public async Task<ActionResult<UserDto>> LoginWithThirdParty(LoginWithExternal model)
        {
            /* if (model.Provider.Equals(SD.Facebook))
             {
                 try
                 {
                     if (!FacebookValidatedAsync(model.AccessToken, model.UserId).GetAwaiter().GetResult())
                     {
                         return Unauthorized("Unable to login with facebook");
                     }
                 }
                 catch (Exception)
                 {
                     return Unauthorized("Unable to login with facebook");
                 }
             }
             else */

            if (model.Provider.Equals(SD.Google))
            {
                try
                {
                    if (!GoogleValidatedAsync(model.AccessToken, model.UserId).GetAwaiter().GetResult())
                    {
                        return Unauthorized("Unable to login with google");
                    }
                }
                catch (Exception)
                {
                    return Unauthorized("Unable to login with google");
                }
            }
            else
            {
                return BadRequest("Invalid provider");
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == model.UserId && x.Provider == model.Provider);
            if (user == null) return Unauthorized("Unable to find your account");

            return  CreateApplicationUserDto(user);
        }
        [HttpPost("register-with-third-party")]
        public async Task<ActionResult<UserDto>> RegisterWithThirdParty(RegisterWithExternal model)
        {
            if (model.Provider.Equals(SD.Google))
            {
                try
                {
                    if (!GoogleValidatedAsync(model.AccessToken, model.UserId).GetAwaiter().GetResult())
                    {
                        return Unauthorized("Unable to register with google");
                    }
                }
                catch (Exception)
                {
                    return Unauthorized("Unable to register with google");
                }
            }
            else
            {
                return BadRequest("Invalid provider");
            }

            var existingUser = await _userManager.FindByNameAsync(model.UserId);
            if (existingUser != null)
            {
                return BadRequest($"User  already exists.");
            }

            // Check if email already exists in database
            var existingEmailUser = await _userManager.FindByEmailAsync(model.Email);
            if (existingEmailUser != null)
            {
                return BadRequest($"Email address {model.Email} is already registered with another account.");
            }

            var userToAdd = new Online_SurveyUser
            {
                FirstName = model.FirstName.ToLower(),
                LastName = model.LastName.ToLower(),
                UserName = model.UserId,
                Email = model.Email.ToLower(), // Store email address
                Provider = model.Provider,
                Role="user"
            };

            var result = await _userManager.CreateAsync(userToAdd);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return CreateApplicationUserDto(userToAdd);
        }


        [Authorize]
        [HttpGet("refresh-user-token")]

        public async Task<ActionResult<UserDto>> RefreshUserToken()
        {
            var user = await _userManager.FindByNameAsync(User.FindFirst(ClaimTypes.Email)?.Value);
            return  CreateApplicationUserDto(user);
        }

        #region

        private UserDto CreateApplicationUserDto(Online_SurveyUser user)
        {
            return new UserDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Role=  user.Role,
                Id= user.Id,
                JWT =  _jwtService.CreateJWT(user),

            };
        }


        private async Task<bool> CheckEmailExistsAsync(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());

        }

        private async Task<bool> SendConfirmEmailAsync(Online_SurveyUser user)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var url = $"{_config["JWT:ClientUrl"]}/{_config["Email:ConfirmEmailPath"]}?token={token}&email={user.Email}";

            var body = $"<p>Hello : {user.FirstName} {user.LastName}</p> " +

                "<p>Please confirm your email by clicking on the following link.</p>" +

                $"<p><a href=\"{url}\">Click Here</a></p>" +
                "<p>Thank You</p>" +
                $"<br>{_config["Email:ApplicationName"]}";

            var emailSend = new EmailSendDto(user.Email, "Confirm Your Email", body);

            return await _emailService.SendEmailAsync(emailSend);
        }

        private async Task<bool> SendForgotUsernameOrPasswordEmail(Online_SurveyUser user)
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var url = $"{_config["JWT:ClientUrl"]}/{_config["Email:ResetPasswordPath"]}?token={token}&email={user.Email}";

            var body = $"<p>Hello : {user.FirstName} {user.LastName}</p> " +

               $"<p>UserName:{user.UserName}</p>" +

               $"<p><a href=\"{url}\">Click Here</a></p>" +
               "<p>Thank You</p>" +
               $"<br>{_config["Email:ApplicationName"]}";

            var emailSend = new EmailSendDto(user.Email, "Forgot username or password", body);

            return await _emailService.SendEmailAsync(emailSend);

        }

        private async Task<bool> GoogleValidatedAsync(string accessToken, string userId)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(accessToken);

            if (!payload.Audience.Equals(_config["Google:ClientId"]))
            {
                return false;
            }

            if (!payload.Issuer.Equals("accounts.google.com") && !payload.Issuer.Equals("https://accounts.google.com"))
            {
                return false;
            }

            if (payload.ExpirationTimeSeconds == null)
            {
                return false;
            }

            DateTime now = DateTime.Now.ToUniversalTime();
            DateTime expiration = DateTimeOffset.FromUnixTimeSeconds((long)payload.ExpirationTimeSeconds).DateTime;
            if (now > expiration)
            {
                return false;
            }

            if (!payload.Subject.Equals(userId))
            {
                return false;
            }

            return true;
        }

        #endregion
    }
}
