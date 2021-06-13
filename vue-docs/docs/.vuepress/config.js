module.exports = {
    title: 'yunfei',
    description: 'vue文档',
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
                    { text: 'vue响应式原理', link: '/type/' }, // 可不写后缀 .md
                    { text: 'vue-router原理', link: 'https://www.baidu.com/' },// 外部链接
                    { text: 'vuex原理', link: 'https://www.baidu.com/' },// 外部链接
                ]
            }
        ],
        sidebar: [
            '/', '/base/',
            '/component/', '/unit-test/',
            '/vue-router/','/communication/',
            '/vue3/','/vue3-custom-render/'
        ]
    }
}