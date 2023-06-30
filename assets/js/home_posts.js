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
                    $('#posts-container').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    // call the create comment class
                    new PostComments(data.data.post._id);
                    // call the ToggleLike class to enable toggle functionality on likes button
                    new ToggleLike($(' .toggle-like-button', newPost));
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
        let path= '/images/profile.png'
        return $(`<li id="post-${post._id}">
                    <div class="post-user">
                        <div class="profile-img" style=" border-radius:50%; height: 50px; width: 50px; overflow:hidden">
                            <img src="${post.user.avatar ? post.user.avatar : path}" alt="${post.user.name}"
                                style="width:100%; height:100%; border-radius:50%;">                          
                        </div>
                        <div class="profile-info">
                            <p>
                                ${post.user.name}
                            </p>
                            <small class="time">
                                ${new Date(post.createdAt).toString().substring(4, 21)}
                            </small>
                        </div>
                        
                        <small class="del-btn">
                            <a class="delete-post-button" href="/posts/destroy/${ post.id }">DEL</a>
                        </small>
                        
                    </div>
                    <div class="post-content">
                        ${ post.content }
                        <br>
                    </div>
                    <div class="post-actions">
                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=<%=post._id%>&type=Post">
                            0 Like
                        </a>
                        <a class="toggle-comment-form">${ post.comments.length} Comment</a>
                    </div>
                    <div class="post-comments">
                        <form id="post-${post._id}-comments-form" action="/comments/create" method="post">
                            <input id="comment-input" type="text" name="content" placeholder="Add a Comment..." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input id="comment-submit" type="submit" value="Post Comment">
                        </form>
                        <div class="comments-container">
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
        $('#posts-container>li').each(function () {
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