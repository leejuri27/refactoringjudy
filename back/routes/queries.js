module.exports = {
  // 일반 회원가입 할때 
  joinUser: `insert into al_user (user_id, user_pw, user_name, user_nick, user_phone) values( ?,?,?,?,?)`,

  selectID: `select * from al_user where user_id = ?`,
  // 아이디 검색
  searchId: `select * from al_user where user_id = ? and user_pw = ?`,

  // 메뉴정보 전체 출력
  menuInfoAll: `select * from al_menu a left join al_shop b on(a.shop_seq = b.shop_seq)`,

  //메뉴검색 & 카테고리(전체 선택)
  searchMenu: `select * from al_shop a inner join al_menu b on ( a.shop_seq = b.shop_seq ) where b.menu_name like ?`,

  //메뉴검색 - 카테고리별 선택
  searchMenuCategory: `select * from al_shop a inner join al_menu b on ( a.shop_seq = b.shop_seq ) where b.menu_name like ? and b.menu_category like ?`,

  //검색 - 메뉴선택 - 지도 위도 경도가져오기
  shopLocation: `select a.lat, a.lng from al_shop a inner join al_menu b on ( a.shop_seq = b.shop_seq ) where b.shop_seq = ?`,


  //리뷰 등록
  addReview: `insert into al_review (menu_seq, review_content, user_id) values (?,?,?)`,



  ///////// 관리자페이지 /////////

  //관리자 로그인
  adminLogin: `select * from al_admin where admin_id = ? and admin_pw = ?`,

  //// 회원관리 ////
  // 사용자 모두 가져오기
  userAll: `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, user_seq, user_id ,user_pw ,user_name ,user_nick ,user_phone,created_at FROM al_user`,

  // 사용자 검색
  userNameSearch: `select row_number() over (ORDER BY created_at) AS rownum, user_seq, user_id ,user_pw ,user_name ,user_nick ,user_phone,created_at from al_user where user_id like ?`,

  // 회원 관리 - 사용자 삭제
  userDelete: `delete from al_user where user_seq = ?`,


  //// 카페관리 ////
  // 가게 등록하기
  insertShop: `INSERT INTO al_shop (shop_name, shop_bno, shop_addr1, shop_addr2, shop_tel, shop_owner, lat, lng) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,

  // 가게 위치 정보 가져오기
  shopLocationAll: `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_name, shop_addr1, lat, lng FROM al_shop `,

  // 가게 위치 검색
  shopLocationSearch: `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_name, shop_addr1, lat, lng FROM al_shop where shop_name like ?`,
  // (shop_name, shop_bno, shop_addr1, shop_addr2, shop_tel, shop_owner) 

  // 메뉴 등록하기
  insertMenu: 'INSERT INTO al_menu (shop_seq, menu_name, menu_price, menu_desc, menu_type, menu_options, menu_category, menu_ingredient_tag, menu_img) VALUES(?,?,?,?,?,?,?,?,?)',

  // 가게 모두 가져오기
  shopAll: `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_seq, shop_img, shop_name, shop_bno, shop_addr1, shop_addr2, shop_tel, shop_owner, created_at FROM al_shop`,

  // 가게 수정
  shopModify: `update al_shop set shop_name=?, shop_bno=?, shop_addr1=?, shop_addr2=?, shop_tel=?, shop_owner=? where shop_seq=?`,

  // 하나의 가게정보 가져오기
  shopMenu: `SELECT row_number() over (order by menu_seq) as rownum, shop_seq, menu_seq, menu_name, menu_price, menu_desc, menu_type, menu_options, menu_category, menu_ingredient_tag, menu_img FROM al_menu where shop_seq = ? `,

  // 가게 검색
  shopNameSearch: `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_seq, shop_name, shop_bno, shop_addr1, shop_addr2, shop_tel, shop_owner, created_at FROM al_shop where shop_name like ?`,

  // 가게 삭제
  shopDelete: `delete from al_shop where shop_seq = ?`,

  //가게 정보 가져오기
  selectLocationAll: `select lat, lng,shop_name,shop_addr1,shop_addr2,shop_tel,shop_img from al_shop`,

  // 메뉴 정보
  menuInfo: `SELECT * FROM al_menu where menu_seq = ? `,

  // 메뉴 등록하기
  insertMenu: 'INSERT INTO al_menu (shop_seq, menu_name, menu_img, menu_price, menu_type, menu_options, menu_desc, menu_category, menu_ingredient_tag) VALUES(?,?,?,?,?,?,?,?,?)',

  // 메뉴 수정하기
  updateManu: `UPDATE al_menu SET menu_name = ?, menu_price = ?, menu_desc =?, menu_type =?, menu_options =?, menu_category =?, menu_ingredient_tag =?, menu_img =? where menu_seq = ?`,

  // 메뉴 삭제
  menuDelete: `delete from al_menu where menu_seq = ?`,


  //// 카페관리 ////
  // 가게 정보가져오기
  selectShop: `SELECT * FROM al_shop WHERE shop_seq = ?`,

  // 가게 등록하기
  insertShop: `INSERT INTO al_shop (shop_name, shop_bno, shop_addr1, shop_addr2, shop_tel, shop_owner,shop_img) VALUES(?, ?, ?, ?, ?, ?, ?)`,

  // 가게정보 수정하기
  updateShop: 'UPDATE al_shop SET shop_name = ?, shop_bno = ?, shop_addr1 = ?, shop_addr2 = ?, shop_tel = ?, shop_owner = ?,shop_img = ? where shop_seq = ?',

  // 가게 위치 정보 가져오기
  shopLocationAll: `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_name, shop_addr1, lat, lng FROM al_shop `,

  // 가게 위치 검색
  shopLocationSearch: `SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS rownum, shop_name, shop_addr1, lat, lng FROM al_shop where shop_name like ?`,


  // 메뉴 리뷰 가져오기
  getMenuReview:`select a.menu_name,a.menu_img,a.menu_desc,a.menu_price,a.menu_options,a.shop_seq,b.menu_seq,b.user_id,b.review_seq,b.review_content,c.shop_name from al_menu a left outer join al_review b on (a.menu_seq = b.menu_seq) inner join al_shop c on(a.shop_seq = c.shop_seq ) where a.menu_seq = ?`,

  // 리뷰 관리 - 전체 검색
  reviewAll: `select row_number() over (order by c.created_at) as rownum, 
	a.shop_name, b.menu_name, c.user_id, c.created_at, c.review_content, c.review_seq
  from al_shop a inner join al_menu b
    on a.shop_seq = b.shop_seq 
  right outer join al_review c 
    on b.menu_seq  = c.menu_seq `,

  // 리뷰 관리 - 카테고리 검색(글쓴이)
  reviewSearchUser: `select row_number() over (order by c.created_at) as rownum, 
	a.shop_name, b.menu_name, c.user_id, c.created_at, c.review_content, c.review_seq
  from al_shop a inner join al_menu b
    on a.shop_seq = b.shop_seq 
  right outer join al_review c 
    on b.menu_seq  = c.menu_seq 
 where c.user_id like ?`,

  // 리뷰 관리 - 카테고리 검색(내용)
  reviewSearchContent: `select row_number() over (order by c.created_at) as rownum, 
	a.shop_name, b.menu_name, c.user_id, c.created_at, c.review_content, c.review_seq
  from al_shop a inner join al_menu b
    on a.shop_seq = b.shop_seq 
  right outer join al_review c 
    on b.menu_seq  = c.menu_seq 
 where c.review_content like ?`,

  // 리뷰 관리 - 삭제
  reviewDelete: `delete from al_review where review_seq = ?`,




  ///////////// 마이페이지 ///////////////

  // 내 메뉴 가져오기
  myMenu: `select b.menu_img, b.menu_name, c.shop_name, a.menu_seq from al_favorite_menu a inner join al_menu b on (a.menu_seq = b.menu_seq) inner join al_shop c on (b.shop_seq = c.shop_seq) where a.user_id = ? and a.menu_like_yn = 'Y'`,
  // 내 카페 가져오기
  myShop: `select b.shop_img, b.shop_name, b.shop_addr1, a.shop_seq from al_favorite_shop a inner join al_shop b on (a.shop_seq = b.shop_seq) where a.user_id = ? and a.shop_like_yn = 'Y'`,

  // 내 리뷰 가져오기
  myReview: `select a.review_content, a.user_id, a.created_at, b.menu_name, b.menu_img, c.shop_name, a.review_seq from al_review a inner join al_menu b on (a.menu_seq = b.menu_seq) inner join al_shop c on (b.shop_seq = c.shop_seq) where a.user_id = ? `,

  // 리뷰 관리 - 삭제
  myReviewDelete: `delete from al_review where review_seq = ? and user_id = ?`,

  //좋아요

  //좋아요 모두 찾기
  LikeSearch : `select a.user_id ,a.shop_seq, a.shop_like_yn , b.menu_seq, b.menu_like_yn, c.review_seq, c.review_like_yn  from al_favorite_shop a inner join al_favorite_menu b on (a.user_id = b.user_id) inner join al_like c on (b.user_id = c.user_id) where a.user_id = ?`,


  //가게 좋아요 누른지 확인할때
  shopLikeSearch: `select * from al_favorite_shop where user_id = ?`,

  //가게 좋아요 처음
  shopInsertLike: `insert into al_favorite_shop (user_id, shop_seq) value (?,?)`,

  //가게 좋아요 누를때
  shopLike: `update al_favorite_shop set shop_like_yn = ? where user_id = ? and shop_seq = ?`,

  //가게 좋아요 지우기
  menuDeleteLike: `delete from al_favorite_menu where user_id = ? and menu_seq = ?`,

  //메뉴 좋아요 누른지 확인할때
  menuLikeSearch: `select * from al_favorite_menu where user_id = ?`,

  //메뉴 좋아요 처음 볼때
  menuInsertLike: `insert into al_favorite_menu (user_id, menu_seq) values (?,?)`,

  //메뉴 좋아요 누를때
  menuLike : `update al_favorite_menu set menu_like_yn = ? where user_id = ? and menu_seq = ?`,

  //리뷰 전체 확인용
  allReviewLikeSearch : `select * from al_like where user_id = ?`,

  //리뷰 좋아요 처음 누를때
  insertLikeReview : `insert into al_like (review_seq,user_id,review_like_yn) values (?,?,?)`,

  //리뷰 좋아요 누를때
  updateLikeReview : `update al_like set review_like_yn = ? where user_id = ? and review_seq = ?`,




  ///////////// 랭킹 ///////////////
 
  //리뷰 많은 메뉴순 (3순위)
  menuRanking : `SELECT sub.* 
  FROM (
      SELECT ROW_NUMBER() OVER (ORDER BY sub_count DESC) AS rownum,
             sub.shop_name,
             sub.menu_name,
             sub.menu_seq,
             sub.menu_img,
             sub.sub_count
        FROM (
            SELECT s.shop_name,
                   m.menu_name,
                   m.menu_img,
                   a.menu_seq,
                   COUNT(*) AS sub_count
              FROM al_review a
              INNER JOIN al_menu m ON (a.menu_seq = m.menu_seq)
              INNER JOIN al_shop s ON (m.shop_seq = s.shop_seq)
            GROUP BY a.menu_seq, m.menu_name, s.shop_name
        ) sub
  ) sub
  WHERE sub.rownum <= 5`,

  //추천 많은 리뷰순
  reviewRanking : `select sub.*
  from (
	SELECT ROW_NUMBER() OVER (ORDER BY sub_count DESC) AS rownum,
		sub.shop_name,
	    sub.menu_name,
	    sub.menu_img,
		sub.review_content,
		sub.sub_count
	  from (
		select a.shop_name,
			   b.menu_name,
			   b.menu_img,
			   c.review_content,
			   count(*) as sub_count
		  from al_shop a inner join al_menu b 
		    on (a.shop_seq = b.shop_seq) inner join al_review c 
		    on (b.menu_seq = c.menu_seq) inner join al_like d 
		    on (c.review_seq = d.review_seq)
		 where d.review_like_yn = 'Y'
		 group by c.review_seq, d.review_seq 
		   ) sub
      ) sub
where sub.rownum <= 5`,

findId : `select user_id, created_at from al_user where user_name=? and user_phone=?`







}