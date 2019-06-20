using NamecheapTest.DataAccess.Interfaces;
using NamecheapTest.Infrastructure;
using NamecheapTest.Infrastructure.Models;
using System;

namespace NamecheapTest.DataAccess.Firebase
{
    public class FirebaseDatabase : IDatabase
    {
        private bool inTransaction;
        public FirebaseDatabase()
        {
        }

        public void BeginTransaction()
        {
            //TODO Add firebase authentication process
            return;
        }

        public void CommitTransaction()
        {
            throw new NotImplementedException();
        }

        public GenericResponse<string> DoQuery(DbQuery query)
        {
            inTransaction = true;
            if (query.Type == DbQueryType.Storage)
            {
                var storageResult = FirebaseStorageConnection.Execute(query, (s, e) =>
                {
                    inTransaction = e.Percentage != 100;
                });
                inTransaction = false;
                return storageResult;
            }
            var databaseResult = FirebaseDatabaseConnection.Execute(query);
            inTransaction = false;
            return databaseResult;
        }

        public bool IsInTransaction()
        {
            return inTransaction;
        }

        public void RollbackTransaction()
        {
            return;
        }
    }
}
