using System.Collections.Generic;
using System.Linq;

namespace SinglePageApp.Model
{
    public class CategoryView : Category
    {
        public CategoryView()
        {
        }

        public CategoryView(Category category)
        {
            Id = category.Id;
            Name = category.Name;
            ProductIds = new List<int>();

            foreach (int id in category.ProductIds)
            {
                ProductIds.Add(id);
            }
            Products = Storage.Data.Products.Where(p => ProductIds.Contains(p.Id)).ToList();
        }

        public bool Selected { get; set; }
        public IList<Product> Products { get; set; }
    }
}