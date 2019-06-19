using Microsoft.AspNetCore.Mvc;
using NamecheapTest.Infrastructure;
using NamecheapTest.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NamecheapTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET api/users
        [HttpGet]
        public ActionResult<GenericResponse<List<UserModel>>> Get(int offset, int limit)
        {
            if (offset == 0 && limit == 0)
            {
                limit = 20;
            }
            return GenericResponse<List<UserModel>>.Successful(new List<UserModel> { new UserModel { Name = "David Gonzalez", Email = "dvdgzlez@gmail.com", Selfie = "123123", AutomaticCaptures = new List<string> { "313123", "400121" } } });
        }

        [HttpPost]
        public ActionResult<GenericResponse> Add([FromBody] UserModel user)
        {
            return GenericResponse.Successful();
        }
    }
}
