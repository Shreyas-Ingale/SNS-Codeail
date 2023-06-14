// Implementing a class to be called to handle comments while loading posts on a page or creating new posts 
class PostComments{
    // constructor to initialize the instance of this class whenever a post accesses it
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);
        this.createComment(postId);

        // call del button for all existing comment
        let self = this;
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    // method to create comment
    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function (data) {
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                    
                    new notie.alert({
                        type: "success", // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                        text: "Comment Published !",
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

    // method to create dom element of a comment
    newCommentDom(comment){
        return $(`<li id="comment-${ comment._id }">
                    <p>
                        <small>
                            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">DEL</a>
                        </small>
                        ${comment.content}
                        <br>
                        <small>
                            ${comment.user.name}
                        </small>
                    </p>
                </li>`);
    }

    // method to delete a comment
    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new notie.alert({
                        type: "success", // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                        text: "Comment Published !",
                        stay: false, // optional, default = false
                        time: 2, // optional, default = 3, minimum = 1,
                        position: "top" // optional, default = 'top', enum: ['top', 'bottom']
                    });
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
}