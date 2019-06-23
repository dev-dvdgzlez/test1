using NamecheapTest.Infrastructure.POCO;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace NamecheapTest.Infrastructure.Models
{
    public class UserModel : User
    {
        public string Selfie { get; set; }
        public List<string> AutomaticCaptures { get; set; }

        public override GenericResponse Validate()
        {
            var firstReview = base.Validate();
            if (!firstReview.Success) return firstReview;
            var secondReview = ValidateSelfie();
            if (!secondReview.Success) return secondReview;
            var thirdReview = ValidateAutomaticCaptures();
            if (!thirdReview.Success) return thirdReview;
            return GenericResponse.Successful();
        }

        public override GenericResponse ValidateUrls()
        {
            var firstReview = base.Validate();
            if (!firstReview.Success) return firstReview;

            var secondReview = base.ValidateUrls();
            return secondReview;
        }

        private GenericResponse ValidateSelfie()
        {
            if (string.IsNullOrEmpty(Selfie)) return GenericResponse.ErrorMessage("Selfie is not set");
            var result = Regex.IsMatch(Selfie, @"data:image/(?<type>.+?),(?<data>.+)");
            return result ? GenericResponse.Successful() :
                GenericResponse.ErrorMessage("Invalid selfie format");
        }

        private GenericResponse ValidateAutomaticCaptures()
        {
            if (AutomaticCaptures == null || AutomaticCaptures.Count == 0)
            {
                return GenericResponse.ErrorMessage("Automatic captures not set");
            }
            bool result;
            foreach (var capture in AutomaticCaptures)
            {
                result = Regex.IsMatch(capture, @"data:image/(?<type>.+?),(?<data>.+)");
                if (!result)
                {
                    return GenericResponse.ErrorMessage("Invalid automatic captures");
                }
            }
            if (AutomaticCaptures.Count > 5)
            {
                return GenericResponse.ErrorMessage("Error: more than five captures received");
            }
            return GenericResponse.Successful();
        }
    }
}
