namespace NamecheapTest.Infrastructure
{
    public class GenericResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public GenericResponse() { }
        public static GenericResponse Successful()
        {
            return new GenericResponse { Success = true, Message = string.Empty };
        }
        public static GenericResponse ErrorMessage(string message)
        {
            return new GenericResponse { Success = false, Message = message };
        }
    }

    public class GenericResponse<T>
    {
        public bool Success { get; set; }
        public T Result { get; set; }
        public string Message { get; set; }
        public GenericResponse() { }
        public static GenericResponse<T> Successful(T result)
        {
            return new GenericResponse<T> { Success = true, Result = result, Message = string.Empty };
        }
        public static GenericResponse<T> ErrorMessage(string message)
        {
            return new GenericResponse<T> { Success = false, Result = default, Message = message };
        }
    }
}
