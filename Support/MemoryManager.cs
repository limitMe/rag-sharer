using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text;
using BlogAPI.Models;

namespace BlogAPI.Support
{
    /// <summary>
    /// 使用单例模式构建的MemoryManager类，饿汉模式保证多线程不出错
    /// </summary>
    public class MemoryManager
    {
        public List<Post> postsList;

        //限制产生多个对象
        private static readonly MemoryManager memoMgr = new MemoryManager();

        private MemoryManager()
        {
            refreshList();
        }

        /// <summary>
        /// 获得MemoryManager的单例
        /// </summary>
        /// <returns>MemoryManager的单例</returns>
        public static MemoryManager getMemoryManager()
        {
            return memoMgr;
        }

        //刷新列表
        public void refreshList()
        {
            postsList = new List<Post>();

            //如果posts文件夹不存在，则创建。
            if( Directory.Exists("posts") == false)
            {
                Directory.CreateDirectory("posts");
            }

            //如果List表文件不存在，则创建。
            if(File.Exists("posts\\list") == false)
            {
                FileStream createStram = new FileStream("posts\\list", FileMode.Create);
                createStram.Close();
            }

            FileStream listStream = new FileStream("posts\\list", FileMode.Open);
            StreamReader listReader = new StreamReader(listStream, Encoding.UTF8);
            string line;
            string[] metas;
            
            
            while ((line = listReader.ReadLine()) != null)
            {
                Post tempPost = new Post();
                metas = line.Split('\t');
                if (metas.Length != 5)
                    break;
                tempPost.pid = metas[0];
                tempPost.name = metas[1];
                tempPost.createDate = metas[2];
                tempPost.modifyDate = metas[3];
                tempPost.category = metas[4];
                
                //注意此处post应当放在循环体内
                //否则进行浅拷贝会把postsList内所有元素更改
                postsList.Add(tempPost);
            }
            listReader.Close();
            listStream.Close();
            
            //让后读进来的文章放到最前面去
            postsList.Reverse();
        }

        public void refreshFile()
        {
            FileStream listStream = new FileStream("posts\\list", FileMode.Append);
            StreamWriter listWriter = new StreamWriter(listStream, Encoding.UTF8);
            string line = "";
            for(int i=postsList.Count-1;i>=0;i--)
            {
                line = postsList[i].pid + "\t" + postsList[i].name + "\t" + postsList[i].createDate + "\t" + postsList[i].modifyDate
                + "\t" + postsList[i].category;
                listWriter.WriteLine(line);
            }
            listWriter.Close();
            listStream.Close();
        }
    }
}