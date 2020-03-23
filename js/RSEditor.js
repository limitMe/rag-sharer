function prepareEditor(isCreate) {
    switchPage(1);
    if (isCreate == true) {
        var submitor = document.getElementById("the-submit-btn");
        submitor.setAttribute("onClick", "submitNewPost()");
        document.getElementById("the-blog-title").innerHTML = "新增";
        document.getElementById("the-blog-description").innerHTML = "在此处撰写一篇新的技术文章，打开本页面的频率越高，进步就越快";
        document.getElementById("the-post-meta-title").value = "";
        document.getElementById("the-post-meta-category").value = "默认分类";
        document.getElementById("the-post-content").value = "";
    } else {
        document.getElementById("the-blog-title").innerHTML = "编辑";
        document.getElementById("the-blog-description").innerHTML = "学而时习之，善莫大焉。知错能改，不亦说乎？";

        var submitor = document.getElementById("the-submit-btn");
        submitor.setAttribute("onClick", "editPost()");
        document.getElementById("the-post-meta-title").value = currentPost.name;
        document.getElementById("the-post-meta-category").value = currentPost.category;
        document.getElementById("the-post-content").value = currentPost.content;
    }
}

function submitNewPost() {
    
    currentPost.name = document.getElementById("the-post-meta-title").value;
    currentPost.category = document.getElementById("the-post-meta-category").value;
    currentPost.content = document.getElementById("the-post-content").value;
    currentPost.password = document.getElementById("the-post-password").value;
    
    $.ajax({
        type: 'POST',
        url: 'api/AddNew/writePostToDisk',
        data: currentPost,
        dataType: 'json',
        success: function (data, textStatus) {

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
        }
    });
}

function editPost() {
    currentPost.name = document.getElementById("the-post-meta-title").value;
    currentPost.category= document.getElementById("the-post-meta-category").value;
    currentPost.content= document.getElementById("the-post-content").value;
    currentPost.password= document.getElementById("the-post-password").value;
    $.ajax({
        type: 'POST',
        url: 'api/Editor/editPostOnDisk',
        data: currentPost,
        dataType: 'json',
        success: function (data, textStatus) {

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
        }
    });
}

function editSuccess() {
    switchPage(2);
    document.getElementById("the-success").style.display = "block";
    document.getElementById("the-success").innerHTML = "<strong>恭喜！</strong>你已经成功地更新了一篇博文";
    setTimeout(dismissAlert, 1000 * 5);
}

function submitSuccess() {
    switchPage(2);
    document.getElementById("the-success").style.display = "block";
    document.getElementById("the-success").innerHTML = "<strong>恭喜！</strong>你已经成功地发表了一篇博文";
    setTimeout(dismissAlert, 1000 * 5);
}