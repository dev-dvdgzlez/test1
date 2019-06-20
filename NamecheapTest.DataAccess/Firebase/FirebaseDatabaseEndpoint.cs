using NamecheapTest.Infrastructure.Helpers;

namespace NamecheapTest.DataAccess.Firebase
{
    public class FirebaseDatabaseEndpoint
    {
        public static string Users => ConfigurationHelper.FirebaseDatabaseUrl + $"user.json";
    }
}
