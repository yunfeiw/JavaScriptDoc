module.exports = {
    title: 'css',
    description: 'css文档',
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
                text: '链接',
                items: [
                ]
            }
        ],
        sidebar: [
            '/', '/flex/', '/grid/'
        ]
    }
}