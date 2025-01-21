
const formToRemoveTweet = document.getElementById('formToRemoveTweet');
const inputThumbnailUrl = document.getElementById('inputThumbnailUrl');
const inputPassword = document.getElementById('inputPassword');

formToRemoveTweet.addEventListener('submit', (e) => {
  e.preventDefault();

  const thumbnailUrl = inputThumbnailUrl.value;
  const password = inputPassword.value;

  if (thumbnailUrl.length < 10) {
    alert('サムネイルURLを入力してください。');
    return;
  }

  if (password.length < 10) {
    alert('パスワードを入力してください。');
    return;
  }


  const endpointURL = 'ht' + 'tps://' + 'ap' + 'i.twi' + 'hub' + '.net' + '/a' + 'pi/pub' + 'lic' + '/remo' + 've-' + 'tw' + 'eet';
  const data = {
    thumbnailUrl,
    password,
  };

  console.log('sending data', data);

  const publicToken = 'KJ3m' + 'Y3L' + 'R9Zv' + 'sJW' + 'jy' + '6Hv' + 'G8' + '5r' + 'rXUc' + '3W' + '6' + 'ZvsJ' + 'Zv' + 'sJ' + '7X';

  // postで送信
  fetch(endpointURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + publicToken,
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.ok) {
        alert('削除できたっぽいです。console.logを見てください。');
        console.log(res);
      } else {
        throw new Error(res);
      }
    })
    .catch(err => {
      console.error(err);
      alert('削除できませんでした。');
    });
});