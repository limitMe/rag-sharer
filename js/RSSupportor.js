currentPost = {
    id: "JsInit",
    name: "JsInit",
    category: "JsInit",
    content: "JsInit",
    password: "JsInit",
    createdate: "JsInit",
    modifydate: "JsInit",
};

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function dismissAlert() {
    document.getElementById("the-warning").style.display = "none";
    document.getElementById("the-success").style.display = "none";
}

function switchPage(actionNum) {
    switch (actionNum) {
        //from blog to editor
        case 1: {
            document.getElementById("the-blog-area").style.display = "none";
            document.getElementById("the-blog-rightbar").style.display = "none";
            document.getElementById("the-editor-rightbar").style.display = "block";
            document.getElementById("the-editor-area").style.display = "block";
        } break;

        //from editor to blog
        case 2: {
            document.getElementById("the-blog-area").style.display = "block";
            document.getElementById("the-blog-rightbar").style.display = "block";
            document.getElementById("the-editor-rightbar").style.display = "none";
            document.getElementById("the-editor-area").style.display = "none";
        }
         
    }
}