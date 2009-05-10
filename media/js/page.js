/*
 * page.js
 * Collection of functions for LaurenBrincat.com
 *
 */


function get_page_list(name, pageid, page) {
    //var url = '/work/' + name + '/list';
    var url = '/work/page_list';
    $('div#pagination').text('');
    $.getJSON(url, {name: name}, function (data) {
        var name = data.name;
        var rows = data.rows;
        var rowsLen = rows.length;
        for (var cnt=0; cnt<rowsLen; ++cnt) {
            var span = $('<span></span>');
            if (rows[cnt].name == name) {
                span.addClass('selected');
            } else {
                span.removeClass('selected');
            }
            link = $('<a href="javascript:get_page_detail(\'' + name + '\', \'' + rows[cnt].id + '\', \'' + (cnt+1) + '\');"></a>');
            link.text(cnt+1);
            span.html(link);
            $('div#pagination').append(span);
            $('div#pagination').append(' ');
        }
        if (! pageid) {
            get_page_detail(name, rows[0].id, 1);
        }
    });
}

function get_page_detail(name, pageid, page) {
    $('div#loader').show();
    $('div#content_div').fadeTo('slow', 0.01, function () {
        url = '/work/page_detail';
        $.getJSON(url, {name: name, id: pageid},  function (data) {
            if (data.is_video === true) {
                var content = '<object type="application/x-shockwave-flash" data="/media/player_flv.swf" width="600" height="450">' +
                '<param name="movie" value="player_flv.swf" />' +
                '<param name="allowFullScreen" value="true" />' +
                '<param name="FlashVars" value="flv=/' + data.flv + '&amp;title=KydoiNoGilaga&amp;width=600&amp;height=450&amp;autoplay=1&amp;margin=0&amp;bgcolor=f7f7f3&amp;playercolor=dbdbdb&amp;loadingcolor=838383&amp;buttoncolor=000000&amp;buttonovercolor=ffffff&amp;slidercolor1=838383&amp;slidercolor2=cccccc&amp;sliderovercolor=000000&amp;showstop=1&amp;showvolume=1" />' +
                '</object>';
            } else {
                var content = $('<img />');
                content.attr('src', '/' + data.upload);
                content.attr('alt', data.title);
            }
            $('div#upload_details').text(data.title);
            $('div#content_div').html(content)
            if (data.is_video === true) {
                $('div#content_div').fadeTo('slow', 1.0);
                $('div#loader').hide();
            } else {
                content.load(function () {
                    $('div#content_div').fadeTo('slow', 1.0);
                    $('div#loader').hide();
                });
            }
        });
    });
}

function get_page(name, pageid, page) {
        get_page_list(name, pageid, page);
        get_page_detail(name, pageid, page);
}

function get_work_list(name) {
    $.get('/work/list', function (data) {
        //alert(data);
        $('div#lyr1').html(data);
        return;
        $(data).find('span').each(function (i0, d0) {
            var content = '';
            if ($(d0).find('a')[0].innerHTML == name) {
                d0 = $(d0).addClass('selected');
            } else {
                d0 = $(d0).removeClass('selected');
            }
            content += d0;
            //content.append(d0);
            //content.append('<br />');
            $('div#work_list').append(content);
        });
    });
}

function get_work(name) {
    get_work_list(name);
    get_page(name);
}

function get_award() {
    url = '/biography/award';
    $.getJSON(url, function (data) {
        var container = $('div#content_div_bio');
        var content = $('<div id="award"></div>');
        content.append('<h3>Award</h3>');
        var details = data.details;
        var y = data.years;
        var yLen = y.length
        for (var cnt=0; cnt<yLen; ++cnt) {
            content.append('<h4>' + y[cnt] + '</h4>');
            var ul = $('<ul></ul>');
            var d = details[y[cnt]];
            var dLen = d.length
            for (var dcnt=0; dcnt<dLen; ++dcnt) {
                ul.append('<li>' + d[dcnt].award + ' at ' + d[dcnt].location + '</li>');
            }
            content.append(ul);
        }
        container.append(content);
    });
}

function get_education() {
    url = '/biography/education';
    $.getJSON(url, function (data) {
        var container = $('div#content_div_bio');
        var content = $('<div id="education"></div>');
        content.append('<h3>Education</h3>');
        var details = data.details;
        var y = data.years;
        var yLen = y.length
        for (var cnt=0; cnt<yLen; ++cnt) {
            content.append('<h4>' + y[cnt] + '</h4>');
            var ul = $('<ul></ul>');
            var d = details[y[cnt]];
            var dLen = d.length
            for (var dcnt=0; dcnt<dLen; ++dcnt) {
                ul.append('<li>' + d[dcnt].course + ' at ' + d[dcnt].location + '</li>');
            }
            content.append(ul);
        }
        container.append(content);
    });
}

function get_exhibition() {
    url = '/biography/exhibition';
    $.getJSON(url, function (data) {
        var container = $('div#content_div_bio');
        var content = $('<div id="exhibition"></div>');
        var table = $('<table border="0" cellpadding="4" cellspacing="0"></table>');
        var tr = $('<tr></tr>');
        var td = $('<td></td>');
        tr.append(td);
        var scrollbar = '<div id="scrollbar2"><!-- border attribute added to reduce support questions on the subject. \n' +
              'If you like valid strict markup, remove and place a img {border:none;} spec in style sheet -->\n' +
            '<div id="up"><a class="mouseover_up" href=""><img src="css/images/up.png" width="11" height="5" alt="" border="0" /></a></div>\n' +
            '<div id="track2">\n' +
            '<div id="dragBar2"></div>\n' +
            '</div>\n' +
            '<div id="down"><a class="mouseover_down" href=""><img src="css/images/down.png" width="11" height="5" alt="" border="0"/></a></div>\n' +
            '</div>\n';
        td.append(scrollbar);
        var td = $('<td></td>');
        tr.append(td);
        var wn2 = $('<div id="wn2"></div>');
        var lyr12 = $('<div id="lyr12"></div>');
        td.append(wn2)
        wn2.append(lyr12)
        content.addClass('bio-left');
        content.append('<h1>Exhibition</h1>');
        var details = data.details;
        var y = data.years;
        var yLen = y.length
        for (var cnt=0; cnt<yLen; ++cnt) {
            var p = $('<p class="exhibition-details"></p>');
            var d = details[y[cnt]];
            var dLen = d.length
            lyr12.append('<h2>' + y[cnt] + '</h2>');
            for (var dcnt=0; dcnt<dLen; ++dcnt) {
                p.append(d[dcnt]);
                p.append('<br />');
            }
            lyr12.append(p);
        }
        table.append(tr);
        content.append(table);
        container.append(content);
    });
}

function get_biography_award(data, container) {
    var content = $('<div id="award"></div>');
    var table = $('<table class="bio-right"></table>');
    content.append('<h1>Award</h1>');
    content.append(table);
    var details = data.details;
    var y = data.years;
    var yLen = y.length
    for (var cnt=0; cnt<yLen; ++cnt) {
        var tr = $('<tr></tr>');
        var td_l = $('<td class="cell-left"></td>');
        var td_r = $('<td class="cell-right"></td>');
        var d = details[y[cnt]];
        var dLen = d.length
        for (var dcnt=0; dcnt<dLen; ++dcnt) {
            tr.append(td_l);
            tr.append(td_r);
            td_l.append(d[dcnt].award);
            td_l.append('<br />');
            td_l.append(d[dcnt].location);
            td_r.append(y[cnt]);
        }
        table.append(tr);
    }
    container.append(content);
}

function get_biography_education(data, container) {
    var content = $('<div id="education"></div>');
    var table = $('<table class="bio-right"></table>');
    content.append('<h1>Education</h1>');
    content.append(table);
    var details = data.details;
    var y = data.years;
    var yLen = y.length
    for (var cnt=0; cnt<yLen; ++cnt) {
        var tr = $('<tr></tr>');
        var td_l = $('<td class="cell-left"></td>');
        var td_r = $('<td class="cell-right"></td>');
        var d = details[y[cnt]];
        var dLen = d.length
        for (var dcnt=0; dcnt<dLen; ++dcnt) {
            tr.append(td_l);
            tr.append(td_r);
            td_l.append(d[dcnt].course);
            td_l.append('<br />');
            td_l.append(d[dcnt].location);
            td_r.append(y[cnt]);
        }
        table.append(tr);
    }
    container.append(content);
}

function get_biography_exhibition (data, container) {
    //alert('get_biography_exhibition');
    //var container = $('div#content_div_bio');
    var content = $('<div id="exhibition"></div>');
    var table = $('<table border="0" cellpadding="4" cellspacing="0"></table>');
    var tr = $('<tr></tr>');
    var td = $('<td></td>');
    tr.append(td);
    var scrollbar = '<div id="scrollbar2"><!-- border attribute added to reduce support questions on the subject. \n' +
          'If you like valid strict markup, remove and place a img {border:none;} spec in style sheet -->\n' +
        '<div id="up"><a class="mouseover_up" href=""><img src="css/images/up.png" width="11" height="5" alt="" border="0" /></a></div>\n' +
        '<div id="track2">\n' +
        '<div id="dragBar2"></div>\n' +
        '</div>\n' +
        '<div id="down"><a class="mouseover_down" href=""><img src="css/images/down.png" width="11" height="5" alt="" border="0"/></a></div>\n' +
        '</div>\n';
    td.append(scrollbar);
    var td = $('<td></td>');
    tr.append(td);
    var wn2 = $('<div id="wn2"></div>');
    var lyr12 = $('<div id="lyr12"></div>');
    td.append(wn2)
    wn2.append(lyr12)
    content.append('<h1>Exhibitions</h1>');
    var details = data.details;
    var y = data.years;
    var yLen = y.length
    for (var cnt=0; cnt<yLen; ++cnt) {
        var p = $('<p class="exhibition-details"></p>');
        var d = details[y[cnt]];
        var dLen = d.length
        lyr12.append('<h2>' + y[cnt] + '</h2>');
        for (var dcnt=0; dcnt<dLen; ++dcnt) {
            p.append(d[dcnt]);
            p.append('<br />');
        }
        lyr12.append(p);
    }
    table.append(tr);
    content.append(table);
    container.append(content);
}

function get_biography() {
    var container = $('div#content_div');
    var content = $('<div id="content_div_bio" class="cont-top-bio"></div>');
    var content_l = $('<div class="bio-left"></div>');
    var content_r = $('<div class="bio-right"></div>');
    //var table = $('<table border="0" cellpadding="4" cellspacing="0"></table>');
    $('div#loader').show();
    container.text('');
    url = '/biography/';
    $.getJSON(url, function (data) {
        content.append(content_l)
        content.append(content_r)
        container.html(content);
        get_biography_exhibition(data.exhibition, content_l);
        get_biography_education(data.education, content_r);
        get_biography_award(data.award, content_r);
        $('div#loader').hide();
    });
    //get_exhibition();
    //get_award();
    //get_education();
    //content.html(container.innerHTML);
    //container.text('');
    //container.html(content);
    //container.html(content);
    //$('div#loader').hide();
}

function get_upcoming() {
    $('div#loader').show();
    var container = $('div#content_div');
    url = '/upcoming/';
    $('div#content_div').fadeTo('slow', 0.01, function () {
    $.get(url, function (data) {
        container.html(data);
        $(data).load(function () {
            $('div#content_div').fadeTo('slow', 1.0);
            $('div#loader').hide();
        });
    });
    });
}

function get_contact() {
    alert('Contact page coming up');
}

