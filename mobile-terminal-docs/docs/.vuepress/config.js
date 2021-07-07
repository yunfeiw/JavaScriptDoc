module.exports = {
    title: '移动端',
    description: '移动端文档',
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
                    { text: 'mini-react项目地址', link: 'https://github.com/yunfeiw/react/tree/mini-react' },
                ]
            }
        ],
        sidebar: [
            '/', '/layout/', '/event/'
        ]
    }
}