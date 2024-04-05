if ($(".VIRTUAL_JAVASCRIPT").length) {
    $("body").append("<script>" + $(".VIRTUAL_JAVASCRIPT").text() + "</script>");
}
if ($(".VIRTUAL_CSS").length) {
    $("head").append("<style type='text/css'>" + $(".VIRTUAL_CSS").text() + "</style>");
}
function addScript(src) {
    let s = document.createElement('script');
    s.setAttribute('src', src);
    document.body.appendChild(s);
}
function addStyle(src) {
    let s = document.createElement('style');
    s.setAttribute('src', src);
    document.head.appendChild(s);
}
$("#SWITCH_COMPANY").on("change", function () {
    location.href = `/session/${$(this).val()}`;
});
function ace_value(value) {
    if(value.includes("$___{")) {
        value = value.replaceAll('$___{', '${');
    }
    if(value.includes("<//script>")) {
        value = value.replaceAll('<//script>','</script>');
    }
    return value;
}

const toastr = {};
toastr.build =(type,message,title)=> {
    let svg = 'check';
    switch (type) {
        case 'success' :
            svg = 'check';
            break;
        case 'danger' :
            svg = 'alert-small';
            break;
        case 'warning' :
            svg = 'bleach';
            break;
        case 'info' :
            svg = 'info-small';
            break;
    }
    let containers = $(".toast-container");
    let top = 0;
    containers.each(function () {
        top += $(this).height();
        top += 20;
    });
    let style = '';
    let div = $('<div />', {'class':'toast-container position-fixed top-0 end-0 p-3'});
    if(top){
        div.removeClass('top-0');
        div.css('top', top + 'px');
    }
    let html = `
        <div class="toast toast-${type} boxy fade show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header toast-${type}">
                <span class="icon-small icons-${type}"><img data-id="45" class="icons-bg-white icon-image" src="/assets/icons/${svg}.svg"></span>
                <strong class="ps-1 title-toast"> ${title}</strong>
            </div>
            <div class="toast-body">${message}</div>
        </div>
    `;
    div.append(html);
    $('body').append(div);
    setTimeout(function () {
        div.remove();
    },3500);
};
toastr.success=(message='Message',title='Success',) => {
    toastr.build('success',message,title)
};
toastr.danger=(message='Message',title='Ooops') => {
    toastr.build('danger',message,title)
};
toastr.warning=(message='Message',title='Warning') => {
    toastr.build('warning',message,title)
};
toastr.info=(message='Message',title='Info') => {
    toastr.build('info',message,title)
};
toastr.error=(message='Message',title='Ooops') => {
    toastr.build('danger',message,title)
};
window.toastr = toastr;

