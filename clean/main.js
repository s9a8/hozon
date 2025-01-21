// https://obfuscator.io/

// オブジェクトの配列からユニークな項目をフィルタリングする関数
function getUniqueItemsByProperty(array, property) {
  // ユニークな項目を追跡するための空のオブジェクトを初期化
  const uniqueItems = {};

  // 配列内の各項目に対してループを行う
  array.forEach((item) => {
    // 現在の項目に対してプロパティの値を取得
    const propertyValue = item[property];

    // このプロパティの値がまだ見られていない場合、この項目をユニークな項目に追加
    if (!uniqueItems[propertyValue]) {
      uniqueItems[propertyValue] = item;
    }
  });

  // ユニークな項目のオブジェクトを配列に変換して返す
  return Object.values(uniqueItems);
}

// bad_tweets_thumbnailsを取得する関数
async function getBadTweetsThumbnails() {
  const endpointURL = 'ht' + 'tps://' + 'ap' + 'i.twi' + 'hub' + '.net' + '/a' + 'pi/pub' + 'lic' + '/ba' + 'd-t' + 'wee' + 'ts-thu' + 'mb' + 'nails';
  const publicToken = 'KJ3m' + 'Y3L' + 'R9Zv' + 'sJWj' + 'y' + '6Hv' + 'G85' + 'r' + 'rXUc' + '3W6' + 'Z' + 'vsJ' + 'Zv' + 'sJ7X';
  // Fetch bad_tweets_thumbnailsを取得する関数
  let badTweetsThumbnails = [];
  try {
    const response = await fetch(endpointURL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + publicToken
      }
    });
    const resObj = await response.json();
    badTweetsThumbnails = resObj.data;
  }
  catch (error) {
    console.error('Error fetching bad_tweets_thumbnails data:', error);
  }
  return badTweetsThumbnails;
}


// データをHTMLに表示する関数
async function displayData(tweetsData) {
  // bad_tweets_thumbnailsを取得しておく
  const badTweetsThumbnails = await getBadTweetsThumbnails();

  // tweetsDataのpointsが大きい順に並び替える
  tweetsData.sort((a, b) => (b.points - a.points));

  // `tweets`のdiv要素を取得する
  const tweetsDiv = document.getElementById('tweets');

  // ループを使用して各ツイートを表示する
  tweetsData.forEach((item, index) => {
    // thumbnailUrl, videoUrlが存在しない場合にはスキップする
    if (!item.thumbnailUrl || !item.videoUrl) {
      console.warn('no thumbnail or video url. skipped');
      return;
    }
    // twivideoが含まれている場合にはスキップする
    if (item.videoUrl.includes('twivideo') || item.thumbnailUrl.includes('twivideo')) {
      console.warn('bad text. skipped');
      return;
    }
    // twidougaが含まれている場合にはスキップする
    if (item.videoUrl.includes('twidouga') || item.thumbnailUrl.includes('twidouga')) {
      console.warn('bad text. skipped');
      return;
    }
    // twiigleが含まれている場合にはスキップする
    if (item.videoUrl.includes('twiigle') || item.thumbnailUrl.includes('twiigle')) {
      console.warn('bad text. skipped');
      return;
    }
    // Array.prototype.someを使用して、不適切なサムネイルを含む場合にはスキップする
    const hasBadTweetsThumbnails = badTweetsThumbnails.some(badThumbnail => item.thumbnailUrl.includes(badThumbnail));
    if (hasBadTweetsThumbnails) {
      console.warn('bad tweet. skipped');
      return;
    }

    // ツイート番号を取得（インデックスは0から始まるため、1を足す）
    const tweetNumber = index + 1;

    // <div>を作成する
    const eachTweetDiv = document.createElement('div');

    // divにクラスを追加する
    eachTweetDiv.classList.add('col-6', 'col-sm-4', 'col-lg-3', 'p-1', 'm-0');

    // divの中身にHTMLを追加する
    eachTweetDiv.innerHTML = `
          <div class='card m-0'>
            <div class='text-center'>No.${tweetNumber}</div>
            <a href='viewer.html?video=${item.videoUrl}' target='_blank' title='動画再生・保存'>
              <img class='tweet-thumbnail' src='${item.thumbnailUrl}' height='240' loading='lazy'>
            </a>
          </div>
        `;

    // eachTweetDiv要素を追加する
    tweetsDiv.appendChild(eachTweetDiv);
  }
  );
}

// function to get the query 'type' value from current URL
// @param {string} variable - Query variable to get the value of
function getQueryValue(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}

// h1ページタイトルを変更する関数
function changePageTitle(type) {
  let pageTitle = '';
  switch (type) {
    case '1d':
      pageTitle = 'Twitter動画保存ランキング（24時間）';
      break;
    case '3d':
      pageTitle = 'Twitter動画保存ランキング（3日間）';
      break;
    case '7d':
      pageTitle = 'Twitter動画保存ランキング（7日間）';
      break;
    default:
      pageTitle = 'Twitter動画保存ランキング';
  }
  if (!pageTitle) {
    pageTitle = 'Twitter動画保存ランキング';
  }
  document.getElementById('page-title').innerHTML = pageTitle;
}


// ツイートを取得する関数
async function getTweets() {
  // h1ページタイトルを変更する
  changePageTitle('1d');

  const baseEndpointUrl = 'ht' + 'tps://' + 'ap' + 'i.twi' + 'hub' + '.net' + '/a' + 'pi/pub' + 'lic' + '/twe' + 'ets/';
  const publicToken = 'KJ3m' + 'Y3L' + 'R9Zv' + 'sJW' + 'jy' + '6Hv' + 'G8' + '5r' + 'rXUc' + '3W' + '6' + 'ZvsJ' + 'Zv' + 'sJ' + '7X';

  // Fetch 1d tweets data
  const tweets1d =
    await fetch(baseEndpointUrl + '1d', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + publicToken
      }
    })
      .then(response => response.json())
      .then(resObj => {
        return resObj.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        return [];
      });

  console.log('tweets1d', tweets1d);

  // // Fetch 7d tweets data
  // const tweets7d =
  //   await fetch(baseEndpointUrl + '7d', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer ' + publicToken
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(resObj => {
  //       return resObj.data;
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //       return [];
  //     });

  // // データ結合
  // const combinedTweets = [...tweets1d, ...tweets7d];

  // 'thumbnailUrl' によって
  // ユニークなデータをフィルタリング
  const uniqueTweets = getUniqueItemsByProperty(tweets1d, 'thumbnailUrl');
  console.log('uniqueTweets', uniqueTweets);

  // 表示する
  displayData(uniqueTweets);
}


// 引数の配列から重複を削除する関数
function getUniqueItemsForArray(array) {
  return array.filter((x, i, self) => self.indexOf(x) === i);
}

// KVのbad_tweets_thumbnailsを更新する関数
async function updateBadTweetsThumbnails(badThumbnails) {
  if (!badThumbnails || badThumbnails.length === 0) {
    console.error('Error: 引数のbadThumbnails is empty');
    return;
  }

  // KVのbad_tweets_thumbnailsを更新する
  // TODO: あとはここのAPIを叩くだけ。APIも実装する必要あるよ。2023年11月21日(火)
  const endpointURL = 'ht' + 'tps://' + 'ap' + 'i.twi' + 'hub' + '.net' + '/a' + 'pi/pub' + 'lic' + '/ba' + 'd-t' + 'wee' + 'ts-thu' + 'mb' + 'nails';
  const publicToken = 'KJ3m' + 'Y3L' + 'R9Zv' + 'sJWj' + 'y' + '6Hv' + 'G85' + 'r' + 'rXUc' + '3W6' + 'Z' + 'vsJ' + 'Zv' + 'sJ7X';
  try {
    const response = await fetch(endpointURL, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + publicToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: badThumbnails
      })
    });
    const resObj = await response.json();
    console.log(resObj);
  }
  catch (error) {
    console.error('Error updating bad_tweets_thumbnails data:', error);
  }
}


// ツイートのサムネイルが404の場合に、bad_tweets_thumbnailsに追加する関数 TODO:編集中。未実装。
async function catchBadThumbnailsAndUpdateKV() {
  // Query valueを取得する
  const key = getQueryValue('key');
  if (!key) {
    return;
  }
  if (key !== '9w47HshLVR8d') {
    console.error('Error: Invalid key value');
    return;
  } else {
    console.log('Valid key value👍');
  }

  // 既存のKVのbad_tweets_thumbnailsを取得する
  let existingBadTweetsThumbnails = await getBadTweetsThumbnails();

  // ループを使用して各ツイートのサムネイルURLにアクセスして、アクセスできない場合にはnewBadTweetsThumbnailsに追加する
  let newBadTweetsThumbnails = [];
  // tweet-thumbnailクラスを持つ要素を取得する
  const tweetThumbnailElements = document.getElementsByClassName('tweet-thumbnail');
  // tweetThumbnailElementsを配列に変換する
  const tweetThumbnailElementsArray = Array.prototype.slice.call(tweetThumbnailElements);
  // Array.prototype.forEachを使用して、各要素に対してループを行う
  tweetThumbnailElementsArray.forEach((element) => {
    console.log('looping');
    // naturalWidthが0の場合には、newBadTweetsThumbnailsに追加する
    if (element.naturalWidth === 0) {
      // 画像データが存在しない場合など、幅が利用できない場合は、 naturalWidth は 0 を返します。
      newBadTweetsThumbnails.push(element.src);
      console.warn(element.src);
    }
  });

  if (newBadTweetsThumbnails.length === 0) {
    console.log('Wow. No bad thumbnails👍 return.');
    return;
  }

  // existingとnewを結合する
  const badTweetsThumbnails = [...existingBadTweetsThumbnails, ...newBadTweetsThumbnails];

  // 重複を削除する
  const uniqueBadTweetsThumbnails = getUniqueItemsForArray(badTweetsThumbnails);

  // KVのbad_tweets_thumbnailsを更新する
  updateBadTweetsThumbnails(uniqueBadTweetsThumbnails);
}



// ツイートを取得して、表示する
getTweets();


// // エラーのサムネイルを取得して、KVに保存する
// // 3秒後に実行する
// setTimeout(catchBadThumbnailsAndUpdateKV, 3000);