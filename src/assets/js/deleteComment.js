import axios from "axios";

const btnDeleteComment = document.querySelectorAll(".jsDeleteCommentBtn");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
let currentBtn;

const reductionNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
}

const deleteComment = () => {
    const li = currentBtn.parentNode;
    commentList.removeChild(li);
    reductionNumber();
}

const requestDeleteComment = async (id) => {
    const response = await axios(`/api/${id}/comment/delete`);
    if (response.status === 200) {
        deleteComment();
    }
}

export const handlebtnDeleteCommentClick = (event) => {
    currentBtn = event.target;
    const id = currentBtn.value;
    requestDeleteComment(id);
}

const init = () => {
    if (btnDeleteComment.length > 0) {
        btnDeleteComment.forEach((item) => {
            item.addEventListener("click", handlebtnDeleteCommentClick);
        });
    }
}

if(btnDeleteComment) {
    init();
}