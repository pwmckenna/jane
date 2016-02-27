import assert from 'assert';
import { generate } from '../memes'
import { isURL } from 'validator';

describe('memes', function () {
  it('generates a meme url', function (done) {
    const input = 'one does not simply send memes';
    generate(input)
      .tap(url => assert(isURL(url), 'expects a url'))
      .nodeify(done);
  });
});