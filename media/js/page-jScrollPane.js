/*
 * page.js
 * Collection of functions for LaurenBrincat.com
 *
 */

var main_link = Array();
var work_list = Array();
var work_list_link = Array();

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
            link = $('<a id="page_link_' + (cnt+1) + '" href="javascript:get_page(\'' + name + '\', \'' + rows[cnt].id + '\', \'' + (cnt+1) + '\');"></a>');
            link.text(cnt+1);
            if ( page == cnt+1 ) {
                link.css({fontWeight: 'bolder'});
            } else if ( !page ) {
                if ( cnt == 0 ) {
                    link.css({fontWeight: 'bolder'});
                }
            } else {
                link.css({fontWeight: 'bolder'});
            }
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
    url = '/work/list';
    $.getJSON(url, {name: name}, function (data) {
        works = data;
        worksLen = works.length;
        //var chosen = data.chosen;
        container = $('div#wn');
        content = $('div#lyr1');
        container.addClass('left');
        container.addClass('holder');
        content.addClass('scroll-pane');
        content.text('');
        //container.html(content);
        for (cnt=0; cnt<worksLen; cnt++) {
            work = works[cnt];
            span = $('<span></span>');
            a = $('<a style="line-height:1.6em;padding-left:8px" href="javascript: get_work(\'' + work.fields.name.replace(/'/g, "\\'") + '\')"></a>');
            if (name == work.fields.name) {
                span.css({fontWeight: 'bold', color: '#000'});
            } else {
                span.css({fontWeight: 'normal'});
            }
            a.text(work.fields.name)
            span.html(a);
            span.append('<br />');
            content.append(span);
        }
        content.jScrollPane({
            arrowSize: 5,
            scrollbarOnLeft: true,
            scrollbarWidth: 9,
            showArrows: true
        });
    });
    return
    $.get('/work/list', function (data) {
        //alert(data);
        container = $('div#wn');
        content = $('div#lyr1');
        container.html(content);
        content.html(data);
        container.addClass('left');
        container.addClass('holder');
        content.addClass('scroll-pane');
        content.jScrollPane({
            arrowSize: 5,
            scrollbarOnLeft: true,
            scrollbarWidth: 9,
            showArrows: true
        });
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
    $('.sub-menu a').css({color: '#999'});
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
        var d = details[y[cnt]];
        var dLen = d.length
        for (var dcnt=0; dcnt<dLen; ++dcnt) {
            var tr = $('<tr></tr>');
            var td_l = $('<td class="cell-left"></td>');
            var td_r = $('<td class="cell-right"></td>');
            tr.append(td_l);
            tr.append(td_r);
            td_l.append(d[dcnt].award);
            td_l.append('<br />');
            td_l.append(d[dcnt].location);
            td_r.append(y[cnt]);
            table.append(tr);
        }
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
    /*
    //wn2.addClass('left');
    wn2.addClass('holder');
    lyr12.addClass('scroll-pane');
    lyr12.jScrollPane({
        arrowSize: 5,
        scrollbarOnLeft: false,
        scrollbarWidth: 9,
        showArrows: true
    });
    */
}

function get_biography_info (data, container) {
    // Get information about the biography.
    var content = $('<div id="info"></div>');
    container.append(content);
    //content.text('hello');
    content.html('<p>' + data.info + '</p>');
    content.css({textAlign: 'left', marginLeft: 10});
}

function get_biography() {
    $('#lyr1 a').css({fontWeight: 'normal', color: '#333'});
    $('a').css({color: '#333'});
    $('#pagination').text('');
    $('#upload_details').text('');
    $('.sub-menu a').css({color: '#999'});
    $('.sub-menu a#main_bio').css({color: '#000'});
    var container = $('div#content_div');
    var content = $('<div id="content_div_bio" class="cont-top-bio"></div>');
    var content_l = $('<div class="bio-left"></div>');
    var content_r = $('<div class="bio-right"></div>');
    //var table = $('<table border="0" cellpadding="4" cellspacing="0"></table>');
    $('div#loader').show();
    container.text('');
    url = '/biography/';
    $.getJSON(url, function (data) {
        content.append(content_l);
        content.append(content_r);
        container.html(content);
        get_biography_exhibition(data.exhibition, content_r);
        get_biography_info(data.info, content_l);
        get_biography_education(data.education, content_l);
        get_biography_award(data.award, content_l);
        container.addClass('left');
        container.addClass('holder');
        content.addClass('scroll-pane');
        content.jScrollPane({
            arrowSize: 5,
            scrollbarOnLeft: true,
            scrollbarWidth: 9,
            showArrows: true
        });
        $('div#loader').hide();
    });
}

function get_upcoming() {
    $('#lyr1 a').css({fontWeight: 'normal', color: '#333'});
    $('a').css({color: '#333'});
    $('#pagination').text('');
    $('.sub-menu a').css({color: '#999'});
    $('a#main_upcoming').css({color: '#000'});
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
    $('#lyr1 a').css({fontWeight: 'normal', color: '#333'});
    $('a').css({color: '#333'});
    $('#pagination').text('');
    $('.sub-menu a').css({color: '#999'});
    $('a#main_contact').css({color: '#000'});
    //$('div#loader').show();
    container = $('div#content_div');
    img = $('<img src="/media/css/images/contact-bg.jpg" />');
    url = '/contact/';
    container.fadeTo('slow', 0.01, function () {
    $.getJSON(url, function (data) {
        contact_div = $('<div class="cont-top-contact"></div>');
        contact_details = $('<div class="contact-details"></div>');
        contact_div.html(contact_details);
        if (data.location) {
            contact_details.append('<h3>Location</h3>');
            contact_details.append('<p>' + data.location + '</p>');
        }
        if (data.email) {
            contact_details.append('<h3>Email</h3>');
            contact_details.append('<p><a href="mailto:' + data.email + '" class="email">' + data.email + '</a></p>');
        }
        if (data.phone) {
            contact_details.append('<h3>phone</h3>');
            contact_details.append('<p>' + data.phone + '</p>');
        }
        /*
        contact_div = $('<div class="cont-top-contact">\n' +
            ' <div class="contact-details">\n' +
            '   <h3>Location</h3>\n' +
            '   <p>Sydney, Australia</p>\n' +
            '   <h3>Email</h3>\n' +
            '   <p><a href="mailto:info@laurenbrincat.com" class="email">info@laurenbrincat.com</a></p>\n' +
            '   <h3>Phone</h3>\n' +
            '   <p>+61 415 647 724</p>\n' +
            ' </div>\n' +
            '</div>\n');
        */
        //container.html(img);
        //container.load(function () {
        //contact_div.load(function () {
        container.html(contact_div);
        container.fadeTo('slow', 1.0);
        $('div#loader').hide();
        //});
    });
    });
}

function start() {
    get_work('Blaze of Glory');
}

