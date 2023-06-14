{
    // method to submit the newly created post data via AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    // call the create comment class
                    new PostComments(data.data.post._id);
                    new notie.alert({
                        type: "success", // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                        text: "Post Published !",
                        stay: false, // optional, default = false
                        time: 2, // optional, default = 3, minimum = 1,
                        position: "top" // optional, default = 'top', enum: ['top', 'bottom']
                    });
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to append the post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
                    <p>
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">DEL</a>
                        </small>
                        ${post.content}
                        <br>
                        <small>
                            ${post.user.name}
                        </small>
                    </p>
                    <div id="post-comments">
                            <form id="post-${ post._id }-comments-form" action="/comments/create" method="post">
                                <input type="text" name="content" placeholder="Add a Comment..." required>
                                <input type="hidden" name="post" value="${post._id}">
                                <input type="submit" value="Post">
                            </form>
                
                        <div id="comments-container">
                            <ul id="comments-${post._id}">
                            </ul>
                        </div>
                    </div>
                </li>`);
    }

    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    new notie.alert({
                        type: "success", // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                        text: "Post Removed !",
                        stay: false, // optional, default = false
                        time: 2, // optional, default = 3, minimum = 1,
                        position: "top" // optional, default = 'top', enum: ['top', 'bottom']
                    });
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let ajaxifyPosts = function () {
        $('#posts-container>ul>li').each(function () {
            let self = $(this);
            let delButton = $(' .delete-post-button', self);
            deletePost(delButton);
            // get the post's id by splitting the id attribute and call the PostComments function
            // to load the comments of posts already present on the page
            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }

    createPost();
    ajaxifyPosts();
}