namespace NamecheapTest.Infrastructure.Models
{
    public class DbQuery
    {
        public DbQueryType Type { get; set; }
        public string Path { get; set; }
        public string Query { get; set; }
        public int Offset { get; set; }
        public int Limit { get; set; }
    }
}
