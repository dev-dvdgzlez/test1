using NamecheapTest.Infrastructure.Models;
using Xunit;
using Xunit.Abstractions;

namespace NamecheapTest.Tests
{
    public class UserModelTests
    {
        private readonly ITestOutputHelper output;
        private readonly UserModel userModel;
        public UserModelTests(ITestOutputHelper _output)
        {
            userModel = new UserModel();
            output = _output;
        }

        [Fact]
        public void ValidateUserNameAndReturnFalseAndNameIsNotSet()
        {
            //Arrange
            userModel.Name = string.Empty;

            //Act
            var result = userModel.Validate();

            //Assert
            Assert.True(!result.Success);
            Assert.Equal("Name is not set", result.Message);
        }

        [Fact]
        public void ValidateUserEmailAndReturnFalseAndEmailNotSet()
        {
            //Arrange
            userModel.Name = UserModelConstants.UserName;
            userModel.Email = string.Empty;

            //Act
            var result = userModel.Validate();

            //Assert
            Assert.True(!result.Success);
            Assert.Equal("Email is not set", result.Message);
        }

        [Fact]
        public void ValidateUserEmailAndReturnFalseAndInvalidEmail()
        {
            //Arrange
            userModel.Name = UserModelConstants.UserName;
            userModel.Email = UserModelConstants.InvalidEmail;

            //Act
            var result = userModel.Validate();

            //Assert
            Assert.True(!result.Success);
            Assert.Equal("Invalid email format", result.Message);
        }

        [Fact]
        public void ValidateUserSelfieAndReturnFalseAndSelfieNotSet()
        {
            //Arrange
            userModel.Name = UserModelConstants.UserName;
            userModel.Email = UserModelConstants.UserEmail;
            userModel.Selfie = string.Empty;

            //Act
            var result = userModel.Validate();

            //Assert
            Assert.True(!result.Success);
            Assert.Equal("Selfie is not set", result.Message);
        }

        [Fact]
        public void ValidateUserSelfieAndReturnFalseAndInvalidSelfieFormat()
        {
            //Arrange
            userModel.Name = UserModelConstants.UserName;
            userModel.Email = UserModelConstants.UserEmail;
            userModel.Selfie = UserModelConstants.InvalidDataUrl;

            //Act
            var result = userModel.Validate();

            //Assert
            Assert.True(!result.Success);
            Assert.Equal("Invalid selfie format", result.Message);
        }

        [Fact]
        public void ValidateUserAutomaticCapturesAndReturnFalseAndAutomaticCapturesNotSet()
        {
            //Arrange
            userModel.Name = UserModelConstants.UserName;
            userModel.Email = UserModelConstants.UserEmail;
            userModel.Selfie = UserModelConstants.ImageDataUrl;
            userModel.AutomaticCaptures = null;

            //Act
            var result = userModel.Validate();

            //Assert
            Assert.True(!result.Success);
            Assert.Equal("Automatic captures not set", result.Message);
        }

        [Fact]
        public void ValidateUserAutomaticCapturesAndReturnFalseAndInvalidAutomaticCapturesFormat()
        {
            //Arrange
            userModel.Name = UserModelConstants.UserName;
            userModel.Email = UserModelConstants.UserEmail;
            userModel.Selfie = UserModelConstants.ImageDataUrl;
            userModel.AutomaticCaptures = new System.Collections.Generic.List<string>
            {
                UserModelConstants.InvalidDataUrl
            };

            //Act
            var result = userModel.Validate();

            //Assert
            Assert.True(!result.Success);
            Assert.Equal("Invalid automatic captures", result.Message);
        }

        [Fact]
        public void ValidateUserSelfieUrlAndReturnFalseAndMoreThanFiveCaptures()
        {
            //Arrange
            userModel.Name = UserModelConstants.UserName;
            userModel.Email = UserModelConstants.UserEmail;
            userModel.Selfie = UserModelConstants.ImageDataUrl;
            userModel.AutomaticCaptures = new System.Collections.Generic.List<string>
            {
                UserModelConstants.ImageDataUrl,
                UserModelConstants.ImageDataUrl,
                UserModelConstants.ImageDataUrl,
                UserModelConstants.ImageDataUrl,
                UserModelConstants.ImageDataUrl,
                UserModelConstants.ImageDataUrl
            };

            //Act
            var result = userModel.Validate();

            //Assert
            Assert.True(!result.Success);
            Assert.Equal("Error: more than five captures received", result.Message);
        }

        [Fact]
        public void ValidateUserSelfieUrlAndReturnFalseAndSelfieUrlNotSet()
        {
            //Arrange
            userModel.Name = UserModelConstants.UserName;
            userModel.Email = UserModelConstants.UserEmail;
            userModel.SelfieUrl = string.Empty;

            //Act
            var result = userModel.ValidateUrls();

            //Assert
            Assert.True(!result.Success);
            Assert.Equal("Selfie Url is not set", result.Message);
        }

        [Fact]
        public void ValidateUserSelfieUrlAndReturnFalseAndInvalidSelfieUrlFormat()
        {
            //Arrange
            userModel.Name = UserModelConstants.UserName;
            userModel.Email = UserModelConstants.UserEmail;
            userModel.SelfieUrl = UserModelConstants.InvalidUrl;

            userModel.AutomaticCaptureUrls = new System.Collections.Generic.List<string>
            {
                UserModelConstants.ValidUrl
            };

            //Act
            var result = userModel.ValidateUrls();

            output.WriteLine(result.Message);

            //Assert
            Assert.True(!result.Success);
            Assert.Equal("Invalid Selfie Url format", result.Message);
        }

        [Fact]
        public void ValidateUserAutomaticCaptureUrlsAndReturnFalseAndAutomaticCaptureUrlsNotSet()
        {
            //Arrange
            userModel.Name = UserModelConstants.UserName;
            userModel.Email = UserModelConstants.UserEmail;
            userModel.SelfieUrl = UserModelConstants.ValidUrl;
            userModel.AutomaticCaptureUrls = null;

            //Act
            var result = userModel.ValidateUrls();

            //Assert
            Assert.True(!result.Success);
            Assert.Equal("Automatic Capture Urls not set", result.Message);
        }

        [Fact]
        public void ValidateUserAutomaticCaptureUrlsAndReturnFalseAndInvalidAutomaticCaptureUrlsFormat()
        {
            //Arrange
            userModel.Name = UserModelConstants.UserName;
            userModel.Email = UserModelConstants.UserEmail;
            userModel.SelfieUrl = UserModelConstants.ValidUrl;
            userModel.AutomaticCaptureUrls = new System.Collections.Generic.List<string>
            {
                UserModelConstants.InvalidUrl
            };

            //Act
            var result = userModel.ValidateUrls();

            //Assert
            Assert.True(!result.Success);
            Assert.Equal("Invalid Automatic Capture Urls format", result.Message);
        }

        [Fact]
        public void ValidateUserAutomaticCaptureUrlsAndReturnFalseAndMoreThanFiveAutomaticCaptureUrls()
        {
            //Arrange
            userModel.Name = UserModelConstants.UserName;
            userModel.Email = UserModelConstants.UserEmail;
            userModel.SelfieUrl = UserModelConstants.ValidUrl;
            userModel.AutomaticCaptureUrls = new System.Collections.Generic.List<string>
            {
                UserModelConstants.InvalidDataUrl,
                UserModelConstants.InvalidDataUrl,
                UserModelConstants.InvalidDataUrl,
                UserModelConstants.InvalidDataUrl,
                UserModelConstants.InvalidDataUrl,
                UserModelConstants.InvalidDataUrl
            };

            //Act
            var result = userModel.ValidateUrls();

            //Assert
            Assert.True(!result.Success);
            Assert.Equal("Error: more than five automatic capture urls", result.Message);
        }

        [Fact]
        public void ValidateUserAndReturnTrue()
        {
            //Arrange
            userModel.Name = UserModelConstants.UserName;
            userModel.Email = UserModelConstants.UserEmail;
            userModel.SelfieUrl = UserModelConstants.ValidUrl;
            userModel.AutomaticCaptureUrls = new System.Collections.Generic.List<string>
            {
                UserModelConstants.ValidUrl,
                UserModelConstants.ValidUrl,
                UserModelConstants.ValidUrl,
                UserModelConstants.ValidUrl,
                UserModelConstants.ValidUrl
            };

            //Act
            var result = userModel.ValidateUrls();

            //Assert
            Assert.True(result.Success);
        }
    }
}
