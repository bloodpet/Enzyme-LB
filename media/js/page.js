/*
 * page.js
 * Collection of functions for LaurenBrincat.com
 *
 */


function get_page_list(name, pageid, page) {
    url = '/work/' + name + '/list';
    $.get(url, function (data) {
        //alert(data);
        $('div#pagination').html(data);
        return;
        content = $('<div></div>');
        $(data).find('span').each(function (i0, d0) {
            if ($(d0).find('a')[0].innerHTML == page) {
                d0 = $(d0).addClass('selected');
            } else {
                d0 = $(d0).removeClass('selected');
            }
            content.append(d0);
            //content.append('<br />');
        });
        $('div#pagination').html(content);
    });
}

function get_page_detail(name, pageid, page) {
    url = '/work/' + name + '/';
    if (pageid) {
        url += pageid;
    } else {
        return
    }
    $.getJSON(url, function (data) {
        if (data.is_video === true) {
            var content = '<object type="application/x-shockwave-flash" data="/media/player_flv.swf" width="600" height="450">' +
            '<param name="movie" value="player_flv.swf" />' +
            '<param name="allowFullScreen" value="true" />' +
            '<param name="FlashVars" value="flv=/' + data.upload + '&amp;title=KydoiNoGilaga&amp;width=600&amp;height=450&amp;autoplay=1&amp;margin=0&amp;bgcolor=f7f7f3&amp;playercolor=dbdbdb&amp;loadingcolor=838383&amp;buttoncolor=000000&amp;buttonovercolor=ffffff&amp;slidercolor1=838383&amp;slidercolor2=cccccc&amp;sliderovercolor=000000&amp;showstop=1&amp;showvolume=1" />' +
            '</object>';
        } else {
            var content = $('<img />');
            content.attr('src', '/' + data.upload);
            content.attr('alt', data.title);
        }
        $('div#content_div').html(content);
        var content = $('<span></span>');
        content.text(data.title);
        $('div#upload_details').html(content);
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
        var container = $('div#content_div');
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
        var container = $('div#content_div');
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
        var container = $('div#content_div');
        var content = $('<div id="exhibition"></div>');
        content.append('<h3>Exhibition</h3>');
        var details = data.details;
        var y = data.years;
        var yLen = y.length
        for (var cnt=0; cnt<yLen; ++cnt) {
            content.append('<h4>' + y[cnt] + '</h4>');
            var ul = $('<ul></ul>');
            var d = details[y[cnt]];
            var dLen = d.length
            for (var dcnt=0; dcnt<dLen; ++dcnt) {
                ul.append('<li>' + d[dcnt] + '</li>');
            }
            content.append(ul);
        }
        container.append(content);
    });
}

function get_biography() {
    var container = $('div#content_div');
    container.text('');
    get_exhibition();
    get_award();
    get_education();
}

function get_upcoming() {
    var container = $('div#content_div');
    url = '/upcoming/';
    $.get(url, function (data) {
        container.html(data);
    });
}

function get_contact() {
    alert('Contact page coming up');
}

