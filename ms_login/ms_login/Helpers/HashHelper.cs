using System.Security.Cryptography;
using System.Text;

namespace ms_login.Helper
{
    public class HashHelper
    {
        public static string ComputeSha512Hash(string rawData)
        {
            using (SHA512 sha512Hash = SHA512.Create())
            {
                // Convertie en list de bit
                byte[] bytes = sha512Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                // Convertie de list de bit en string
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
