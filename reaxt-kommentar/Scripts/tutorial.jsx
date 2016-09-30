
// The JSX compiler will automatically rewrite HTML tags to React.createElement(tagName)
//AJAX call to a separate method and call it when the component is first loaded and every 2 seconds after that.
var CommentBox = React.createClass({
    loadCommentsFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },
    handleCommentSubmit: function (comment) {
        // submit to the server and refresh the list:
        var data = new FormData();
        data.append('Author', comment.Author);
        data.append('Text', comment.Text);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            this.loadCommentsFromServer();
        }.bind(this);
        xhr.send(data);
       
    },

    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    render: function () {
        return (
          <div className="commentBox">
             <h1>Comments</h1>
                <CommentList data={this.state.data} />
              <CommentForm onCommentSubmit={this.handleCommentSubmit} />
          
          </div>
      );
    }
});
// PARENT
//Data passed from parent to children ( PETER, THIS IS A COMMENT 2 children) components is called props, short for properties.
// props
var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
              <Comment author={comment.Author}>
                  {comment.Text}
       </Comment>
     );
    });
        return (
          <div className="commentList">
              {commentNodes}
          </div>
      );
    }
});
var CommentForm = React.createClass({
    render: function() {
        return (
          <form className="commentForm">
            <input type="text" placeholder="Your name" />
            <input type="text" placeholder="Say something..." />
            <input type="submit" value="Post" />
          </form>
      );
    }
});
//var CommentForm = React.createClass({
//    render: function () {
//        return (
//          <div className="commentForm">
//              Hello, world! I am a CommentForm.
//          </div>
//      );
//    }
//});
// component as keys on this.props and any nested elements as this.props.children.
// Markdown is a simple way to format your text inline. For example, surrounding text with asterisks will make it emphasized. # header ## header 2 and so on.

var Comment = React.createClass({
    render: function () {
        var converter = new Showdown.converter();
        var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
          <div className="comment">
            <h2 className="commentAuthor">
              {this.props.author}
            </h2>
           <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        {this.props.children}
        </div>
      );
    }
});
// make the form interactive. When the user submits the form, we should clear it
// it clears the textbox and add the new comment with the other comments
var CommentForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault(); // Call preventDefault() on the event to prevent the browser's default action of submitting the form.
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();
        if (!text || !author) {
            return;
        }
         this.props.onCommentSubmit({Author: author, Text: text});
      
        // We use the ref attribute to assign a name to a child component and this.refs to reference the component. We can call the value attribute to get the native browser DOM element's value.
        this.refs.author.value = '';
        this.refs.text.value = '';
        return;
    },
    render: function() {
        return (
          <form className="commentForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
}
});



//var data = [
//  { Author: "Daniel Lo Nigro", Text: "Hello ReactJS.NET World!" },
//  { Author: "Pete Hunt", Text: "This is one comment" },
//  { Author: "Jordan Walke", Text: "This is *another* comment" }
//];

// render = returns a tree of React components that will eventually render to HTML.
// ReactDOM.render() instantiates the root component, starts the framework, and injects the markup into a raw DOM element, provided as the second argument.
ReactDOM.render(
     //<CommentBox data={data } />,
     //<CommentBox url="/comments" />,
     //<CommentBox url="/comments" pollInterval={2000} />,
     <CommentBox url="/comments" submitUrl="/comments/new" pollInterval={2000} />,
  document.getElementById('content')
);