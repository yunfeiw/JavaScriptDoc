module.exports = {
    title: 'yunfei',
    description: 'ts文档',
    // base:'',
    head: [
        ['link', { rel: 'icon', href: '/assets/favicon.ico' }]
    ],
    themeConfig: {// 主题设置
        // displayAllHeaders: true,
        lastUpdated: 'Last Updated', // string | boolean
        logo: '/assets/img/logo.png',
        nav: [// 导航栏
            {
                text: '概述',
                link: '/'
            }, {
                text: '学习笔记',
                items: [
                    { text: '笔记', link: '/type/' }, // 可不写后缀 .md
                    { text: '其它链接', link: 'https://www.baidu.com/' }// 外部链接
                ]
            }
        ],
        sidebar: [
            '/', '/start/', '/type/', '/interface/', '/function/', '/class/', '/type2.0/', '/genericParadigm/',
            {
                title: '模板系统',   // 必要的
                path: '/module/',   // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    '/module/AMD/',
                    '/module/CommonJS/',
                    '/module/UMD/',
                    '/module/ESM/',
                    '/module/TypeScriptModule/',
                    '/module/moduleFun/',
                    '/module/spaceName/'
                ]
            }, '/ornament/'
        ]
    }
}