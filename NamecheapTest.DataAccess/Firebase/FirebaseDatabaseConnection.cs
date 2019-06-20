using NamecheapTest.Infrastructure;
using NamecheapTest.Infrastructure.Helpers;
using NamecheapTest.Infrastructure.Models;
using NamecheapTest.Infrastructure.POCO;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NamecheapTest.DataAccess.Firebase
{
    public class FirebaseDatabaseConnection
    {
        public static GenericResponse<string> Execute(DbQuery query)
        {
            switch (query.Type)
            {
                case DbQueryType.Get:
                    var getResult = Task.Run(() => RequestHelper<List<User>>.GetStringRequest(FirebaseDatabaseEndpoint.Users)).Result;
                    return getResult;
                case DbQueryType.Add:
                    var addResult = Task.Run(() => RequestHelper<User>.PostRequest(JsonConvert.DeserializeObject<User>(query.Query), FirebaseDatabaseEndpoint.Users)).Result;
                    return GenericResponse<string>.Successful(JsonConvert.SerializeObject(addResult));
                case DbQueryType.Update:
                    var updateResult = Task.Run(() => RequestHelper<User>.PutRequest(JsonConvert.DeserializeObject<User>(query.Query), FirebaseDatabaseEndpoint.Users)).Result;
                    return GenericResponse<string>.Successful(JsonConvert.SerializeObject(updateResult));
                case DbQueryType.Delete:
                    var deleteResult = Task.Run(() => RequestHelper<User>.DeleteRequest(FirebaseDatabaseEndpoint.Users)).Result;
                    return GenericResponse<string>.Successful(JsonConvert.SerializeObject(deleteResult));
                default:
                    return GenericResponse<string>.ErrorMessage("Database query type not implemented.");
            }
        }
    }
}
