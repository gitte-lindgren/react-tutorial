using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using  reaxt_kommentar.Models;


namespace reaxt_kommentar.Models
{
    // In a real application, you'd use the repository pattern here, and retrieve the comments from a database. For simplicity, we'll just modify our controller to have a hard-coded list of comments.
    public class CommentModel
    {
        public string Author { get; set; }
        public string Text { get; set; }
    }
}