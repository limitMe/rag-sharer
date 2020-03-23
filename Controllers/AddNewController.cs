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
    public class AddNewController : ApiController
    {
        [HttpPost]
        public IHttpActionResult writePostToDisk(Post newPost)
        {
            //处理非授权修改
            if (newPost.password != "VerySimplePassword")
                return Unauthorized();

            //生成文件名
            //注意pid在JS前端不要加一
            string fileName = (int.Parse(newPost.pid) + 1).ToString();

            //已存在文件应当编辑而非新建
            if(File.Exists("posts\\"+fileName+".content") == true)
            {
                return BadRequest();
            }

            //写入content
            FileStream contentStream = new FileStream("posts\\" + fileName + ".content", FileMode.OpenOrCreate);
            StreamWriter contentWriter = new StreamWriter(contentStream, Encoding.UTF8);
            contentWriter.Write(newPost.content);
            contentWriter.Close();
            contentStream.Close();

            //维系一张list以实现快速寻址
            FileStream listStream = new FileStream("posts\\list", FileMode.Append);
            StreamWriter listWriter = new StreamWriter(listStream, Encoding.UTF8);
            //这里fileName已经增一后成为新的PID
            string line = fileName + "\t" + newPost.name + "\t" + DateTime.Now.ToString("yyyyMMdd") + "\t" + DateTime.Now.ToString("yyyyMMdd")
                + "\t"+newPost.category;
            listWriter.WriteLine(line);
            listWriter.Close();
            listStream.Close();

            //L.E 刷新内存中的list
            MemoryManager memoMgr = MemoryManager.getMemoryManager();
            memoMgr.refreshList();

            return Ok();
        }

        
    }
}
