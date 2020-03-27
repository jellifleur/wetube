import axios from "axios";
import { handlebtnDeleteCommentClick } from "./deleteComment";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

let commentId;

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
}

const addComment = (comment) => {
    const loggedUserName = document.getElementById("jsLoggedUser");
    const loggedUserAvatar = addCommentForm.querySelector(".u-avatar");

    const li = document.createElement("li");
    const anchor = document.createElement("a");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const p = document.createElement("p");
    const img = document.createElement("img");
    const div = document.createElement("div");
    
    div.className="comment__auth";
    span.innerHTML = loggedUserName.value;
    img.src = loggedUserAvatar.src;
    img.className = "u-avatar";
    p.innerHTML = comment;
    button.value = commentId;
    button.classList.add("jsDeleteCommentBtn");
    button.innerHTML = "Delete";
    button.addEventListener("click", handlebtnDeleteCommentClick);

    anchor.appendChild(img);
    anchor.appendChild(span);
    div.appendChild(anchor);
    li.appendChild(div);
    li.appendChild(p);
    li.appendChild(button);
    commentList.prepend(li);
    increaseNumber();
}

const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment
        }
    });
    if (response.status === 200) {
        commentId = response.data.id;
        addComment(comment);
    }
}

const handleSubmit = (event) => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
}

const init = () => {
    addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
    init();
}