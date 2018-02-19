(function () {
  'use strict';

  const MIN_WAIT = 10;
  const MAX_WAIT = 20;
  const LOAD_MORE_COMMENTS_BTN_SELECTOR = '._m3m1c';
  const COMMENTER_NAME_SELECTOR = '._2g7d5';
  const LOAD_MORE_LIKES_ELEM_SELECTOR = '._gwyj6';
  const LIKES_BTN_SELECTOR = '._nzn1h';
  const LIKER_NAME_SELECTOR = '._o5iw8';
  const RESULT_TEXT = 'Participantes:';
  const LOADING_MORE_COMMENTS_TEXT = 'Cargando más comentarios...';
  const LOADING_MORE_LIKES_TEXT = 'Cargando más likes...';
  const WAITING_TEXT = 'Siguiente acción en: ';
  const TAG_TEXT = 'Etiquetando...';
  const COMMENTS = 0;
  const LIKES = 1;

  const DIFF_WAIT = MAX_WAIT - MIN_WAIT;
  let loadMoreCommentsBtn;
  let commentersNames = {};
  let counter = 0;
  let started;
  let helperButtonComments = document.createElement('div');
  let helperButtonLikes = document.createElement('div');
  let helperNote = document.createElement('div');

  const throttle = (func, limit) => {
    let inThrottle
    let lastFunc
    let lastRan
    return function() {
      const context = this
      const args = arguments
      if (!inThrottle) {
        func.apply(context, args)
        lastRan = Date.now()
        inThrottle = true
      } else {
        clearTimeout(lastFunc)
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args)
            lastRan = Date.now()
          }
        }, limit - (Date.now() - lastRan))
      }
    }
  }

  const notify = throttle((text) => {
    helperNote.textContent = text;
  }, 1000);

  const tag = (type) => {
    console.log('%cTagging', 'color: green');
    notify(TAG_TEXT);

    document.querySelectorAll(type === COMMENTS ? COMMENTER_NAME_SELECTOR : LIKER_NAME_SELECTOR).forEach((elem) => {
      let commenterName = elem.textContent;
      let numberElem = document.createElement('span');
      let number;
      if(!commentersNames[commenterName]) {
        number = ++counter;
        commentersNames[commenterName] = number;
      } else {
        number = commentersNames[commenterName];
      }

      numberElem.style.color = 'red';
      numberElem.append(document.createTextNode(number + ': '));
      elem.prepend(numberElem);
    });

    notify(`${RESULT_TEXT} ${counter}`);

    console.log('%cDONE', 'color: green');
    console.log(`%cNumber of commenters: ${counter}`, 'color: green');
  }

  let backCountInterval;
  const countDown = (seconds) => {
    let backCount = Math.floor(seconds);
    backCountInterval = window.setInterval(() => {
      notify(`${WAITING_TEXT} ${backCount--}`)
      if(backCount <= 0) {
        window.clearInterval(backCountInterval);
      }
    }, 1000);
  }

  const loadMore = (type) => {
    console.log(type === COMMENTS ? '%cLoading more comments' : '%cLoading more likes', 'color: blue');
    notify(type === COMMENTS ? LOADING_MORE_COMMENTS_TEXT : LOADING_MORE_LIKES_TEXT);

    if(type === COMMENTS ? loadMoreCommentsBtn.isConnected : document.querySelector(LOAD_MORE_LIKES_ELEM_SELECTOR)) {
      let wait = MIN_WAIT + Math.random() * DIFF_WAIT;
      if(type === COMMENTS) {
        loadMoreCommentsBtn.click();
      } else {
        document.querySelector(LOAD_MORE_LIKES_ELEM_SELECTOR).scrollIntoView();
      }

      console.log(`%cWaiting for ${wait} seconds`, 'color: lightblue');
      countDown(wait);
      window.setTimeout(loadMore.bind(loadMore, type), wait * 1000);
    } else {
      tag(type);
    }
  }

  const start = (type) => {
    if(started) {
      return;
    }
    started = true

    console.group('Instagram Contest Helper');
    if(type === COMMENTS) {
      loadMoreCommentsBtn = document.querySelector(LOAD_MORE_COMMENTS_BTN_SELECTOR);
      loadMore(type)
    } else {
      document.querySelector(LIKES_BTN_SELECTOR).click();
      console.log('%cWaiting for 10 seconds', 'color: lightblue');
      countDown(10);
      window.setTimeout(loadMore.bind(loadMore, type), 10000);
    }
  }

  helperButtonComments.style.position = 'fixed';
  helperButtonComments.style.right = '5px';
  helperButtonComments.style.top = '5px';
  helperButtonComments.style.width = '6px';
  helperButtonComments.style.height = '6px';
  helperButtonComments.style.borderRadius = '3px';
  helperButtonComments.style.backgroundColor = 'blue';
  helperButtonComments.onclick = () => start(COMMENTS);
  document.body.append(helperButtonComments);

  helperButtonLikes.style.position = 'fixed';
  helperButtonLikes.style.right = '16px';
  helperButtonLikes.style.top = '5px';
  helperButtonLikes.style.width = '6px';
  helperButtonLikes.style.height = '6px';
  helperButtonLikes.style.borderRadius = '3px';
  helperButtonLikes.style.backgroundColor = 'red';
  helperButtonLikes.onclick = () => start(LIKES);
  document.body.append(helperButtonLikes);


  helperNote.style.position = 'absolute';
  helperNote.style.right = '100px';
  helperNote.style.top = '2px';
  helperNote.style.color = 'blue';
  document.body.append(helperNote);
}());
