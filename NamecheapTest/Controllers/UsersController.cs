using Microsoft.AspNetCore.Mvc;
using NamecheapTest.Infrastructure.Models;
using NamecheapTest.Selfie;

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
            var validation = user.Validate();
            if (!validation.Success)
            {
                return JsonContent(validation);
            }
            return JsonContent(new SelfieManager().AddUser(user));
        }
    }
}
