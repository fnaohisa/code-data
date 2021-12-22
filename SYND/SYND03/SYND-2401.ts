import { writeSession, readSession, initFreqControl } from './components/frequencyControl';
import { isWithinLimit } from './components/cookie';
import { getUrlQueryVal } from './components/util';
import { defaultParam as param } from './components/const';

// https://gmomobile.backlog.jp/view/SYND-2441#comment-1288495792
// ・2pv以上で表示
// ・2ページ目以降表示しない
// 2ページ目の記事のURL：https://saita-puls.com/19392?page=2
// ・1日に1回のみ表示

// 想定するケース
// #遷移ケース                            [期待ステータス]
// [x] 2ページ目 -> 1ページ目            ... 表示する
// [x] 2ページ目 -> リロード同じ2ページ目  ... 表示しない
// [x] 1ページ目 -> リロード同じ1ページ目  ... 表示する
// [x] 1ページ目 -> 別の1ページ目         ... 表示する
// [x] 2ページ目 -> 3ページ目 -> 1ページ目 ... 表示する
// #フリークエンシーケース                       [期待ステータス]
// [x] 1回上記のテストを行った後別タブで1ページ目表示 ...表示しない

const SESSION_KEY = 'gmossp_y_pv';
const SESSION_INIT_VALUE = '1';

function setPv () {
  let counter: number;
  let pvStored = readSession(SESSION_KEY);
  if (pvStored === null) {
    counter = parseInt(SESSION_INIT_VALUE, 10);
  } else {
    /** 既にセットされていた場合のみカウントアップする */
    counter = parseInt(pvStored, 10);
    counter++;
  }
  const pvToBeStore = counter.toString(10);
  writeSession(SESSION_KEY, pvToBeStore);
}

function isFrontPage () {
  const page = getUrlQueryVal('page');
  if (page !== '') {
    return false;
  }
  return true;
}

function getPv (): number {
  const pv = readSession(SESSION_KEY) || SESSION_INIT_VALUE;
  return parseInt(pv, 10);
}

const GmosspEnableAd = (() => {
  /** pvカウントする */
   setPv();

  /** 2ページ目以降でない = 1ページ目であるか確認 */
  if (isFrontPage() === false) {
    return false;
  }

  /** 1pv目の時は出さない */
  if (getPv() === 1) {
    return false;
  }

  /** フリークエンシーコントロール設定 */
  initFreqControl({
    display_counter_limit: param.display_counter_limit,
    display_counter_expire: param.timer_expire,
    timer_expire: param.timer_expire
  });

  /** 上限に達していたら出さない */
  if (isWithinLimit(param.display_counter_limit, param.display_counter_key) === false) {
    return false;
  }
  return true;
})();

/** TSのためのグローバル宣言 */
declare global {
  interface Window {
    GmosspEnableAd: {};
  }
}

window.GmosspEnableAd = GmosspEnableAd;