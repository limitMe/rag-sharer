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
    public class EditorController : ApiController
    {
        [HttpPost]
        public IHttpActionResult editPostOnDisk(Post editedPost)
        {
            //处理非授权修改
            if (editedPost.password != "VerySimplePassword")
                return Unauthorized();

            //生成文件名
            string fileName = editedPost.pid;

            //删除旧文件
            File.Delete("posts\\" + fileName + ".content");

            //写入content
            FileStream contentStream = new FileStream("posts\\" + fileName + ".content", FileMode.OpenOrCreate);
            StreamWriter contentWriter = new StreamWriter(contentStream, Encoding.UTF8);
            contentWriter.Write(editedPost.content);
            contentWriter.Close();
            contentStream.Close();

            //L.E 其实这里可以利用Postlist本身的有序性免去查找，然而为了以后少改，慢就慢把
            MemoryManager memoMgr = MemoryManager.getMemoryManager();
            int i;
            for (i = 0; i < memoMgr.postsList.Count; i++ )
            {
                if (memoMgr.postsList[i].pid == fileName)
                {
                    memoMgr.postsList[i].name = editedPost.name;
                    memoMgr.postsList[i].modifyDate = DateTime.Now.ToString("yyyyMMdd");
                    memoMgr.postsList[i].category = editedPost.category;
                    memoMgr.refreshFile();
                    break;
                }
            }
            
                return Ok();
        }
    }
}
