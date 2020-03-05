import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'
import register from './views/register'
import notfound from './views/404'
import login from './views/login'
import home from './views/home'
import userInfo from './views/userInfo'
import news from './views/news'
import newstoshow from './views/newsToshow'
import showInfo from './views/showInfo'
import updatePWD from './views/updatePWD'
import retrievePWD from './views/retrievePWD'
import shop from './views/shop'
import myshop from './views/myshop'
import about from './views/help'
import test from './views/userPage/test'
import cardinfo from './views/cardinfo'
import rechargelist from './views/rechargelist'
import recharge from './views/recharge'
import mycard from './views/mycard/mycard'
import logins from './views/loginRegister/logins'
import registers from './views/loginRegister/register'
import mainrecharge from './views/rechargePage/mainrecharge'
import admin from './views/admin'
import mainpage from './views/adminpage/mainpage'
import adminshoplist from './views/adminpage/adminshoplist'
import newsmanage from './views/adminpage/newsmanage'
import userlist from './views/adminpage/userList'
import html from './views/adminpage/html'
import addnews from './views/adminpage/addnews'
import superadmin from './views/superadmin/superadmin'
import jwt_decode from 'jwt-decode'
// const jwtde = require('../../routes/api/package/jwt')

import { from } from 'rxjs';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    // routes: [{
    //         path: '/',
    //         // redirect: '/index'
    //         component: Index,
    //         // }
    //         // {
    //         //     path: '/index',
    //         //     name: 'index',
    //         //     component: Index,
    //         children: [
    //             { path: '', component: home },
    //             { path: '/home', name: 'home', component: home },
    //             { path: '/userInfo', name: userInfo, component: userInfo },
    //             { path: '/showInfo', name: 'showInfo', component: showInfo, },
    //             { path: '/showInfo/updatePWD', component: updatePWD },
    //             { path: '/shop', name: 'shop', component: shop },
    //             { path: '/myshop', name: 'myshop', component: myshop },
    //             { path: '/news', name: 'news', component: news },
    //             { path: '/news/newstoshow/:id', name: 'newstoshow', component: newstoshow },
    //             { path: '/test', name: 'test', component: test },
    //             {
    //                 path: '/cardinfo',
    //                 name: 'cardinfo',
    //                 component: cardinfo,
    //                 children: [
    //                     { path: '/cardinfo/mycard', name: 'mycard', component: mycard },
    //                 ]
    //             },
    //             {
    //                 path: '/recharge',
    //                 name: 'recharge',
    //                 component: recharge,
    //                 children: [
    //                     { path: '/recharge/mainrecharge', name: 'mainrecharge', component: mainrecharge },
    //                 ]
    //             },
    //         ]
    //     },
    //     {
    //         path: '/register',
    //         name: 'register',
    //         component: register
    //     },
    //     {
    //         path: '/login',
    //         name: 'login',
    //         component: login,
    //         children: [
    //             { path: '/login/logins', name: 'logins', component: logins },
    //             { path: '/login/register', name: 'registers', component: registers },

    //         ]
    //     },
    //     // { path: '/login/logins', name: 'logins', component: logins },
    //     // { path: '/login/register', name: 'registers', component: registers },


    //     {
    //         path: '/retrievePWD',
    //         name: 'retrievePWD',
    //         component: retrievePWD
    //     },

    //     {
    //         path: '*',
    //         name: '/404',
    //         component: notfound
    //     },
    //     {
    //         path: '/admin',
    //         name: 'admin',
    //         component: admin,
    //         children: [
    //             { path: '/admin/mainpage', name: 'mainpage', component: mainpage },
    //             { path: '/admin/newsmanage', name: 'newsmanage', component: newsmanage },
    //             { path: '/admin/adminshoplist', name: 'adminshoplist', component: adminshoplist },
    //             { path: '/admin/userlist', name: 'userlist', component: userlist },
    //             { path: '/admin/addnews', name: 'addnews', component: addnews },
    //             // {
    //             //     path: '/admin/superadmin',
    //             //     name: 'superadmin',
    //             //     component: () =>import ('../src/views/superadmin/superadmin')
    //             // }
    //         ]
    //     }, {
    //         path: '/html',
    //         name: 'html',
    //         component: html
    //     }



    // ]
})
var originArr = [{
        path: '/',
        // redirect: '/index'
        component: Index,
        // }
        // {
        //     path: '/index',
        //     name: 'index',
        //     component: Index,
        children: [
            { path: '', component: home },
            { path: '/home', name: 'home', component: home },
            { path: '/userInfo', name: userInfo, component: userInfo },
            { path: '/showInfo', name: 'showInfo', component: showInfo, },
            { path: '/showInfo/updatePWD', component: updatePWD },
            { path: '/shop', name: 'shop', component: shop },
            { path: '/myshop', name: 'myshop', component: myshop },
            { path: '/news', name: 'news', component: news },
            { path: '/news/newstoshow/:id', name: 'newstoshow', component: newstoshow },
            { path: '/test', name: 'test', component: test },
            { path: '/about', name: 'about', component: about },
            { path: '/rechargelist', name: 'rechargelist', component: rechargelist },

            {
                path: '/cardinfo',
                name: 'cardinfo',
                component: cardinfo,
                children: [
                    { path: '/cardinfo/mycard', name: 'mycard', component: mycard },
                ]
            },
            {
                path: '/recharge',
                name: 'recharge',
                component: recharge,
                children: [
                    { path: '/recharge/mainrecharge', name: 'mainrecharge', component: mainrecharge },
                ]
            },


        ]
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        children: [
            { path: '/login/logins', name: 'logins', component: logins },
            { path: '/login/register', name: 'registers', component: registers },

        ]
    },
    // { path: '/login/logins', name: 'logins', component: logins },
    // { path: '/login/register', name: 'registers', component: registers },


    {
        path: '/retrievePWD',
        name: 'retrievePWD',
        component: retrievePWD
    },
    {
        path: '*',
        name: '/404',
        component: notfound
    },
    {
        path: '/admin',
        name: 'admin',
        component: admin,
        children: [
            { path: '/admin/mainpage', name: 'mainpage', component: mainpage },
            { path: '/admin/newsmanage', name: 'newsmanage', component: newsmanage },
            { path: '/admin/adminshoplist', name: 'adminshoplist', component: adminshoplist },
            { path: '/admin/userlist', name: 'userlist', component: userlist },
            { path: '/admin/addnews', name: 'addnews', component: addnews },
            {
                path: '/admin/addAdmin',
                name: 'addAdmin',
                component: () =>
                    import ('../src/views/superadmin/addAdmin.vue')
            },
            {
                path: '/admin/exchangePage',
                name: 'exchangePage',
                component: () =>
                    import ('../src/views/adminpage/exchangePage.vue')
            }
            // {
            //     path: '/admin/superadmin',
            //     name: 'superadmin',
            //     component: () =>import ('../src/views/superadmin/superadmin')
            // }
        ]
    }
    // , {
    //     path: '/html',
    //     name: 'html',
    //     component: html
    // }



]
const arr = {
        path: '/admin/superadmin',
        name: 'superadmin',
        component: superadmin
            // component:()=>import('../src/views/superadmin/superadmin')
    }
    // localStorage.eleToken2
    // const obj = jwt_decode(localStorage.eleToken2)
if (localStorage.eleToken2) {
    if (jwt_decode(localStorage.eleToken2)) {
        originArr[originArr.length - 1].children.push(arr)
    }
}
router.addRoutes(originArr)
    //全局路由守卫
router.beforeEach((to, from, next) => {
    const adminislogin = localStorage.eleToken2 ? true : false;
    const islogin = localStorage.eleToken ? true : false;
    // adminislogin ? next() : next("/login/logins")
    if (adminislogin) {
        next()
    } else {
        // const nextRoute = ['home', 'login/logins', 'register', 'retrievePWD', 'news', 'newstoshow'];
        if (to.path == "/admin" || to.path == "/login/logins" || to.path == "/login/register" || to.path == "/retrievePWD" || to.path == "/home" || to.path == "/news" || to.path == "/" || to.path == "/about" || to.path.indexOf("/newstoshow") > -1) {
            next()
                // }
                // if (nextRoute.indexOf(to.name) > -1) {
                //     next()
        } else {
            islogin ? next() : next("/login/logins")
        }
    }

})

export default router