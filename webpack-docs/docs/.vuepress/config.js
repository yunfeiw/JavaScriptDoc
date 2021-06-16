module.exports = {
    title: 'webpack',
    description: 'webpack文档',
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
                    { text: '笔记', link: '/' },
                    { text: 'vitejs', link: 'https://github.com/vitejs' },
                    
                ]
            }
        ],
        sidebar: [
            '/', {
                title: '模板系统',   // 必要的
                path: '/module/',   // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    '/module/',
                    '/module/esm/',
                    '/module/commonJs/',
                    '/module/amd/',
                    '/module/umd/',
                    
                ]
            },
            '/start/',
            '/api/','/loader/','/plugins/'
        ]
    }
}