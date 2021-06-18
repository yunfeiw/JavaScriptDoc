module.exports = {
    title: 'webgl',
    description: 'webgl文档',
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

                ]
            }
        ],
        sidebar: [
            '/', '/1base/', '/2data-interaction/',
            '/3graphical/', '/4matrix/', '/5compound/',
            '/6glsles/'
        ]
    }
}