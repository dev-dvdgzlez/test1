using NamecheapTest.Infrastructure;
using NamecheapTest.Infrastructure.Models;

namespace NamecheapTest.DataAccess.Interfaces
{
    public interface IDatabase
    {
        GenericResponse<string> DoQuery(DbQuery query);
        void BeginTransaction();
        void RollbackTransaction();
        void CommitTransaction();
        bool IsInTransaction();
    }
}
