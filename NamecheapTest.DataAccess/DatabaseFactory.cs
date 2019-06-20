using NamecheapTest.DataAccess.Firebase;
using NamecheapTest.DataAccess.Interfaces;
using NamecheapTest.Infrastructure.Enums;
using NamecheapTest.Infrastructure.Helpers;
using System;

namespace NamecheapTest.DataAccess
{
    public class DatabaseFactory
    {
        public DatabaseFactory() { }

        public IDatabase GetDatabase()
        {
            var databaseType = ConfigurationHelper.DatabaseType;

            IDatabase database;

            switch (databaseType)
            {
                case DatabaseEnum.Firebase:
                    database = new FirebaseDatabase();
                    break;
                /*case DatabaseEnum.SQL:
                    database = new SQLDatabase();
                    break;*/
                default:
                    throw new Exception("Database not implemented.");
            }

            return database;
        }
    }
}
