const express = require('express')
const router = express.Router()
const queries = require('./queries')
const conn = require('../config/database')
const multer = require('multer')

/////////////////////////  user 페이지  //////////////////////////////
// 메인 페이지 이동
router.get('/', (req, res) => {
    // console.log('kakao user_name:', req.query.user_name)
    if (req.query.user_name != undefined) {
        req.session.user.user_name = req.query.user_name
    }
    // console.log('session :',req.session.user.user_name)
    if (req.session.user === undefined) {
        res.render('index')
    } else {
        res.render('index', { user_id: req.session.user.user_id })
    }
})




// 로그인 페이지 이동
router.get('/login', (req, res) => {
    res.render('login')
})

// 회원 가입 페이지 이동
router.get('/join_user', (req, res) => {
    res.render('join_user')
})

// 아이디찾기 페이지 이동
router.get('/find_id', (req, res) => {
    res.render('find_id')
})

/////////////////////////////관리자페이지/////////////////////////////////

// admin로그인 페이지 이동
router.get('/m_login', (req, res) => {
    res.render('m_login')
})

// 회원관리 - 사용자 페이지로 이동
router.get('/m_user', (req, res) => {
    const userSearch = queries.userAll
    conn.query(userSearch, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.render('m_user', { list: result })
        }
    })
})

// 회원관리 - 사용자 삭제
router.post('/m_user', (req, res) => {
    res.render('m_user')
})

// 회원관리 - 등록가게 페이지로 이동
router.get('/m_shop', (req, res) => {
    const shopInfo = queries.shopAll
    conn.query(shopInfo, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.render('m_shop', { list: result })
        }
    })
})

// 회원관리 - 가게 수정버튼 -> 수정페이지로 이동
router.post('/shopModify', (req, res) => {
    res.render('shopModify')
})

// 카페관리 - 가게 정보 수정 페이지로 이동
router.get('/m_shop_dt', (req, res) => {
    // res.render('m_shop_dt')
    const menuInfo = queries.shopMenu
    console.log("reqqury:", req.query)
    conn.query(menuInfo, [req.query.shop_seq], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("result : ", result)
            res.render('m_shop_dt', {
                list: result,
                name: req.query.shop_name,
                shop_seq: req.query.shop_seq
            })
        }
    })
})

// 회원관리 - 사용자 삭제
router.post('/m_shop', (req, res) => {
    res.render('m_shop')
})

// 카페관리 - 가게 세부 메뉴 페이지로 이동
router.get('/m_shop_dt', (req, res) => {
    res.render('m_shop_dt')
})

// 카페관리 - 가게 수정페이지 이동
router.get('/m_shop_modi', (req, res) => {
    console.log("modify : ", req.query.shop_seq)
    conn.query(queries.selectShop, [req.query.shop_seq], (err, rows) => {
        console.log("rows :", rows);
        res.render('m_shop_modi', {
            cols: rows[0],
            shop_seq: req.query.shop_seq
        })
    })

})

// 카페관리 - 가게 메뉴 등록 페이지로 이동
router.get('/m_newmenu', (req, res) => {
    console.log(req.query)
    res.render('m_newmenu')
})

// 카페관리 - 가게 메뉴 수정 페이지로 이동
router.get('/m_menu_modi', (req, res) => {
    const menuInfo = queries.menuInfo
    console.log("reqqury:", req.query)
    conn.query(menuInfo, [req.query.menu_seq], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("result : ", result)
            res.render('m_menu_modi', {
                cols: result[0],
                shop_name: req.query.shop_name,
                shop_seq: req.query.shop_seq

            })
        }
    })
})

// 카페관리 - 신규 가게 등록 페이지로 이동
router.get('/m_newshop', (req, res) => {
    res.render('m_newshop')
})

// 카페관리 - 리뷰관리 페이지로 이동
router.get('/m_review', (req, res) => {
    const reviewInfo = queries.reviewAll
    conn.query(reviewInfo, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.render('m_review', { list: result })
        }
    })
})


// 카페관리 - 삭제
router.post('/m_review', (req, res) => {
    res.render('m_review')
})

// 이미지파일경로 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/asset/img/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.mimetype.split('/')[1])
    }
});

const upload = multer({ storage: storage });

// 이미지 저장
router.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    if (req.file) {
        res.json({ imageUrl: `../public/asset/img/${req.file.filename}` });
    } else {
        res.status(400).send('Error uploading file.');
    }
});

/////////////////////////  mypage 페이지  //////////////////////////////

// mypage - 내가 찜한 메뉴
router.get('/mypage', (req, res) => {
    const currentUser = req.session
    const myMenu = queries.myMenu
    const myShop = queries.myShop
    const myReview = queries.myReview

    if (currentUser.user != undefined) {

        conn.query(myMenu, [currentUser.user.user_id], (err, myMenu_result) => {

            conn.query(myShop, [currentUser.user.user_id], (err, myShop_result) => {
                conn.query(myReview, [currentUser.user.user_id], (err, myReview_result) => {
                    res.render('mypage', {
                        menulist: myMenu_result,
                        shoplist: myShop_result,
                        reviewlist: myReview_result,
                        user_id: currentUser.user.user_id
                    })
                })
            })
        })
    } else {
        res.send("<script>alert('로그인 후 이용가능한 페이지입니다.');location.href='http://localhost:3333/login';</script>")
    }
})

router.post('/setlike', (req, res) => {
    // console.log('setlike',req.body)
    // let menu_seq = req.body.menu_seq
    let { check, menu_seq, shop_seq } = req.body
    let id = req.session.user.user_id
    console.log('setlike', check, menu_seq, shop_seq)
    if (check == 'menu') {
        conn.query(queries.menuLike, ['N', id, menu_seq], (err, rows) => {
            console.log('setlike conn', rows)
            // res.json({ result: 'success' })
            res.render('mypage')
        })
    } else {
        conn.query(queries.shopLike, ['N', id, shop_seq], (err, rows) => {
            // res.json({ result: 'success' })
            res.render('mypage')
        })
    }
})

router.post('/reviewdel', (req, res) => {
    let review_seq = req.body.review_seq
    let id = req.session.user.user_id
    conn.query(queries.myReviewDelete, [review_seq, id], (err, rows) => {
        res.json({ result: 'success' })
    })
})

/////////////////////////  ranking 페이지  //////////////////////////////

// ranking
// 카페관리 - 리뷰관리 페이지로 이동
router.get('/ranking', (req, res) => {
    const currentUser = req.session
    const menuRanking = queries.menuRanking
    const reviewRanking = queries.reviewRanking
    console.log(currentUser.user)

    conn.query(menuRanking, (err, m_result) => {
        conn.query(reviewRanking, (err, r_result) => {
            if (currentUser.user != undefined) {
                res.render('ranking', {
                    M_Rlist: m_result,
                    R_Rlist: r_result,
                    user_id: currentUser.user.user_id
                })
            } else {
                res.render('ranking', {
                    M_Rlist: m_result,
                    R_Rlist: r_result
                })
            }
        })
    })
})

// router.get('/layout',(req,res)=>{
//     const currentUser = req.session
//     // console.log(user_id_search, '0000000000000000')
//     res.render('layout',{user_id_search : currentUser.user.user_id})
// })

module.exports = router;