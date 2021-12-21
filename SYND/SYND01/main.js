(function(){
    // 媒体側のDFP経由の表示調整: width: 100%, 高さauto
    var adjustWrapperSize = (ad)=>{
        let DFP_OVERLAY = window.parent.document.querySelector('#dfp_overlay');
        let ad_height = ad.clientHeight;
        if (DFP_OVERLAY) {
            DFP_OVERLAY.style.left = 'auto';
            DFP_OVERLAY.style.transform = 'inherit';
            DFP_OVERLAY.style.width = '100%';
            // DFP内のiframeの制御
            let IFRAME = DFP_OVERLAY.querySelector('iframe[id^=google_ads_iframe]');
            if (IFRAME) {
                IFRAME.style.width = '100%';
                IFRAME.style.height = ad_height + 'px';
            }
        }
    }
    // 表示タイミング
    var displayBlock = (ad) => {
        ad.style.visibility = "visible";
    }

    document.addEventListener("DOMContentLoaded", () => {
        var AD = document.querySelector(".bottom_fixed_ad");
        if (AD) {
            displayBlock(AD);
            adjustWrapperSize(AD);
        }
    });
})();
