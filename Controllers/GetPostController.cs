using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Text;
using BlogAPI.Models;
using BlogAPI.Support;

namespace BlogAPI.Controllers
{
    public class GetPostController : ApiController
    {
         //据说以get开头的方法会匹配所有get请求，这里明明有两个
        public IHttpActionResult getPostByNum(int num)
        {
            Post postToReturn = new Post();
            MemoryManager memoMgr = MemoryManager.getMemoryManager();

            //如果一篇日志都没有，服务器直接返回空的BLOG
            if (memoMgr.postsList.Count == 0)
            {
                //M.S 此处的错误信息是硬编码的，而且没有任何语言本地化
                postToReturn.pid = "0";
                postToReturn.category = "默认类别";
                postToReturn.content = "目前系统上没有任何文章，请新增文章后查看。";
                postToReturn.createDate = "20150101";
                postToReturn.name = "服务器上没有内容";
                return Ok(postToReturn);
            }
            else if (num >= memoMgr.postsList.Count)
            {
                return BadRequest();
            }

            string name = memoMgr.postsList[num].pid;

            postToReturn.pid = memoMgr.postsList[num].pid;
            postToReturn.name = memoMgr.postsList[num].name;
            postToReturn.createDate = memoMgr.postsList[num].createDate;
            postToReturn.modifyDate = memoMgr.postsList[num].modifyDate;

            FileStream contentStream = new FileStream("posts\\" + name + ".content", FileMode.Open);
            StreamReader contentReader = new StreamReader(contentStream, Encoding.UTF8);
            postToReturn.content = contentReader.ReadToEnd();
            contentReader.Close();
            contentStream.Close();

            return Ok(postToReturn);

        }
    }
}
