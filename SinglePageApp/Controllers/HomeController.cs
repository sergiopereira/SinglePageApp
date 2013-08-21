using System.Web.Mvc;

namespace SinglePageApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
            //return View("index", "_layout", new {Test = true});
        }
    }
}