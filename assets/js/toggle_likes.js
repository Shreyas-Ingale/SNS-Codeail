class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement; // pressed like button
        this.toggleLike(); // function to perfrom toggle
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;  // pressed like button
            $.ajax({
                type: 'POST',
                url: $(self).attr('href')
            }).done(function (data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log("Like Count for this post", likesCount);
                if(data.data.isDeleted == true){
                    likesCount -= 1;
                }else{
                    likesCount += 1;
                }
                $(self).attr('data-likes', likesCount);
                $(self).html(`${likesCount} Likes`); // overwrites existing html with this
            }).fail(function (error) {
                console.log("Error in Toggling the Like", error);
            })
        });
    }
}