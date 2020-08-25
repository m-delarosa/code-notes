**Step 1 - Get the Image Data**

1. Insert your image id in the let above.
2. Declare a constant to grab your comments list:
   const \$commentsList = document.querySelector("#comments");

3. Write your fetch to grab your image data.
   fetch(`${imageURL}`)
   .then((response) => response.json())
   .then((image) => {
   displayImage(image.name, image.url);
   addLikes(image.like_count);
   image.comments.forEach((comment) => addComment(comment.content));
   captureComment();
   });

4. Write the function to display the image and image name.
   function displayImage(name, url) {
   const $name = document.querySelector("#name");
    $name.innerText = name;
   const $URL = document.querySelector("#image");
    $URL.src = url;
   }

**Step 2 & 3 - Like Feature (Frontend)**

1. Write a function that increments the number of likes when clicked:
   function addLikes(numberOfLikes) {
   const $likes = document.querySelector("#likes");
    const $likeButton = document.querySelector("#like_button");
   $likes.innerText = numberOfLikes;
    $likeButton.addEventListener("click", () => {
   $likes.innerText = parseInt($likes.innerText) + 1;
   sendLikes();
   });
   }

2. Write a function that increments the number of likes on the backend:
   function sendLikes() {
   fetch(`${likeURL}`, {
   method: "POST",
   headers: {
   Accept: "application/json",
   "Content-Type": "application/json",
   },
   body: JSON.stringify({
   image_id: imageId,
   }),
   });
   }

**Step 3 & 4: Comments Functionality**

1. Add a function that adds the existing comments to the page:
   function addComment(comment) {
   $comment = document.createElement("li");
    $comment.innerText = comment;
   $commentsList.appendChild($comment);
   }

2. Add a function that captures the comment from the comment input field:
   function captureComment() {
   const $commentForm = document.querySelector("#comment_form");
    $commentForm.addEventListener("submit", () => {
   event.preventDefault();
   const formData = new FormData($commentForm);
      const newComment = formData.get("comment");
      addNewComment(newComment);
      $commentForm.reset();
   });
   }

3. Write a function that optimistically renders comment on DOM optimistically:
   function addNewComment(newComment) {
   addComment(newComment);
   sendComment(\$comment);
   }

4. Write function that stores comment on the back end:
   function sendComment(comment) {
   fetch(`${commentsURL}`, {
   method: "POST",
   headers: {
   Accept: "application/json",
   "Content-Type": "application/json",
   },
   body: JSON.stringify({
   image_id: imageId,
   content: comment.innerText,
   }),
   })
   .then((response) => response.json())
   .then((result) => addDeleteButton(comment, result.id));
   }

5. Write function that adds a delete butotn with an event listener to the new button:
   function addDeleteButton(newComment, commentId) {
   newComment.className = commentId;
   const deleteButton = document.createElement("button");
   deleteButton.innerText = "Delete";
   deleteButton.addEventListener("click", () =>
   deleteComment(newComment, commentId)
   );
   newComment.appendChild(deleteButton);
   }

6. Write a function that deletes the comment on the backend:
   function deleteComment(comment, commentId) {
   fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
   method: "DELETE",
   })
   .then((response) => response.json())
   .then((result) => console.log(result))
   .then(comment.remove());
   }

DONE!
