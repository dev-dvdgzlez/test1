using Firebase.Storage;
using NamecheapTest.Infrastructure;
using NamecheapTest.Infrastructure.Helpers;
using NamecheapTest.Infrastructure.Models;
using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace NamecheapTest.DataAccess.Firebase
{
    public class FirebaseStorageConnection
    {
        private static FirebaseStorageTask storage;
        private static EventHandler<FirebaseStorageProgress> _eventHandler;

        public static GenericResponse<string> Execute(DbQuery query, EventHandler<FirebaseStorageProgress> eventHandler)
        {
            try
            {
                _eventHandler = eventHandler;
                return InsertStorage(query);
            }
            catch (Exception ex)
            {
                return GenericResponse<string>.ErrorMessage(ex.Message);
            }
        }

        private static GenericResponse<string> InsertStorage(DbQuery query)
        {
            var base64Data = Regex.Match(query.Query, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
            var binData = Convert.FromBase64String(base64Data);
            string url = "";
            using (var stream = new MemoryStream(binData))
            {
                storage = new FirebaseStorage(ConfigurationHelper.FirebaseStorageUrl)
                    .Child("user")
                    .Child($"{query.Path}.png")
                    .PutAsync(stream);

                storage.Progress.ProgressChanged += _eventHandler;
                url = Task.Run(async () =>
                {
                    var downloadUrl = await storage;
                    return downloadUrl;
                }).Result;
            }

            return GenericResponse<string>.Successful(url);
        }
    }
}
