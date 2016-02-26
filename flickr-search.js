var loadCountNum = 0;
var loadCountText = 0;
var listCountNum = 0;
var imgID;
var IntervalFlag = false;
var clearCountAnimation;
var clearCountMonitoring;



// 画像検索を行う関数
function photo_search ( param ) {
    // APIリクエストパラメタの設定
    param.api_key  = '7ac*******e19';
    param.method   = 'flickr.favorites.getList';
    param.format   = 'json';
    param.user_id  = '9**********N05';

    // APIリクエストURLの生成(GETメソッド)
    var url = 'https://api.flickr.com/services/rest/?method=flickr.favorites.getList&' + obj2query( param );
        return url;
};

// 現在の表示内容をクリアする
function remove_children ( id ) {
    var div = document.getElementById( id );
    while ( div.firstChild ) {
        div.removeChild( div.lastChild );
    }
};
// オブジェクトからクエリー文字列を生成する関数
function obj2query ( obj ) {
    var list = [];
    for( var key in obj ) {
        var k = encodeURIComponent(key);
        var v = encodeURIComponent(obj[key]);
        list[list.length] = k+'='+v;
    }
    var query = list.join( '&' );
    return query;
}

// Flickr検索終了後のコールバック関数
function jsonFlickrApi ( data ) {
    // データが取得できているかチェック
    if ( ! data ) return;
    if ( ! data.photos ) return;

    var list = data.photos.photo;
    if ( ! list ) return;
    if ( ! list.length ) return;
    listCountNum = list.length;

    // 現在の表示内容（Loading...）をクリアする
    remove_children( 'photos_here' );

    // 各画像を表示する
    var div = document.getElementById( 'photos_here' );

    for( var i=0; i<listCountNum; i++ ) {
        var photo = list[i];


        // img 要素の生成
            img               = new Image();
            //画像の読み込み始まる・・・・
            img.src           = '';
            img.originSrc     = 'http://static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
            img.style.border  = '0';
            img.style.opacity = '0';
            img.id            = 'photos'+i;
            img.width         = '550';
            div.appendChild( img );
            img.src = img.originSrc;
            loadCount(img);
          }
        }


      function loadCount(img){
            img.onload = function(){
              $("#photos_text > p").text(loadCountText + "/" + listCountNum);
              loadCountNum++;
                if(!IntervalFlag){
                  IntervalFlag = true;
                  countAnimation();
                  countMonitoring();
                }else{
                  //なにもしない・・・
                }


              };
            function countAnimation(){
              clearCountAnimation = setInterval(
                function(){
                  if(loadCountText < loadCountNum){
                    loadCountText++;
                  }
                  $("#photos_text > p").text(loadCountText + "/" + listCountNum);
                }, 100);
            }
            function countMonitoring(){
              clearCountMonitoring = setInterval(
                function(){
                  if(loadCountText >= listCountNum){
                    IntervalFlag = false;
                    clearInterval(clearCountAnimation);
                    clearInterval(clearCountMonitoring);
                    clearInterval(clearCanvas);

                    sildeMove();
                  }
                }, 100);
            }
          }
