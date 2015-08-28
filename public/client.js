$(function(){
  $.get('/blocks', appendToList);
  function appendtoList(blocks) {
    var list = [];
    for (var i in blocks) {
      list.push($('<li>', { text: blocks[i] }));
    }
    $('.block-list').append(list);
  }
});
