'use strict';

let imageArr = [];

Horn.prototype.render = function() {

  //html is a native function//

  const template = $('#photo-template').html();
  const newSection = $(`<section class= ${this.keyword}></section>`);
  newSection.html(template);
  //find is a native function to target an html element//
  newSection.find('h2').text(this.title);
  newSection.find('img').attr('src', this.image_url);
  newSection.find('p').text(this.description);

  $('main').append(newSection);
};

$(document).ready(function() {

  $.ajax('data/page-1.json')
    .then (getHorn => {
      //creature is naming each individual object//
      getHorn.forEach((creature) => {
        new Horn(creature).render();
      });
      keyword();
      dropdown();
      $('.remove').hide();
    });
});
let keywordArr = [];

function keyword() {
  imageArr.forEach(value => {
    //for each item in the image array, if it DOES NOT include the keyword, then run this function//
    if (!keywordArr.includes(value.keyword)) {
      keywordArr.push(value.keyword);
    };

  });
};

function dropdown() {
  let click = $('#sort');
  // empty is a native js function//
  click.empty();
  const option = $('#option');
  keywordArr.forEach(keyword => {
    let sort = $(`<option class=${keyword} value=${keyword}>${keyword}</option>`);
    option.append(sort);
  });
}
$('select').on('change',(event) => {
  let newval = event.target.value;
  console.log(newval);
  $('section').hide();
  $(`.${newval}`).show();
});

function Horn (horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  imageArr.push(this);
}


