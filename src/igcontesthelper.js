(function () {
  'use strict';

  const MIN_WAIT = 10;
  const MAX_WAIT = 20;
  const LOAD_MORE_COMMENTS_BTN_SELECTOR = '.vTJ4h.Dz3II';
  const COMMENTER_NAME_SELECTOR = '.C4VMK';
  const LOAD_MORE_LIKES_ELEM_SELECTOR = '.kM-aa';
  const LIKES_BTN_SELECTOR = '.zV_Nj';
  const LIKER_NAME_SELECTOR = '.FsskP';
  const RESULT_TEXT = 'Participantes:';
  const LOADING_MORE_COMMENTS_TEXT = 'Cargando más comentarios...';
  const LOADING_MORE_LIKES_TEXT = 'Cargando más likes...';
  const WAITING_TEXT = 'Siguiente acción en: ';
  const TAG_TEXT = 'Etiquetando...';
  const DONE_TEXT = 'Listo';
  const WARNING_TEXT = '(advertencia: parecen no haberse cargado todos, vuelva a apretar el botón)';
  const LOADED_ITEMS_TEXT = 'Items cargados:';
  const COMMENTS = 0;
  const LIKES = 1;

  const helperUITemplate = `
  <div style="position: fixed;right: 5px;top: 0;border-radius: 0 0 3px 3px;background-color: #ccc;padding: 2px;box-shadow: 1px 1px 1px rgba(0,0,0,0.5);text-align: center; z-index: 9999">
    <div data-ig-contest-helper-buttons style="display: none;">
      <p>By <a target="_blank" href="https://linkedin.com/in/tomas-girardi/">Tomás Girardi</a> - <a target="_blank" href="https://www.turbomarket.cl/">Turbomarket</a></p>
      <button data-ig-contest-likes-button>Likes</button>
      <button data-ig-contest-comments-button>Comments</button>
      <a target="_blank" href="https://random.org/"><button>Random.org</button></a>
      <div data-ig-contest-note style="color:blue; padding: 2px 6px;"></div>
    </div>
    <p data-ig-contest-handle style="font-size: 10px; line-height: 10px;cursor: pointer;">Contest Helper ⬇</p>
  </div>
  `;

  let loadMoreCommentsBtn;
  let commentersNames = {};
  let counter = -1;
  let helperUI;
  let helperButtons;
  let helperButtonLikes;
  let helperButtonComments;
  let helperHandle;
  let helperNote;
  let pauseTimeout;
  let started;

  const insertElements = () => {
    if(helperUI) {
      helperUI.remove();
    }
    helperUI = document.createElement('div');
    helperUI.innerHTML = helperUITemplate;
    helperButtons = helperUI.querySelector('div[data-ig-contest-helper-buttons]');
    helperButtonLikes = helperUI.querySelector('button[data-ig-contest-likes-button]');
    helperButtonComments = helperUI.querySelector('button[data-ig-contest-comments-button]');
    helperHandle = helperUI.querySelector('p[data-ig-contest-handle]');
    helperNote = helperUI.querySelector('div[data-ig-contest-note]');

    helperButtonLikes.onclick = () => start(LIKES);
    helperButtonComments.onclick = () => start(COMMENTS);
    helperHandle.onclick = toggleButtons;
    document.body.append(helperUI);
  }

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
  }, 800);

  const stillLeft = (type) => {
    return type === COMMENTS ? (loadMoreCommentsBtn && loadMoreCommentsBtn.isConnected) :
      document.querySelector(LOAD_MORE_LIKES_ELEM_SELECTOR);
  }

  const getItems = (type) => {
    return document.querySelectorAll(type === COMMENTS ? COMMENTER_NAME_SELECTOR :
      LIKER_NAME_SELECTOR);
  }

  const tag = (type) => {
    let extra = '';

    console.log(`%c${TAG_TEXT}`, 'color: green');
    notify(TAG_TEXT);

    window.clearInterval(backCountInterval);

    document.querySelectorAll('span[data-ig-contest-number]').forEach(elem => {
      let number = parseInt(elem.textContent);
      if(number > counter) {
        counter = number;
      }
    });

    getItems(type).forEach((elem) => {
      let commenterName = elem.textContent;
      let number;

      if(!elem.querySelector('span[data-ig-contest-number]')) {
        if(!commentersNames[commenterName]) {
          number = ++counter;
          commentersNames[commenterName] = number;
        } else {
          number = commentersNames[commenterName];
        }

        let numberElem = document.createElement('span');
        numberElem.dataset.igContestNumber = true;
        numberElem.style.color = 'red';
        numberElem.append(document.createTextNode(number + ': '));
        elem.prepend(numberElem);
      }
    });

    if(stillLeft(type)) {
      extra = ` ${WARNING_TEXT}`;
    }

    notify(`${RESULT_TEXT} ${counter}${extra}`);

    console.log(`%c${DONE_TEXT}`, 'color: green');
    console.log(`%c${RESULT_TEXT} ${counter}${extra}`, 'color: green');
  }

  let backCountInterval;
  const countDown = (seconds) => {
    let backCount = Math.floor(seconds);
    window.clearInterval(backCountInterval);
    backCountInterval = window.setInterval(() => {
      notify(`${WAITING_TEXT} ${backCount--}`)
      if(backCount <= 0) {
        window.clearInterval(backCountInterval);
      }
    }, 1000);
  }

  const loadMore = (type, minWait = MIN_WAIT, maxWait = MAX_WAIT) => {
    let diffWait = maxWait - minWait;
    let nitems = getItems(type).length;
    console.log(type === COMMENTS ? `%c${LOADING_MORE_COMMENTS_TEXT}` :
      `%c${LOADING_MORE_LIKES_TEXT}`, 'color: blue');
    console.log(`${LOADED_ITEMS_TEXT} ${nitems}`);
    notify(type === COMMENTS ? `${LOADING_MORE_COMMENTS_TEXT} ${LOADED_ITEMS_TEXT} ${nitems}` :
      `${LOADING_MORE_LIKES_TEXT} ${LOADED_ITEMS_TEXT} ${nitems}`);

    helperButtonLikes.onclick = () => start(LIKES);

    window.clearInterval(backCountInterval);
    if(stillLeft(type)) {
      let wait = minWait + Math.random() * diffWait;
      if(type === COMMENTS) {
        loadMoreCommentsBtn.click();
      } else {
        document.querySelector(LOAD_MORE_LIKES_ELEM_SELECTOR).scrollIntoView();
      }

      console.log(`%c${WAITING_TEXT} ${wait}s`, 'color: lightblue');
      countDown(wait);
      pauseTimeout = window.setTimeout(loadMore.bind(loadMore, type, minWait, maxWait), wait * 1000);
    } else {
      tag(type);
    }
  }

  const start = (type, minWait = MIN_WAIT, maxWait = MAX_WAIT) => {
    window.clearTimeout(pauseTimeout);
    window.clearInterval(backCountInterval);

    console.group('Instagram Contest Helper');
    if(type === COMMENTS) {
      helperButtonLikes.disabled = true;
      loadMoreCommentsBtn = document.querySelector(LOAD_MORE_COMMENTS_BTN_SELECTOR);
      loadMore(type, minWait, maxWait)
    } else {
      helperButtonComments.disabled = true;

      if(!started) {
        document.querySelector(LIKES_BTN_SELECTOR).click();
        console.log(`%c${WAITING_TEXT} 10s`, 'color: lightblue');
        countDown(10);
        pauseTimeout = window.setTimeout(loadMore.bind(loadMore, type, minWait, maxWait), 10000);
      } else {
        loadMore(type, minWait, maxWait);
      }
    }
    started = true;
  }

  const toggleButtons = () => {
    helperButtons.style.display = helperButtons.style.display === 'block' ? 'none' : 'block';
  };

  if(!window.igcontesthelper) {
    window.igcontesthelper = { start };
  }

  insertElements();
}());
