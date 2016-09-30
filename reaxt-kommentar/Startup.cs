using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(reaxt_kommentar.Startup))]
namespace reaxt_kommentar
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
