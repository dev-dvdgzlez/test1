using Microsoft.AspNetCore.Mvc;
using NamecheapTest.Infrastructure;
using NamecheapTest.Infrastructure.Models;
using NamecheapTest.Selfie;
using System.Collections.Generic;

namespace NamecheapTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : UtilsController
    {
        // GET api/users
        [HttpGet]
        public IActionResult Get(int offset, int limit)
        {
            if (offset == 0 && limit == 0)
            {
                limit = 20;
            }
            return JsonContent(new SelfieManager().GetUsers(offset, limit));
        }

        // POST api/users
        [HttpPost]
        public IActionResult Add([FromBody] UserModel user)
        {
            return JsonContent(new SelfieManager().AddUser(user));
        }
    }
}
