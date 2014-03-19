var list = {
  controller: function() {
    this.list = [];
    for (var i = 0; i < appUrls.length; i++) {
      this.list.push(appUrls[i]);
    }
  },
  view: function(ctrl) {
    document.body.innerHTML = '';
    m.render(document.body, [
      m('div.content', [
        ctrl.list.map(function(post, index) {
          post.url = post.url.replace('/jekyll/update/', '/post/');
          return m('div.post', [
            m('span.date', post.date),
            m('a[href="' + post.url + '"]', {config: m.route}, post.title)
          ]);
        })
      ])
    ]);
  }
};
var post = {
  controller: function() {
    this.year = m.route.param('year');
    this.month = m.route.param('month');
    this.day = m.route.param('day');
    this.file = m.route.param('file');
    this.text = '';
    var ctrl = this;
    //jekyll/update/2014/03/17/welcome-to-jekyll.html
    m.request({
      method: 'GET',
      url: '/jekyll/update/' + this.year + '/' + this.month + '/' + this.day + '/' + this.file,
      deserialize: function(v) {
        return v;
      }
    })
    .then(function(data) {
      ctrl.text = data;
    });
  },
  view: function(ctrl) {
    document.body.innerHTML = '';
    m.render(document.body, [
      m('div.content', [
        m('div.post', m.trust(ctrl.text))
      ])
    ]);
  }
};
m.route.mode = 'hash';
m.route(document.body, "/home", {
  "/home": list,
  '/post/:year/:month/:day/:file': post
});
//
//var app = {};
//
//app.Post = function(data) {
//  this.title = m.prop(data.title);
//  this.body = m.prop(data.body);
//  this.date = m.prop(data.date);
//};
//
//app.PostList = Array;
//
//app.controller = function() {
//  this.list = new app.PostList();
//
//  console.log(this.list);
//};
//
//var ctrl = new app.controller();
//
//app.view = function(ctrl) {
//  return m('html', [
//    m('body', [
//      m('div.test', 'hello')
//    ])
//  ]);
//};
//
//m.module(document, app);
