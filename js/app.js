if ($(".VIRTUAL_JAVASCRIPT").length) {
    $("body").append("<script>" + $(".VIRTUAL_JAVASCRIPT").text() + "</script>");
}
if ($(".VIRTUAL_CSS").length) {
    $("head").append("<style type='text/css'>" + $(".VIRTUAL_CSS").text() + "</style>");
}
toastr.options.toastClass = 'toastr';
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

