using System.Collections.Generic;
using System.IO;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SinglePageApp.Model
{
    public class Storage
    {
        private static string DataFile;
        public static Storage Data;
        private static readonly JsonSerializerSettings SerializerSettings;

        static Storage()
        {
            SerializerSettings = new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore,
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    ContractResolver = new CamelCasePropertyNamesContractResolver(),
                    Formatting = Formatting.Indented
                };
        }

        public static void Load(string dataFilePath)
        {
            DataFile = dataFilePath;
            string allJson = File.ReadAllText(DataFile, Encoding.UTF8);
            Data = JsonConvert.DeserializeObject<Storage>(allJson, SerializerSettings);
            Data.ToString();
        }

        public static void Save()
        {
            string allJson = JsonConvert.SerializeObject(Data, SerializerSettings);
            File.WriteAllText(DataFile, allJson, Encoding.UTF8);
        }

        public Storage()
        {
            Users = new List<User>();
            Products = new List<Product>();
            Categories = new List<Category>();
        }

        public IList<User> Users { get; set; }
        public IList<Product> Products { get; set; }
        public IList<Category> Categories { get; set; }
    }
}