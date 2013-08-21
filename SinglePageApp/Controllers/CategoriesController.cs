using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using SinglePageApp.Model;

namespace SinglePageApp.Controllers
{
    public class CategoriesController : ApiController
    {
        public IList<CategoryView> Get()
        {
            return Storage.Data.Categories.Select(c => new CategoryView(c)).ToList();
        }

        // GET api/categories/5
        public CategoryView Get(int id)
        {
            Category cat = Storage.Data.Categories.First(c => c.Id == id);
            return new CategoryView(cat);
        }

    }
}