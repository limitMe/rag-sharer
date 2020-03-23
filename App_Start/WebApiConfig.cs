using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using BlogAPI.Support;

namespace BlogAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API 配置和服务

            // Web API 路由
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                //可以通过api/{controller}/{action}/{id}，要求具名方法名
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );


            //IIS进程开始时应做的初始化
            //不知道放在这里正不正确
            MemoryManager memoMgr = MemoryManager.getMemoryManager();
        }
    }
}
