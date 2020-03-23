using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Text;

namespace BlogAPI.Controllers
{
    public class DestroyPostController : ApiController
    {
        public IHttpActionResult destoryPostByName(string fileName)
        {
            //删除旧文件
            File.Delete("posts\\" + fileName + ".content");

            //写入删除信息
            FileStream contentStream = new FileStream("posts\\" + fileName + ".content", FileMode.OpenOrCreate);
            StreamWriter contentWriter = new StreamWriter(contentStream, Encoding.UTF8);
            string destroyInfo = "本篇文章已于" + DateTime.Now.ToString("yyyy年MM月dd日") + "阅后即焚";
            contentWriter.WriteLine(destroyInfo);
            contentWriter.Close();
            contentStream.Close();

            return Ok();
        }
    }
}
