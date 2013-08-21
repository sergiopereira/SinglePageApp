using System.Collections.Generic;

namespace SinglePageApp.Model
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<int> ProductIds { get; set; }
    }
}