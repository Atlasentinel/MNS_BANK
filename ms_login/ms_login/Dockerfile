FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copie le fichier projet
COPY *.csproj ./
COPY . ./
EXPOSE 3001
CMD ["dotnet", "run"]


