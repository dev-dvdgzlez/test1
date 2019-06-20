using System.Collections.Generic;

namespace NamecheapTest.Infrastructure.POCO
{
    public class User
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string SelfieUrl { get; set; }
        public List<string> AutomaticCaptureUrls { get; set; }
    }
}
