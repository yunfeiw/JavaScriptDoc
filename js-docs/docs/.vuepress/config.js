module.exports = {
    title: 'JavaScript',
    description: 'javaScript文档',
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
                ]
            }
        ],
        sidebar: [
            '/', '/es/','/class/','/design-pattern/','/inherit/','/event/','/promise/'
        ]
    }
}