const spinner = {
    show : function () {
        $(".spinner").show();
        return;
    },
    hide : function () {
        $(".spinner").hide();
        return;
    }
};
function toastrForm(data) {
    if (data.status == 0) {
        toastr.error(data.message, data.title);
    } else {
        toastr.success(data.message, data.title);
    }
}
function trashImage(myValue, elmJsonImages, filename) {
    if (elmJsonImages) {
        let arr = JSON.parse($("#" + elmJsonImages).val());
        let index = arr.indexOf(filename);
        arr.splice(index, 1);
        $("#" + elmJsonImages).val(JSON.stringify(arr));
    }
    myValue.closest(".media").remove();
}

function submitForm(element, elmFiles, route, callback) {
    route = route || "";
    callback = callback || function () {}
    elmFiles = elmFiles || "";
    let form = document.getElementById(element);
    let url = '';
    if (form) {
        url = form.action;
        if (!url) {
            url = window.location.pathname;
        }
        let ajaxSetting = {
            type: 'POST',
            url: url,
            cache: false,
            beforeSend: function () {
                spinner.show();
            },
            success: function (data) {
                toastrForm(data);
                callback(data);
                spinner.hide();
                if (data.status == 1) {
                    if (route != "") {
                        location.href = route;
                    }
                } else {
                    let isTab = $(".arr0").length > 0 ? true : false;
                    let errors = [];
                    if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
                        errors = data.errors;
                    }
                    if (errors && errors.length) {
                        for (let i = 0; i < errors.length; i++) {
                            let path = errors[i]['path'];
                            let message = errors[i]['message'];
                            if(isTab) {
                                let myTabId = $("#"+path).closest(".tab-pane").attr("id");
                                $("."+myTabId+" > button").click();
                            }
                            $("#"+path).closest("div").addClass("has-validation").append(` <div id="validation${path}" class="invalid-feedback">${message}.</div>`);
                            $("#"+path).addClass("is-invalid");
                            setTimeout(function () {
                                $("#"+path).closest("div").removeClass("has-validation");
                                $("#validation"+path).remove();
                                $("#"+path).removeClass("is-invalid");
                            },5000)
                        }
                    }
                }
            },
            error: function (x, e) {
                if (x.status == 0) {
                    toastr.error("You are offline!!\n Please Check Your Network.", "Error!");
                } else if (x.status == 404) {
                    toastr.error("Requested URL not found.", "Error " + x.status);
                } else if (x.status == 500) {
                    let res = x.responseText;
                    let path = 'documents';
                    $('.div' + path).addClass('has-error');
                    $('.div' + path).append('<div class="help-block">' + $(res).first().text() + '</div>');
                    toastr.error("" + $(res).first().text(), "Error Image");
                    setTimeout(function () {
                        location.href = '';
                    }, 2000);
                } else if (e == "parsererror") {
                    toastr.error("Error.\nParsing JSON Request failed.", "Error!");
                } else if (e == "timeout") {
                    toastr.error("Request Time out.", "Error!");
                } else {
                    toastr.error("Unknow Error.\n" + x.responseText, "Error!");
                }
            }
        };
        form.onsubmit = function (ev, data) {
            ev.preventDefault();
            $(".help-block").remove();
            $(".has-error").removeClass("");
            //for checkbox value 1 or 0
            let this_master = $(form);
            let mytiny = this_master.find('.tinymce');
            if(mytiny.length) {
                tinyMCE.triggerSave();
            }
            this_master.find('input[type="checkbox"]').each(function () {
                let checkbox_this = $(this);
                if (checkbox_this.is(":checked") == true) {
                    checkbox_this.attr('value', '1');
                } else {
                    checkbox_this.prop('checked', true);
                    checkbox_this.attr('value', '0');
                    setTimeout(function () {
                        checkbox_this.prop('checked', false);
                    }, 2000);
                }
            });
            if (elmFiles) {
                if (elmFiles instanceof Array) {
                    for (var i = 0; i < elmFiles.length; i++) {
                        $("#" + elmFiles[i]).remove();
                    }
                } else {
                    $("#" + elmFiles).remove();
                }
            }
            let formData = new FormData($('#' + element)[0]);
            ajaxSetting.processData = false;
            ajaxSetting.contentType = false;
            ajaxSetting.data = formData;
            $.ajax(ajaxSetting);
        }
    }
}

function onSubmitForm(element, callback) {
    callback = callback || toastrForm();
    let form = document.getElementById(element);
    let url = form.attr("action");
    if (!url) {
        url = window.location.pathname;
    }
    if(form) {
        let ajaxSetting = {
            method: 'POST',
            url: url,
            cache: false,
            beforeSend: function () {
                spinner.show();
            },
            success: function (data) {
                spinner.hide();
                toastrForm(data);
                callback(data);
                if(data.status !=1) {
                    let isTab = $(".arr0").length > 0 ? true : false;
                    let errors = [];
                    if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
                        errors = data.errors;
                    }
                    if (errors && errors.length) {
                        for (let i = 0; i < errors.length; i++) {
                            let path = errors[i]['path'];
                            let message = errors[i]['message'];
                            if(isTab) {
                                let myTabId = $("#"+path).closest(".tab-pane").attr("id");
                                $("."+myTabId+" > button").click();
                            }
                            $("#"+path).closest("div").addClass("has-validation").append(` <div id="validation${path}" class="invalid-feedback">${message}.</div>`);
                            $("#"+path).addClass("is-invalid");
                            setTimeout(function () {
                                $("#"+path).closest("div").removeClass("has-validation");
                                $("#validation"+path).remove();
                                $("#"+path).removeClass("is-invalid");
                            },5000)
                        }
                    }
                }
            },
            error: function (x, e) {
                if (x.status == 0) {
                    toastr.error("You are offline!!\n Please Check Your Network.", "Error!");
                } else if (x.status == 404) {
                    toastr.error("Requested URL not found.", "Error " + x.status);
                } else if (x.status == 500) {
                    let res = x.responseText;
                    let path = 'documents';
                    $('.div' + path).addClass('has-error');
                    $('.div' + path).append('<div class="help-block">' + $(res).first().text() + '</div>');
                    toastr.error("" + $(res).first().text(), "Error Image");
                    setTimeout(function () {
                        location.href = '';
                    }, 2000);
                } else if (e == "parsererror") {
                    toastr.error("Error.\nParsing JSON Request failed.", "Error!");
                } else if (e == "timeout") {
                    toastr.error("Request Time out.", "Error!");
                } else {
                    toastr.error("Unknow Error.\n" + x.responseText, "Error!");
                }
            }
        };
        form.onsubmit = function (ev, data) {
            ev.preventDefault();
            $(".help-block").remove();
            $(".has-error").removeClass("");
            //for checkbox value 1 or 0
            let this_master = $(form);
            this_master.find('input[type="checkbox"]').each(function () {
                let checkbox_this = $(this);
                if (checkbox_this.is(":checked") == true) {
                    checkbox_this.attr('value', '1');
                } else {
                    checkbox_this.prop('checked', true);
                    checkbox_this.attr('value', '0');
                    setTimeout(function () {
                        checkbox_this.prop('checked', false);
                    }, 2000);
                }
            });
            let formData = new FormData($('#' + element)[0]);
            ajaxSetting.processData = false;
            ajaxSetting.contentType = false;
            ajaxSetting.data = formData;
            $.ajax(ajaxSetting);
        }
    }
}

$(".typeahead-remove").on("click", function () {
    $(".jstypeahead").val("");
    let elm = $(this).data("element");
    $("#" + elm).val("");
    $(".kilo").removeClass("alert").removeClass("alert-block").removeClass("alert-success");
    $(".kilo").html("");
    $(".klform").removeClass("has-success").removeClass("has-feedback");
    $("#total").val("")
});

function loadFile(input, elem="") {
    let url = input.value;
    var filename = url.replace(/^.*[\\\/]/, '');
    let $this = $(input);
    let width = $(this).data('width') || '300';
    let parentTag = $this.parent().get( 0 ).tagName;
    //console.log(parentTag)
    let ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "bmp" || ext == "svg" || ext == "webp")) {
        let reader = new FileReader();
        reader.onload = function (e) {
            if(parentTag == "TD") {
                $this.closest("td").find("img.mb-3").attr("src",e.target.result).attr("width",`${width}px`).addClass("boxy");
            } else {
                $this.closest("div").find("img.mb-3").attr("src",e.target.result).attr("width",`${width}px`).addClass("boxy");
                $this.closest("div").find("a.text-success").html(` ${filename}`);
            }
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        let file = 'file.png';
        if(ext == "docx" || ext == "doc") {
            file = 'word.png'
        } else if(ext == 'xls' || ext == 'xlsx') {
            file = 'excel.png'
        } else if(ext == 'pdf') {
            file = 'pdf.png'
        } else if(ext == 'ppt' || ext == 'pptx'){
            file = 'ppt.png';
        } else if(ext == 'txt') {
            file = 'txt.png';
        } else if(ext == 'zip') {
            file = 'zip.jpg';
        } else if(ext == 'rar') {
            file = 'rar.jpg';
        } else if(ext == 'rar') {
            file = 'file.png';
        }
        if(parentTag == "TD") {
            $this.closest("td").find("img.mb-3").attr("src",`/img/${file}`).attr("height","45px").attr("width","45px").addClass("boxy-small");
        } else {
            $this.closest("div").find("img.mb-3").attr("src",`/img/${file}`).attr("height","45px").attr("width","45px").addClass("boxy-small");
            $this.closest("div").find("a.text-success").html(` ${filename}`);
        }
    }
}
function fileAttribute(filename) {
    "use strict";
    filename = filename.toLowerCase() || "";
    let ext = filename.split('.').pop();
    let images = ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'tif', 'gif', 'png','svg','jpeg'];
    let obj = {};
    obj.ext = ext;
    if (images.includes(ext)) {
        obj.type = 'image';
    } else {
        obj.type = 'file';
    }
    return obj;
}

function removeimage(el) {
    let $this = $(el);
    $this.parents().eq(1).find('input[type="file"]').attr("value","").attr("type","text");
    $this.parents().closest(".isfile").remove();
}

function viewFile(dir, file) {
    "use strict";
    let filename = dir + file;
    let html = '';
    var obj = Util.fileAttribute(filename);
    if (obj.type == 'image') {
        html = '<img src="' + filename + '" width="300px">'
    } else {
        html = '<a href="' + filename + '">' + file + '</a>'
    }
    return html;
}

function gridItems(json) {
    return json.map(function (row) {
        let obj = {};
        obj.id = row.id ? '"' + row.id + '"' : '';
        obj.name = row.name;
        return obj;
    })
}

function gridValues(value, json) {
    let html = "";
    value = value || "[]";
    value = JSON.parse(value) || [];
    if (value.length) {
        for (var i = 0; i < value.length; i++) {
            html += " " + json[value[i]] + ",";
        }
        html = html.slice(0, -1);
    }
    return html;
}

function ajaxCall(method,url,data,callback) {
    callback = callback || function () {}
    let config = {
        type: method,
        url: url,
        cache: false,
        headers: {
            'CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        beforeSend: function () {
            spinner.show();
        }
    };
    if(data){
        config.data = data;
    }
    config.success = function (data) {
        spinner.hide();
        callback(data);
    };
    $.ajax(config);
}

function ajaxPost(url,data,callback) {
    ajaxCall("POST",url,data,callback);
}
function ajaxGet(url,data,callback) {
    ajaxCall("GET",url,data,callback);
}
function ajaxPut(url,data,callback) {
    ajaxCall("PUT",url,data,callback);
}
function ajaxDelete(url,data,callback) {
    ajaxCall("DELETE",url,data,callback);
}
function formatNumber(num) {
    num = num || "";
    let thousandSeparator = ".";
    var sep = "$1" + thousandSeparator;
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, sep)
}
function formatString(val) {
    val = JSON.parse(val) || [];
    return val.join(", ");
}
function fallbackCopyTextToClipboard(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
}
function copyToClipboard(text) {
    if(text) {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
        } else {
            navigator.clipboard.writeText(text);
        }

        toastr.info("Copied Text " + text);
    }
}

$("body").on("click", ".can-copy", function () {
    let name = $(this).data("name");
    copyToClipboard(name);
});

function chains(element,route,target,column,name,currentValue=0) {
    ajaxPost(`/${route}/chains`, {
        column: column,
        table: route,
        id: $("#"+element).val(),
        name:name,
        target:target,
        currentValue:currentValue
    }, function (data) {
        $("#"+target).html(data[target]);
    });
}
//input range
function titlerange(thatsit) {
    $(thatsit).attr("title", $(thatsit).val() || "0")
}
