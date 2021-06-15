module.exports = {
    title: 'react',
    description: 'react文档',
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
            '/', '/start/', '/component/'
        ]
    }
}