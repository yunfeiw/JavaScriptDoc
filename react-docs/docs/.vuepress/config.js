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
                    { text: '笔记', link: '/' },
                    { text: 'mini-react项目地址', link: 'https://github.com/yunfeiw/react/tree/mini-react' },
                    { text: 'react-router原理', link: 'https://www.baidu.com/' },
                    { text: 'redux原理', link: 'https://www.baidu.com/' }
                ]
            }
        ],
        sidebar: [
            '/', '/start/', '/component/', '/skill/'
            , '/hooks/', '/react-router/', '/redux/'
            ,'/react-skill/','/mini-react/','/dva-umi/'
        ]
    }
}