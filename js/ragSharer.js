//To enhance the effiency, we could make the ContentObj Universal.

//This is Scence Region

function prepareContent(){
	//What page do we need to display?
	var pageNum = getQueryString("page");
	if (pageNum == null) { pageNum = "0"};

	//Simplify the code by using JQuery
	$.ajax({
        type: 'GET',
        url: 'api/GetPost?num='+pageNum,
        success: function (data, textStatus) {

        	//准备数据,此处已经对象化
            var contentObj = data;

            //更新文章meta
            document.getElementById("the-blog-post-title").innerHTML = contentObj.name;
            document.getElementById("the-blog-post-date").innerHTML = contentObj.date+' <a href="#" id="the-blog-post-category">'+contentObj.category+'</a>';
            document.getElementById("the-blog-post-editor").innerHTML = '<a href="new.html?postName='+contentObj.date+'_'+contentObj.name+'">编辑</a>'

            //删除原有文章
            var blogDOM = document.getElementById("the-blog-post-area");
            blogDOM.removeChild(document.getElementById('dynamical-appended'));

            //填充新文章
            var newPost = document.createElement("div");
            newPost.setAttribute("id","dynamical-appended");
            newPost.innerHTML = contentObj.content;
            blogDOM.appendChild(newPost);

            //Use code_pretty.js to prettify the code display
			prettyPrint();

			//Some posts will be destroyed after read
			if (getQueryString("willBeDestroyed")==true) {
				//for this version I use time measure for convenience
				//M.S this should use javascript to monitor wether the reader has seen the last line
				setTimeout(destroyAfterRead, 1000*60*5);
			}
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
        	if (pageNum != 0) {
            	window.location.href="index.html"; 
            	alert("没有更多文章，已跳转到第一篇博文。");
            }
        }
    });

	
}

function previousPost(){
    var pageNum = getQueryString("page");
    if (pageNum == null) { pageNum = "0"};

    if (pageNum == "0") { alert("没有更新的文章了");}
    else{
        var num = parseInt(pageNum);
        num--;
        window.location.href="index.html?page="+num; 
    }
}

function nextPost(){
    var pageNum = getQueryString("page");
    if (pageNum == null) { pageNum = "0"};

    var num = parseInt(pageNum);
    num++;
    window.location.href="index.html?page="+num; 
}

var createDate = "";

function prepareEditor(){
    var postName = getQueryString("postName");
    if (postName == null) {
        //means this is Add New
    }else{
        document.getElementById("the-blog-title").innerHTML = "编辑";
        document.getElementById("the-blog-description").innerHTML = "学而时习之，善莫大焉。知错能改，不亦说乎？";

        var submitor = document.getElementById("the-submit-btn");
        submitor.setAttribute("onClick","editPost()");

        $.ajax({
        type: 'GET',
        url: 'api/GetPost?name='+postName,
        success: function (data, textStatus) {

            //准备数据,此处已经对象化
            var contentObj = data;

            document.getElementById("the-post-meta-title").value = contentObj.name;
            document.getElementById("the-post-meta-category").value = contentObj.category;
            document.getElementById("the-post-content").value = contentObj.content;
            createDate = contentObj.date;

        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {

        }
    });
    }
}

function editPost(){
    var postName = getQueryString("postName");

    var postData = {
        name: document.getElementById("the-post-meta-title").value,
        category: document.getElementById("the-post-meta-category").value,
        content: document.getElementById("the-post-content").value,
        password: document.getElementById("the-post-password").value,
        date: createDate,
    };
    $.ajax({
        type: 'POST',
        url: 'api/Editor/editPostOnDisk',
        data: postData,
        dataType: 'json',
        success: function (data, textStatus) {
            editSuccess();
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
        }
    });

}

function editSuccess(){
	window.location.href="index.html"; 
	alert("编辑成功");
}

function submitNewPost(){
    var postData = {
        name: document.getElementById("the-post-meta-title").value,
        category: document.getElementById("the-post-meta-category").value,
        content: document.getElementById("the-post-content").value,
        password: document.getElementById("the-post-password").value,
    };
    $.ajax({
        type: 'POST',
        url: 'api/AddNew/writePostToDisk',
        data: postData,
        dataType: 'json',
        success: function (data, textStatus) {
            submitSuccess();
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
        }
    });
}

function submitSuccess(){
    window.location.href="index.html"; 
    alert("发表成功");
}

function destroyAfterRead(){
	var fileName = document.getElementById("the-blog-post-date").innerHTML + "_" + document.getElementById("the-blog-post-title").innerHTML;
	$.ajax({
        type: 'GET',
        url: 'api/destroyPost?filename='+fileName,
        data: postData,
        dataType: 'json',
        success: function (data, textStatus) {
            submitSuccess();
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
        }
    });
}
// End of Scence Region

//This is Element Action Support Region

//Get the url Query String
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}