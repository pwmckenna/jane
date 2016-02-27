import request from 'request';
import Q from 'q';
import assert from 'assert';
import nconf from 'nconf';

// https://api.imgflip.com/popular_meme_ids
const memes = [
  {
    regex: /(one does not simply) (.*)/i,
    template_id: 61579
  },
  {
    regex: /(i don'?t always .*) (but when i do,? .*)/i,
    template_id: 61532
  },
  {
    regex: /aliens ()(.*)/i,
    template_id: 101470
  },
  {
    regex: /grumpy cat ()(.*)/i,
    template_id: 405658
  },
  {
    regex: /(.*),? (\1 everywhere)/i,
    template_id: 347390
  },
  {
    regex: /(not sure if .*) (or .*)/i,
    template_id: 61520
  },
  {
    regex: /(y u no) (.+)/i,
    template_id: 61527
  },
  {
    regex: /(brace yoursel[^\s]+) (.*)/i,
    template_id: 61546
  },
  {
    regex: /(.*) (all the .*)/i,
    template_id: 61533
  },
  {
    regex: /(.*) (that would be great|that'?d be great)/i,
    template_id: 563423
  },
  {
    regex: /(.*) (\w+\stoo damn .*)/i,
    template_id: 61580
  },
  {
    regex: /(yo dawg .*) (so .*)/i,
    template_id: 101716
  },
  {
    regex: /(.*) (.* gonna have a bad time)/i,
    template_id: 100951
  },
  {
    regex: /(am i the only one around here) (.*)/i,
    template_id: 259680
  },
  {
    regex: /(what if i told you) (.*)/i,
    template_id: 100947
  },
  {
    regex: /(.*) (ain'?t nobody got time for? that)/i,
    template_id: 442575
  },
  {
    regex: /(.*) (i guarantee it)/i,
    template_id: 10672255
  },
  {
    regex: /(.*) (a+n+d+ it'?s gone)/i,
    template_id: 766986
  },
  {
    regex: /(.* bats an eye) (.* loses their minds?)/i,
    template_id: 1790995
  },
  {
    regex: /(back in my day) (.*)/i,
    template_id: 718432
  }
];
export const generate = input => Q.fcall(() => {
  const meme = memes.find(({ regex }) => regex.test(input));
  assert(meme, 'meme not found');
  const top = input.match(meme.regex)[1];
  const bottom = input.match(meme.regex)[2];
  var defer = Q.defer();
  request.post({
    url: 'https://api.imgflip.com/caption_image',
    qs: {
      template_id: meme.template_id,
      username: nconf.get('IMGFLIP_USERNAME'),
      password: nconf.get('IMGFLIP_PASSWORD'),
      text0: top,
      text1: bottom
    },
    json: true
  }, defer.makeNodeResolver());
  return defer.promise
    .spread((res, body) => body)
    .tap(({ success }) => assert(success, 'request was successful'))
    .get('data').get('url');
});
