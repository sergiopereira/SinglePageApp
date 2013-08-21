using System.Web;

namespace SinglePageApp.Model
{
    //this class is the epitome of bad demo code. don't even think about using it in a real project
    public class SecurityContext
    {
        public int UserId { get; set; }

        public static SecurityContext Current
        {
            get
            {
                var ctx = HttpContext.Current.Items["SecurityContext"] as SecurityContext;
                if (ctx == null)
                {
                    ctx = new SecurityContext {UserId = 2};
                    HttpContext.Current.Items["SecurityContext"] = ctx;
                }
                return ctx;
            }
        }
    }
}