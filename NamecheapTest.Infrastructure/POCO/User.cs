using System;
using System.Collections.Generic;

namespace NamecheapTest.Infrastructure.POCO
{
    public class User
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string SelfieUrl { get; set; }
        public List<string> AutomaticCaptureUrls { get; set; }

        public virtual GenericResponse Validate()
        {
            if (string.IsNullOrEmpty(Name))
            {
                return GenericResponse.ErrorMessage("Name is not set");
            }
            if (string.IsNullOrEmpty(Email))
            {
                return GenericResponse.ErrorMessage("Email is not set");
            }
            if (!IsValidEmail(Email))
            {
                return GenericResponse.ErrorMessage("Invalid email format");
            }
            return GenericResponse.Successful();
        }

        public virtual GenericResponse ValidateUrls()
        {
            if (string.IsNullOrEmpty(SelfieUrl))
            {
                return GenericResponse.ErrorMessage("Selfie Url is not set");
            }
            var selfieResult = Uri.IsWellFormedUriString(SelfieUrl, UriKind.Absolute);

            if (!selfieResult)
            {
                return GenericResponse.ErrorMessage("Invalid Selfie Url format");
            }

            if (AutomaticCaptureUrls == null || AutomaticCaptureUrls.Count == 0)
            {
                return GenericResponse.ErrorMessage("Automatic Capture Urls not set");
            }
            bool result;
            foreach (var url in AutomaticCaptureUrls)
            {
                result = Uri.IsWellFormedUriString(url, UriKind.Absolute);
                if (!result)
                {
                    return GenericResponse.ErrorMessage("Invalid Automatic Capture Urls format");
                }
            }

            if (AutomaticCaptureUrls.Count > 5)
            {
                return GenericResponse.ErrorMessage("Error: more than five automatic capture urls");
            }
            return GenericResponse.Successful();
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
}
