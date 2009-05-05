/*
 * page.js
 * Collection of functions for LaurenBrincat.com
 *
 */


function get_page_list(name, pageid, page) {
    url = '/work/' + name + '/list';
    $.get(url, function (data) {
        content = $('<ul></ul>');
        $(data).find('li').each(function (i0, d0) {
            if ($(d0).find('a')[0].innerHTML == page) {
                d0 = $(d0).addClass('selected');
            } else {
                d0 = $(d0).removeClass('selected');
            }
            content.append(d0);
        });
        $('div#pagination').html(content);
    });
}

function get_page_detail(name, pageid, page) {
    url = '/work/' + name + '/';
    if (pageid) {
        url += pageid;
    }
    $.getJSON(url, function (data) {
        if (data.is_video) {
            var content = '<object type="application/x-shockwave-flash" data="/media/player_flv.swf" width="320" height="240">' +
            '<param name="movie" value="player_flv.swf" />' +
            '<param name="allowFullScreen" value="true" />' +
            '<param name="FlashVars" value="flv=/' + data.upload + '" />' +
            '</object>';
        } else {
            var content = $('<img />');
            content.attr('src', '/' + data.upload);
            content.attr('alt', data.title);
        }
        $('div#content_div').html(content);
        var content = $('<span></span>');
        content.text(data.title);
        $('div#copyright').html(content);
    });
}

function get_page(name, pageid, page) {
    get_page_list(name, pageid, page);
    get_page_detail(name, pageid, page);
}

function get_work_list(name) {
    $.get('/work/list', function (data) {
        content = $('<ul></ul>');
        $(data).find('li').each(function (i0, d0) {
            if ($(d0).find('a')[0].innerHTML == name) {
                d0 = $(d0).addClass('selected');
            } else {
                d0 = $(d0).removeClass('selected');
            }
            content.append(d0);
        });
        $('div#work_list').html(content);
    });
}

function get_work(name) {
    get_work_list(name);
    get_page(name);
}


