using NamecheapTest.Infrastructure.Enums;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace NamecheapTest.Infrastructure.Helpers
{
    public class RequestHelper<TR>
    {
        private static bool _hasContent;
        private static bool _shouldNotParseJson;
        private static GenericResponse<string> _unparsedResponse;

        public static async Task<GenericResponse<TR>> GetRequest(string url)
        {
            _hasContent = false;
            _shouldNotParseJson = false;
            return await BaseRequest(url, HttpMethodEnum.Get, false);
        }

        public static async Task<GenericResponse<string>> GetStringRequest(string url)
        {
            _hasContent = false;
            _shouldNotParseJson = true;
            await BaseRequest(url, HttpMethodEnum.Get, false);
            return _unparsedResponse;
        }

        public static async Task<GenericResponse<TR>> PostRequest<T>(T payload, string url)
        {
            _hasContent = true;
            _shouldNotParseJson = false;
            return await BaseRequest(url, HttpMethodEnum.Post, payload);
        }

        public static async Task<GenericResponse<TR>> PostRequest(string url)
        {
            _hasContent = false;
            _shouldNotParseJson = false;
            return await BaseRequest(url, HttpMethodEnum.Post, false);
        }

        public static async Task<GenericResponse<TR>> PutRequest<T>(T payload, string url)
        {
            _hasContent = true;
            _shouldNotParseJson = false;
            return await BaseRequest(url, HttpMethodEnum.Put, payload);
        }

        public static async Task<GenericResponse<TR>> PutRequest(string url)
        {
            _hasContent = false;
            _shouldNotParseJson = false;
            return await BaseRequest(url, HttpMethodEnum.Put, false);
        }

        public static async Task<GenericResponse<TR>> DeleteRequest(string url)
        {
            _hasContent = false;
            _shouldNotParseJson = false;
            return await BaseRequest(url, HttpMethodEnum.Delete, false);
        }

        private static async Task<GenericResponse<TR>> BaseRequest<T>(string url, HttpMethodEnum method, T payload)
        {
            try
            {
                var httpHandler = new HttpClientHandler();
                httpHandler.ServerCertificateCustomValidationCallback += (message, cert, chain, errors) => true;
                var client = new HttpClient(httpHandler);
                StringContent content = null;

                if (_hasContent)
                {
                    client.DefaultRequestHeaders.ConnectionClose = true;
                    content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
                }

                Console.WriteLine($"Requesting [{url}]");

                HttpResponseMessage response;

                switch (method)
                {
                    case HttpMethodEnum.Get:
                        response = await client.GetAsync(url);
                        break;
                    case HttpMethodEnum.Post:
                        response = await client.PostAsync(url, content);
                        break;
                    case HttpMethodEnum.Put:
                        response = await client.PutAsync(url, content);
                        break;
                    case HttpMethodEnum.Delete:
                        response = await client.DeleteAsync(url);
                        break;
                    default:
                        client?.Dispose();
                        client = null;
                        content?.Dispose();
                        content = null;
                        return GenericResponse<TR>.ErrorMessage($"{url} Unknown http method");
                }

                client?.Dispose();
                client = null;
                content?.Dispose();
                content = null;

                if (response.IsSuccessStatusCode)
                {

                    string responseContent = await response.Content.ReadAsStringAsync();
                    if (_shouldNotParseJson)
                    {
                        response?.Dispose();
                        response = null;
                        _unparsedResponse = GenericResponse<string>.Successful(responseContent);
                        return null;
                    }
                    if (responseContent.Contains("GenericResponse"))
                    {
                        var resultWeappedObject =
                            JsonConvert.DeserializeObject<GenericResponse<TR>>(responseContent);
                        response?.Dispose();
                        response = null;
                        return resultWeappedObject;
                    }
                    else
                    {
                        var resultObject = JsonConvert.DeserializeObject<TR>(responseContent);
                        response?.Dispose();
                        response = null;
                        return GenericResponse<TR>.Successful(resultObject);
                    }
                }
                else
                {
                    var errorMessage = $"{url} ({response.ReasonPhrase})";
                    response?.Dispose();
                    response = null;
                    return GenericResponse<TR>.ErrorMessage(errorMessage);
                }
            }
            catch (Exception ex)
            {
                return GenericResponse<TR>.ErrorMessage($"{url} ({ex})");
            }
        }

    }
}
