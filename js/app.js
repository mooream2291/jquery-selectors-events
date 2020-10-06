'use strict'

let imageArr = [];

$(document).ready(function() {

  $.ajax('data/page-1.json')
    .then (getHorn => {
//creature is naming each individual object//
      getHorn.forEach((creature) => {
        new Horn(creature).render();
      });
    });
});

Horn.prototype.render = function() {

  //html is a native function//

  const template = $('#photo-template').html();
  const newSection = $('<section></section>');
  newSection.html(template);
  //find is a native function to target an html element//
  newSection.find('h2').text(this.title);
  newSection.find('img').attr('src', this.image_url);
  newSection.find('p').text(this.descirption);

  $('main').append(newSection);
};

function Horn (horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  imageArr.push(this);
}
  
