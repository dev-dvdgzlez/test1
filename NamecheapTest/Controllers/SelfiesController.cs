using Microsoft.AspNetCore.Mvc;

namespace NamecheapTest.Controllers
{
    public class SelfiesController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult List()
        {
            return View();
        }
    }
}
