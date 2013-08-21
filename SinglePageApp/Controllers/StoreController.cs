using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using Nustache.Core;
using SinglePageApp.Model;

namespace SinglePageApp.Controllers
{
    public class StoreController : Controller
    {
        private string _templatesPath;

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            _templatesPath = HttpContext.Server.MapPath("~/static/app/onlinestore/templates");
        }

        public ActionResult Index()
        {
            return View();
        }

        [ChildActionOnly]
        public ContentResult CategoryList()
        {
            List<CategoryView> categories = Storage.Data.Categories.Select(c => new CategoryView(c)).ToList();
            categories[0].Selected = true;
            string html = Render.FileToString(Path.Combine(_templatesPath, "category-list.html"),
                                              new { items = categories });
            return Content(html);
        }
    }
}