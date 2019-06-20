using NamecheapTest.DataAccess;
using NamecheapTest.DataAccess.Interfaces;
using NamecheapTest.Infrastructure;
using NamecheapTest.Infrastructure.Models;
using NamecheapTest.Infrastructure.POCO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace NamecheapTest.Selfie
{
    public class SelfieManager
    {
        private readonly DatabaseFactory databaseFactory;
        private IDatabase database;

        public SelfieManager()
        {
            databaseFactory = new DatabaseFactory();
        }

        public GenericResponse AddUser(UserModel user)
        {
            database = databaseFactory.GetDatabase();
            database.BeginTransaction();
            var selfieResult = database.DoQuery(new DbQuery
            {
                Type = DbQueryType.Storage,
                Query = user.Selfie,
                Path = Guid.NewGuid().ToString() + user.Name.Replace(" ", "-")
            });

            if (!selfieResult.Success)
            {
                return GenericResponse.ErrorMessage(selfieResult.Message);
            }

            user.SelfieUrl = selfieResult.Result;
            user.AutomaticCaptureUrls = new List<string>();
            foreach (var automaticCapture in user.AutomaticCaptures)
            {
                selfieResult = database.DoQuery(new DbQuery
                {
                    Type = DbQueryType.Storage,
                    Query = automaticCapture,
                    Path = Guid.NewGuid().ToString() + user.Name.Replace(" ", "-")
                });

                if (!selfieResult.Success)
                {
                    return GenericResponse.ErrorMessage(selfieResult.Message);
                }
                user.AutomaticCaptureUrls.Add(selfieResult.Result);
            }

            var result = database.DoQuery(new DbQuery
            {
                Type = DbQueryType.Add,
                Query = JsonConvert.SerializeObject(new User
                {
                    Email = user.Email,
                    Name = user.Name,
                    AutomaticCaptureUrls = user.AutomaticCaptureUrls,
                    SelfieUrl = user.SelfieUrl
                })
            });

            return result.Success ? GenericResponse.Successful() : GenericResponse.ErrorMessage(result.Message);
        }

        public GenericResponse<string> GetUsers(int offset, int limit)
        {
            database = databaseFactory.GetDatabase();
            database.BeginTransaction();
            var databaseResult = database.DoQuery(new DbQuery
            {
                Type = DbQueryType.Get,
                Limit = limit,
                Offset = offset
            });
            
            return databaseResult;
        }
    }
}
