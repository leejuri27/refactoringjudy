const express = require('express')
const router = express.Router()

// 쿼리문 정리해놓은 파일, 경로바뀔수있음
const queries = require('./queries')
const conn = require('../config/database')

const GOOGLE_CLIENT_ID = '537291097258-4pr3h4b3skes2b7svrj73lj7s0imvhmp.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const GOOGLE_REDIRECT_URI = 'http://localhost:3333/login/redirect';
// 회원 가입
router.post('/join', (req, res) => {
    console.log('join req.body', req.body)
    let { name, nick, tel, ID, check, pw, pw2 } = req.body
    if (pw == pw2) {
        conn.query(queries.joinUser, [ID, pw, name, nick, tel], (err, rows) => {
            console.log(rows)
            console.log(err)
            if (rows.affectedRows > 0) {
                res.send(`<script>alert("환영합니다.${name}님!");location.href='http://localhost:3333'</script>`)
            }
            else {
                res.send('<script>alert("회원가입에 실패하였습니다.");location.href="http://localhost:3333/join_user"</script>')
            }
        })
    }
    else {
        res.send('<script>alert("비밀번호가 다릅니다.");location.href="http://localhost:3333/join_user"</script>')
    }


})

// 로그인
router.post('/login', (req, res) => {
    let { id, pw } = req.body
    conn.query(queries.searchId, [id, pw], (err, rows) => {
        if (rows.length > 0) {
            req.session.user = rows[0]
            res.send(`<script>alert('어서오세요~ ${req.session.user.user_name}님');location.href='http://localhost:3333/search';</script>`)
            // res.send(`<script>alert('어서오세요~');location.href='http://localhost:3333/search';</script>`)
        }
        else {
            res.send('<script>alert("로그인에 실패했습니다.");location.href="http://localhost:3333/login";</script>')
        }
    })
})

// 아이디 찾기
router.post('/find_id', (req, res)=>{
    url = 'http://localhost:3333/find_id'
    // console.log("아이디 찾찾찾찾", req.body)
    let {name, tel} = req.body
    conn.query(queries.findId, [name, tel], (err, rows)=>{
        console.log("아이디찾기 테스트트트", rows)
        // if (rows.length > 0){
            res.render('find_id', {list:rows})
        // } else {
        //     res.render('find_id')
        // }
        // console.log("", res.list)
    })
})



// 구글로그인
router.get('/loginGoogle', (req, res) => {
    let url = 'https://accounts.google.com/o/oauth2/v2/auth';
    // client_id는 위 스크린샷을 보면 발급 받았음을 알 수 있음
    // 단, 스크린샷에 있는 ID가 아닌 당신이 직접 발급 받은 ID를 사용해야 함.
    url += `?client_id=${GOOGLE_CLIENT_ID}`
    // 아까 등록한 redirect_uri
    // 로그인 창에서 계정을 선택하면 구글 서버가 이 redirect_uri로 redirect 시켜줌
    url += `&redirect_uri=${GOOGLE_REDIRECT_URI}`
    // 필수 옵션.
    url += '&response_type=code'
    // 구글에 등록된 유저 정보 email, profile을 가져오겠다 명시
    url += '&scope=email profile'
    // 완성된 url로 이동
    // 이 url이 위에서 본 구글 계정을 선택하는 화면임.
    res.redirect(url);
})

// 구글 계정 선택 화면에서 계정 선택 후 redirect 된 주소
// 아까 등록한 GOOGLE_REDIRECT_URI와 일치해야 함
// 우리가 http://localhost:3333/login/redirect를
// 구글에 redirect_uri로 등록했고,
// 위 url을 만들 때도 redirect_uri로 등록했기 때문
router.get('/login/redirect', (req, res) => {
    const { code } = req.query;
    // console.log(`code: ${code}`);
    //res.send('ok');
});


// 아이디 확인
router.post('/checkId', (req, res) => {
    let id = req.body.input
    let check = 0;
    conn.query(queries.selectID, [id], (err, rows) => {
        if (rows.length > 0) {
            check = 1
            res.json({ ok: 1 })
        }
        else {
            check = 2
            res.json({ ok: 2 })
        }
        req.session.check = check
    })
})


// 로그아웃
router.get('/logout', (req, res) => {
    // var session = req.session
    console.log('logout 라우터 접근', res)
    // res.redirect('/')
    if (req.session.user) {
        req.session.destroy((err)=>{
            if(err) throw err;
            console.log('세션 삭제하고 로그아웃')
            res.redirect('/login')
        })
    }



    // res.send(`
    // <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>  
    // <script>
    // Kakao.init('c1b7cc23c48477786fcb69b68f5862e5');
    // if (Kakao.Auth.getAccessToken()) {
    //     console.log("유저로그아웃")
    //     Kakao.API.request({
    //         url: '/v1/user/unlink',
    //         success: function (response) {
    //             console.log(response)
    //         },
    //         fail: function (error) {
    //             console.log(error)
    //         },
    //     })
    //     Kakao.Auth.setAccessToken(undefined)
    // }
    // </script>
    // <script>alert("로그아웃");location.href="http://localhost:3333/"</script>
    // `)
})

module.exports = router;