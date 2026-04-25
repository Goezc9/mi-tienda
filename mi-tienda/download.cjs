const fs = require('fs');
const https = require('https');

const url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzNjNmU0MTgzYjBhNzRjMWZiMzYyYmE2ZDEwNTU5N2Y3EgsSBxDO4uz_8gYYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjU4Njg0MzQwODAxNTgxNjU3Ng&filename=&opi=89354086";
const file = fs.createWriteStream("screen_auth.html");

https.get(url, response => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download completed');
  });
}).on('error', err => {
  fs.unlink("screen_auth.html");
  console.error(err.message);
});
