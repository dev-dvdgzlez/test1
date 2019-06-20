using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;

namespace NamecheapTest.Controllers
{
    public class UtilsController : ControllerBase
    {
        public IActionResult JsonContent<T>(T dataObject)
        {
            return new ContentResult
            {
                StatusCode = (int)HttpStatusCode.OK,
                Content = JsonConvert.SerializeObject(dataObject),
                ContentType = "application/json"
            };
        }
    }
}
