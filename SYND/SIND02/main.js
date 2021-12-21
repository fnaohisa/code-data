(function(){
    var bottom_fixed_ad         = document.querySelector(".bottom_fixed_ad"); // 広告のwrapper
    var gmoam_pr                = document.getElementById("gmoam_pr");  // ゲタ

    var ad_move_interval;
    var ad_opacity_interval;
    var ad_timeout;

    const AD_START_HEIGHT       = 150; // 表示位置
    const AD_HEIGHT_INTERVAL    = 1;
    const AD_OPACITY_INTERVAL   = 0.1;
    const TOUCHEND_INTERVAL     = 500;

    // ゲタ
    var addGetaDiv = (PR)=>{
        PR.style.height         = "30px";
        PR.style.lineHeight     = "30px";
        PR.style.background     = "#000000";
        PR.style.textAlign      = "center";
        PR.style.color          = "#fff";
        PR.style.fontSize       = "12px";
    }

    // 最初のdisplay処理
    var display_start = (AD)=>{
        let start_height = AD_START_HEIGHT;

        AD.style.opacity = 0; // これを入れないと一瞬表示される
        AD.style.display = 'block';

        // 動き定義
        ad_move_interval = setInterval(()=>{
            AD.style.bottom = start_height + 'px'; // 最初の出現位置
            start_height -= AD_HEIGHT_INTERVAL; // 1px ずつ落下
            // 最下部(0)に着いたら
            if (start_height < 0) {
                AD.style.bottom = '0px';
                addGetaDiv(gmoam_pr);
                clearInterval(ad_move_interval);
            }
        }, 5);

        // 透過の動き定義
        ad_opacity_interval = setInterval(()=>{
            AD.style.opacity = parseFloat(AD.style.opacity) + parseFloat(AD_OPACITY_INTERVAL);
            let opacity      = parseFloat(AD.style.opacity);
            // opacity 1になったら
            if (opacity >= parseFloat(1)) {
                AD.style.opacity = 1;
                clearInterval(ad_opacity_interval);
            }
        }, 150);

    }

    // ページ下部にオーバーレイ用のスペース
    var paddingBottom = (ad)=>{
        var padding_div = document.createElement('div');
        var ad_height   = ad.clientHeight;
        // body タグの下にpaddin_div追加
        padding_div.style.paddingBottom = ad_height + 'px';
        padding_div.style.background    = 'transparent';
        document.body.appendChild(padding_div);
    }

    // reload
    var reload = (AD)=>{
        // 最初非表示
        AD.style.display        = 'none';
        gmoam_pr.style.height   = '0px';
        // scrollで連続でdisaply_startを発火しても挙動がおかしくならないように
        clearInterval(ad_move_interval);
        clearInterval(ad_opacity_interval);
        clearTimeout(ad_timeout);
        // display_startのタイミング
        ad_timeout = setTimeout(()=>{
            display_start(AD);
        }, TOUCHEND_INTERVAL);
    }

    // load時
    document.addEventListener('DOMContentLoaded', ()=>{
        reload(bottom_fixed_ad);
        // gmoam_pr＝ゲタが表示されてから実行 このリスナは実行一回のみ
        gmoam_pr.addEventListener('transitionend', function exec(){
            gmoam_pr.removeEventListener('transitionend', exec);
            paddingBottom(bottom_fixed_ad);
        });
    });

    // scoll時
    window.addEventListener('scroll', ()=>{
        reload(bottom_fixed_ad);
    });

})();
