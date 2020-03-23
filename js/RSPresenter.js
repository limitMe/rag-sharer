
//显示博客内容
function prepareContent() {

    var pageNum = getQueryString("page");
    if (pageNum == null) { pageNum = "0" };

    $.ajax({
        type: 'GET',
        url: 'api/GetPost?num=' + pageNum,
        success: function (data, textStatus) {

            currentPost = data;

            //更新文章meta
            document.getElementById("the-blog-post-title").innerHTML = currentPost.name;
            document.getElementById("the-blog-post-date").innerHTML = currentPost.createDate + ' <a href="#" id="the-blog-post-category">' + currentPost.category + '</a>';
            document.getElementById("the-blog-post-editor").innerHTML = '<a href="#" onclick="prepareEditor(false)">编辑</a>'

            //删除原有文章
            var blogDOM = document.getElementById("the-blog-post-area");
            blogDOM.removeChild(document.getElementById('dynamical-appended'));

            //填充新文章
            var newPost = document.createElement("div");
            newPost.setAttribute("id", "dynamical-appended");
            newPost.innerHTML = currentPost.content;
            blogDOM.appendChild(newPost);

            //美化代码
            prettyPrint();

            //阅后即焚是否启用
            if (getQueryString("willBeDestroyed") == true) {
                //M.S 这里是五分钟后删除，最好用JS监听是否滑到底部
                setTimeout(destroyAfterRead, 1000 * 60 * 5);
            }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            //M.S 当前的出错处理太过简单粗暴
            if (pageNum != 0) {
                document.getElementById("the-warning").style.display = "block";
                document.getElementById("the-warning").innerHTML = "<strong>注意！</strong>没有更多文章了，已跳转到第一篇博文。";
                setTimeout(dismissAlert, 1000 * 5);
            }
        }
    });
}

function previousPost() {
    var pageNum = getQueryString("page");
    if (pageNum == null) { pageNum = "0" };

    if (pageNum == "0") {
        document.getElementById("the-warning").style.display = "block";
        document.getElementById("the-warning").innerHTML = "<strong>注意！</strong>没有更新的文章了。";
        setTimeout(dismissAlert, 1000 * 5);
    }
    else {
        var num = parseInt(pageNum);
        num--;
        window.location.href = "index.html?page=" + num;
    }
}

function nextPost() {
    var pageNum = getQueryString("page");
    if (pageNum == null) { pageNum = "0" };

    var num = parseInt(pageNum);
    num++;
    window.location.href = "index.html?page=" + num;
}

//M.S 阅后即焚目前很不成熟
function destroyAfterRead() {
    var fileName = document.getElementById("the-blog-post-date").innerHTML + "_" + document.getElementById("the-blog-post-title").innerHTML;
    $.ajax({
        type: 'GET',
        url: 'api/destroyPost?filename=' + fileName,
        data: postData,
        dataType: 'json',
        success: function (data, textStatus) {
            submitSuccess();
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
        }
    });
}