using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Moq.Protected;
using ms_login.Services;
using ms_login.Models;
using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;

namespace ms_login_test
{
    [TestClass]
    public class CheckServiceTests
    {
        private Mock<IHttpClientFactory> _httpClientFactoryMock;
        private CheckService _service;

        [TestInitialize]
        public void Setup()
        {
            _httpClientFactoryMock = new Mock<IHttpClientFactory>();
        }

        private void SetupHttpClient(HttpResponseMessage responseMessage)
        {
            var handlerMock = new Mock<HttpMessageHandler>();
            handlerMock.Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(responseMessage);

            var httpClient = new HttpClient(handlerMock.Object);
            _httpClientFactoryMock.Setup(f => f.CreateClient(It.IsAny<string>())).Returns(httpClient);

            _service = new CheckService(_httpClientFactoryMock.Object);
        }

        [TestMethod]
        public async Task CheckToken_ReturnsFalse_WhenTokenOrIdIsNull()
        {
            _service = new CheckService(_httpClientFactoryMock.Object);
            Assert.IsFalse(await _service.CheckToken(null, 1));
            Assert.IsFalse(await _service.CheckToken("token", null));
            Assert.IsFalse(await _service.CheckToken("", 1));
        }

        [TestMethod]
        public async Task CheckToken_ReturnsFalse_WhenUserNotFound()
        {
            var response = new HttpResponseMessage(HttpStatusCode.NotFound);
            SetupHttpClient(response);

            var result = await _service.CheckToken("token", 1);
            Assert.IsFalse(result);
        }

        [TestMethod]
        public async Task CheckToken_ReturnsFalse_WhenClientIsNull()
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("null")
            };
            SetupHttpClient(response);

            var result = await _service.CheckToken("token", 1);
            Assert.IsFalse(result);
        }

        [TestMethod]
        public async Task CheckToken_ReturnsFalse_WhenClientTokenIsNullOrEmpty()
        {
            var client = new Client { Id = 1, Login = "user", Token = null };
            var json = JsonSerializer.Serialize(client);
            var response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(json)
            };
            SetupHttpClient(response);

            var result = await _service.CheckToken("token", 1);
            Assert.IsFalse(result);

            client.Token = "";
            json = JsonSerializer.Serialize(client);
            response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(json)
            };
            SetupHttpClient(response);

            result = await _service.CheckToken("token", 1);
            Assert.IsFalse(result);
        }

        [TestMethod]
        public async Task CheckToken_ReturnsFalse_WhenTokenIsIncorrect()
        {
            var client = new Client { Id = 1, Login = "user", Token = "goodtoken" };
            var json = JsonSerializer.Serialize(client);
            var response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(json)
            };
            SetupHttpClient(response);

            var result = await _service.CheckToken("badtoken", 1);
            Assert.IsFalse(result);
        }

        [TestMethod]
        public async Task CheckToken_ReturnsTrue_WhenTokenIsCorrect()
        {
            var client = new Client { Id = 1, Login = "user", Token = "goodtoken" };
            var json = JsonSerializer.Serialize(client);
            var response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(json)
            };
            SetupHttpClient(response);

            var result = await _service.CheckToken("goodtoken", 1);
            Assert.IsTrue(result);
        }

        [TestMethod]
        public async Task CheckToken_ReturnsFalse_OnException()
        {
            var handlerMock = new Mock<HttpMessageHandler>();
            handlerMock.Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ThrowsAsync(new HttpRequestException("Network error"));

            var httpClient = new HttpClient(handlerMock.Object);
            _httpClientFactoryMock.Setup(f => f.CreateClient(It.IsAny<string>())).Returns(httpClient);

            _service = new CheckService(_httpClientFactoryMock.Object);

            var result = await _service.CheckToken("token", 1);
            Assert.IsFalse(result);
        }
    }
}