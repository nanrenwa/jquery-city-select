(function (global, citySelect) {
    'use strict';
    var errorMSG = 'jQuery.City.Select Need jQuery.';
    if (typeof define === 'function' && (define.amd || window.seajs)) {
        define('jquery.city.select', [], function (require) {
            var jQ = require('jquery');
            if (!jQ) {
                throw errorMSG;
            }
            return citySelect(jQ);
        });
    } else {
        if (!global.jQuery) {
            throw errorMSG;
        }
        return citySelect(jQuery);
    }
}(typeof window !== 'undefined' ? window : this, function ($) {
    'use strict';
    $.fn.extend({
        'citylist': function (params) {
            params = $.extend({
                id: 'id',
                name: 'name',
                children: 'children',
                metaTag: 'data-extra',
                idVal: false,
                data: false,
                selected: false
            }, params);
            var target = $(this);
            var hasSelected = ' selected="selected"';
            switch (target.length) {
            case 1:
                singleBox(target, params);
                break;
            case 2:
                multipleBox(target, params);
                break;
            default:
                return this;
            }
            function singleBox(target, params) {
                var all = target;
                var data = params.data;
                var html = [];
                for (var oo in data) {
                    html.push('<option ' + params.metaTag + '="' + data[oo][params.id] + '"' + (params.selected && params.selected == data[oo][params.id] ? hasSelected : '') + '>' + data[oo][params.name] + '</option>');
                    for (var xx in data[oo][params.children]) {
                        if (params.idVal) {
                            html.push('<option ' + params.metaTag + '="' + data[oo][params.children][xx][params.id] + '" value="' + data[oo][params.children][xx][params.name] + '"' + (params.selected && params.selected == data[oo][params.children][xx][params.id] ? hasSelected : '') + '>' + data[oo][params.children][xx][params.name] + '</option>');
                        } else {
                            html.push('<option ' + params.metaTag + '="' + data[oo][params.children][xx][params.id] + '" value="' + data[oo][params.children][xx][params.id] + '"' + (params.selected && params.selected == data[oo][params.children][xx][params.id] ? hasSelected : '') + '>' + data[oo][params.children][xx][params.name] + '</option>');
                        }
                    }
                }
                html = html.join('');
                all.find('option').remove();
                all.append(html);
            }
            function multipleBox(target, params) {
                var province = target.eq(0);
                var city = target.eq(1);
                var html = [], oItem;
                for (var item in params.data) {
                    oItem = params.data[item];
                    if (params.idVal) {
                        html.push('<option ' + params.metaTag + '="' + oItem[params.id] + '" value="' + oItem[params.id] + '"' + (params.selected && params.selected[0] == oItem[params.id] ? hasSelected : '') + '>' + oItem[params.name] + '</option>');
                    } else {
                        html.push('<option ' + params.metaTag + '="' + oItem[params.id] + '" value="' + oItem[params.name] + '"' + (params.selected && params.selected[0] == oItem[params.id] ? hasSelected : '') + '>' + oItem[params.name] + '</option>');
                    }
                }
                html = html.join('');
                province.find('option').remove();
                province.append(html);
                var provinces = province.find('option');
                province.on('change', function () {
                    var curSelect = $(this).val();
                    provinces.each(function (k, v) {
                        if ($(v).val() == curSelect) {
                            return function (v) {
                                var extra = $(v).attr(params.metaTag);
                                var html = [], oItem;
                                for (var item in params.data) {
                                    oItem = params.data[item];
                                    if (oItem[params.id] == extra && oItem[params.children]) {
                                        oItem = oItem[params.children];
                                        for (var sItem in oItem) {
                                            if (params.idVal) {
                                                html.push('<option ' + params.metaTag + '="' + oItem[sItem][params.id] + '" value="' + oItem[sItem][params.id] + '"' + (params.selected && params.selected[1] == oItem[sItem][params.id] ? hasSelected : '') + '>' + oItem[sItem][params.name] + '</option>');
                                            } else {
                                                html.push('<option ' + params.metaTag + '="' + oItem[sItem][params.id] + '" value="' + oItem[sItem][params.name] + '"' + (params.selected && params.selected[1] == oItem[sItem][params.id] ? hasSelected : '') + '>' + oItem[sItem][params.name] + '</option>');
                                            }
                                        }
                                        break;
                                    }
                                }
                                html = html.join('');
                                city.find('option').remove();
                                city.append(html);
                            }(v);
                        }
                    });
                }).trigger('change');
            }
            return this;
        }
    });
}));