using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Nustache.Mvc;
using SinglePageApp.Model;

namespace SinglePageApp
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            Storage.Load(Server.MapPath("~/App_Data/database.json"));

            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(new NustacheViewEngine
                {
                    // Comment out this line to require Model in front of all your expressions.
                    // This makes it easier to share templates between the client and server.
                    // But it also means that ViewData/ViewBag is inaccessible.
                    RootContext = NustacheViewEngineRootContext.Model
                });
        }
    }
}