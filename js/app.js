'use strict';

let imageArr = [];

// Horn.prototype.render = function() {

//   //html is a native function//

//   const template = $('#photo-template').html();
//   const newSection = $(`<section class= ${this.keyword}></section>`);
//   newSection.html(template);
//   //find is a native function to target an html element//
//   newSection.find('h2').text(this.title);
//   newSection.find('img').attr('src', this.image_url);
//   newSection.find('p').text(this.description);

//   $('main').append(newSection);
// };
function renderCreature(horn) {
  let template = $(`#${'creature-template'}`).html();
  let markUp = Mustache.render(template, horn);
  $(`#${'flexcontainer'}`).append(markUp);
}
$(document).ready(pageSelect(1));
function pageSelect(pageNum) {

  $.ajax(`data/page-${pageNum}.json`)

  //'change' = type of event we are listening for//
    .then (getHorn => {
      getHorn.sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
      //creature is naming each individual object//
      getHorn.forEach((creature) => {
        let each = new Horn(creature);
        renderCreature(each);
      });
      keyword();
      dropdown();
      // $('.remove').hide();
    });
}

$('#pages').on('change',(event) => {
  let newPage = event.target.value;
  let pageNum = newPage;
  pageSelect(pageNum);
  $('section').remove();
  renderCreature();
  console.log(newPage);
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

$('#sorting').on('change',(event) => {
  let newSort = event.target.value;
  if (newSort === 'horns') {
    $('section').remove();
    let sorted = imageArr.sort(function(a,b) {return a.horns - b.horns});
    sorted.forEach(creature => {
      renderCreature(creature);
    });
    $('section').show();
  }
  else if (newSort === 'title') {
    $('section').remove();
    imageArr.sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    imageArr.forEach(creature => {renderCreature(creature);
    });
    $('section').show();
  }
});

function Horn (horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  imageArr.push(this);
}


