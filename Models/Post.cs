using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlogAPI.Models
{
    /// <summary>
    /// 文章的基本构成
    /// </summary>
    public class Post
    {
        /// <summary>
        /// 唯一标示码
        /// </summary>
        public string pid { get; set; }

        /// <summary>
        /// 文章标题，由于命名格式形如20150102_title，故也作Id一样的主键使用
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// 文章类别
        /// </summary>
        public string category { get; set; }

        /// <summary>
        /// 文章内容，大段的HTML内容
        /// </summary>
        public string content { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public string createDate { get; set; }

        /// <summary>
        /// 修改时间
        /// </summary>
        public string modifyDate { get; set; }

        /// <summary>
        /// 编辑时需要提供的密码
        /// </summary>
        public string password { get; set; }

        /// <summary>
        /// 默认构造函数，保证必要字段的非空
        /// </summary>
        public Post()
        {
            pid = "0";
            name = "默认标题";
            category = "默认分类";
            content = "此处没有内容";
            createDate = "20150101";
            modifyDate = "20150101";
        }
    }
}