import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
// const removeCommentBtn = document.getElementById("removeCommentBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

// const removeComment = (id) => {
//   const videoComments = document.querySelector(".video__comments ul");
//   const oldComment = videoComments.querySelector("li");
//   oldComment.dataset.id = id;
//   oldComment.remove(id);
// };

// const handleRemove = async (event) => {
//   const commentList = event.target.parentNode;
//   console.log(commentList);
//   const commentId = commentList.dataset.id;
//   console.log(commentId);
//   const response = await fetch(`/api/comments/${commentId}`, {
//     method: "DELETE",
//   });
//   if (response.status === 201) {
//     textarea.value = "";
//     const { newCommentId } = await response.json();
//     removeComment(newCommentId);
//   }
// };

if (form) {
  form.addEventListener("submit", handleSubmit);
}
// if (removeCommentBtn) {
//   removeCommentBtn.addEventListener("click", handleRemove);
// }
