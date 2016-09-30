using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using reaxt_kommentar.Models;

namespace reaxt_kommentar.Controllers
{
    public class HomeController : Controller
    {
        //     // In a real application, you'd use the repository pattern here, and retrieve the comments from a database. For simplicity, we'll just modify our controller to have a hard-coded list of comments.

        private static readonly IList<CommentModel> _comments;
        static HomeController()
        {
            _comments = new List<CommentModel>
            {
                new CommentModel
                {
                    Author = "Daniel Lo Nigro",
                    Text = "Hello ReactJS.NET World!"
                },
                new CommentModel
                {
                    Author = "Pete Hunt",
                    Text = "This is one comment"
                },
                new CommentModel
                {
                    Author = "Jordan Walke",
                    Text = "This is *another* comment"
                },
            };
        }

        public ActionResult Index()
        {
            return View();
        }
        [OutputCache(Location = OutputCacheLocation.None)] 
        public ActionResult Comments() // return the list of comments:
        {
            return Json(_comments, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult AddComment(CommentModel comment)
        {
            _comments.Add(comment);
            return Content("Success :)");
        }

        //public ActionResult Index()
        //{
        //    return View();
        //}
        //public ActionResult Index()
        //{
        //    return View();
        //}

        //public ActionResult About()
        //{
        //    ViewBag.Message = "Your application description page.";

        //    return View();
        //}

        //public ActionResult Contact()
        //{
        //    ViewBag.Message = "Your contact page.";

        //    return View();
        //}
    }
}