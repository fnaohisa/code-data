import {
  getLastUrlSegment,
  getNumberOfUrlSegment,
  regMatch
} from './components/util';

import {
  readSession,
  writeSession
} from './components/frequencyControl';

const gmo_yads = {};
const SESSION_KEY = 'gmo_yads';
const SESSION_VALUE = '1';

function hasPageBreak (breakpoint: number) {
  if (getNumberOfUrlSegment(location.pathname) >= breakpoint) {
    return true;
  }
  return false;
}

function isArticle () {
  const pathname = location.pathname;
  const re = /^\/\d{2,}.*?\/?/;
  return regMatch(pathname, re);
}

gmo_yads['condition'] = (() => {
  /** セッションにつき1回表示 */
  if (readSession(SESSION_KEY) === SESSION_VALUE) {
    return false;
  }
  /** 記事ページで2ページ目以降は出さない */
  if (isArticle() && hasPageBreak(3)) {
    if (getLastUrlSegment(location.pathname) !== '' || getLastUrlSegment(location.pathname) !== '1') {
      return false;
    }
  }
  writeSession(SESSION_KEY, SESSION_VALUE);
  return true;
})();

/** TSのためのグローバル宣言 */
declare global {
  interface Window {
    gmo_yads: {};
  }
}

window.gmo_yads = gmo_yads;
