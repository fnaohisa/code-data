'use strict';

import {
  setPv,
  getPv,
} from './components/frequencyControl';

import {
  isFromSameHost,
  regReferrerMatch,
} from './components/util';

const SESSION_KEY = 'gmossp_y_pv';
const SESSION_INIT_VALUE = '1';

const GmosspEnableAd = (() => {
  /** リファラとカレントページのドメインチェック */
  if (isFromSameHost() === false) {
    return false;
  }

  /** リファラに「gazo」が入っていない場合は非表示 */
  if (false === regReferrerMatch('gazo')) {
    return false;
  }

  /** pvカウントする */
  setPv(SESSION_KEY, SESSION_INIT_VALUE);

  /** 1回/Session 表示 */
  if (1 < getPv(SESSION_KEY, SESSION_INIT_VALUE)) {
    return false;
  }

  return true;
})();

/**
 * TSのためのグローバル宣言
 * script冒頭でimport/exportしない場合は必要なし
 */
declare global {
  interface Window {
    GmosspEnableAd: {};
  }
}

window.GmosspEnableAd = GmosspEnableAd;