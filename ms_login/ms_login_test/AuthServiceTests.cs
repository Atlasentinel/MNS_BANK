using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Moq;
using Moq.Protected;
using ms_login.Models;
using ms_login.Services;
using Xunit;

public class AuthServiceTests
{
    private HttpClient CreateMockedClient(HttpResponseMessage responseMessage)
    {
        var handlerMock = new Mock<HttpMessageHandler>(MockBehavior.Strict);

        handlerMock
           .Protected()
           .Setup<Task<HttpResponseMessage>>(
              "SendAsync",
              ItExpr.IsAny<HttpRequestMessage>(),
              ItExpr.IsAny<CancellationToken>()
           )
           .ReturnsAsync(responseMessage)
           .Verifiable();

        return new HttpClient(handlerMock.Object);
    }

    private IHttpClientFactory CreateMockHttpClientFactory(HttpClient client)
    {
        var mockFactory = new Mock<IHttpClientFactory>();
        mockFactory.Setup(_ => _.CreateClient(It.IsAny<string>())).Returns(client);
        return mockFactory.Object;
    }

    [Fact]
    public async Task Authenticate_ShouldReturnToken_WhenClientIsValid()
    {
        var clientResponse = new Client
        {
            Id = 1,
            Login = "testuser",
            Password = "password",
            Token = null,
            Name = "Test"
        };

        var httpResponse = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonSerializer.Serialize(clientResponse), Encoding.UTF8, "application/json")
        };

        var updateResponse = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent("updated")
        };

        var handlerMock = new Mock<HttpMessageHandler>();

        var sequence = new MockSequence();
        handlerMock
            .InSequence(sequence)
            .Protected()
            .Setup<Task<HttpResponseMessage>>("SendAsync",
                ItExpr.Is<HttpRequestMessage>(req => req.RequestUri!.ToString().Contains("/client/login")),
                ItExpr.IsAny<CancellationToken>())
            .ReturnsAsync(httpResponse);

        handlerMock
            .InSequence(sequence)
            .Protected()
            .Setup<Task<HttpResponseMessage>>("SendAsync",
                ItExpr.Is<HttpRequestMessage>(req => req.RequestUri!.ToString().Contains("/client/update")),
                ItExpr.IsAny<CancellationToken>())
            .ReturnsAsync(updateResponse);

        var httpClient = new HttpClient(handlerMock.Object);
        var factory = CreateMockHttpClientFactory(httpClient);
        var service = new AuthService(factory);

        var loginRequest = new LoginRequest
        {
            Login = "testuser",
            Password = "password"
        };

        var result = await service.Authenticate(loginRequest);

        Assert.NotNull(result);
    }

    [Fact]
    public async Task CheckToken_ShouldReturnTrue_WhenTokenMatches()
    {
        var expectedClient = new Client
        {
            Id = 1,
            Token = "valid-token",
            Login = "test"
        };

        var httpResponse = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonSerializer.Serialize(expectedClient))
        };

        var httpClient = CreateMockedClient(httpResponse);
        var factory = CreateMockHttpClientFactory(httpClient);
        var service = new AuthService(factory);

        var result = await service.CheckToken("valid-token", 1);

        Assert.True(result);
    }

    [Fact]
    public async Task CheckToken_ShouldReturnFalse_WhenTokenDoesNotMatch()
    {
        var expectedClient = new Client
        {
            Id = 1,
            Token = "different-token",
            Login = "test"
        };

        var httpResponse = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonSerializer.Serialize(expectedClient))
        };

        var httpClient = CreateMockedClient(httpResponse);
        var factory = CreateMockHttpClientFactory(httpClient);
        var service = new AuthService(factory);

        var result = await service.CheckToken("wrong-token", 1);

        Assert.False(result);
    }
}
