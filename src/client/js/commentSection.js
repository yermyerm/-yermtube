const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll(".deleteBtn");
const commentCounter = document.getElementById("comment__counter");

const handleDelete = async (event) => {
  const comment = event.srcElement.parentNode;
  const commentId = comment.dataset.id;
  await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });
  comment.remove();
};

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = text;
  const small = document.createElement("small");
  small.innerText = "NEW!!!";
  small.className = "new";
  const span2 = document.createElement("span");
  span2.innerText = "✕";
  span2.className = "deleteBtn";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(small);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
  const counter = videoComments.childElementCount;
  commentCounter.innerText = `comments (${counter})`;

  span2.addEventListener("click", (event) => {
    newComment.remove();
    const counter = videoComments.childElementCount;
    commentCounter.innerText = `comments (${counter})`;
    handleDelete(event);
  });
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text.trim() === "") {
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

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteBtn) {
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", handleDelete);
  });
}
