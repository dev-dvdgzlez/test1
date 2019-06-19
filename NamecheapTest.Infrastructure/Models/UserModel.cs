using NamecheapTest.Infrastructure.POCO;
using System.Collections.Generic;

namespace NamecheapTest.Infrastructure.Models
{
    public class UserModel : User
    {
        public string Selfie { get; set; }
        public List<string> AutomaticCaptures { get; set; }
    }
}
