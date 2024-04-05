window.onerror = function (message, file, line, col, error) {
    toastr.error(error.message, "Error occurred");
    setTimeout(function () {
        toastr.info("Please wait a moment while we are repairing your problem.", "Info");
        ajaxPost(`/${dataTableRoute}/reload`,{},function (data) {
            toastr.info("Please refresh / reload your browser.\n ", "Info");
        });
    }, 2500);
    setTimeout(function () {
        window.location.href = `/${dataTableRoute}`;
    }, 4500);
    return false;
};
$("body").on("click", ".gridview", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/view/` + $(this).data("id");
});
$("body").on("click", ".gridupdate", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/update/` + $(this).data("id");
});
$("body").on("click", ".griddelete", function (e) {
    e.stopPropagation();
    if (window.confirm("sure to delete")) {
        ajaxDelete(`/${dataTableRoute}/delete/`, {id: $(this).data("id")}, function (data) {
            toastrForm(data);
            if(data.status == 1){
                location.href='';
            }
        });
    }
});
$("body").on("click", ".gridapproval", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/approval/` + $(this).data("id");
});
$("body").on("click", ".gridadd", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/create`;
});
$(".export-parsing").on("click", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/excel-query?zraws=1&${queryParams()}`;
});
$("body").on("click", ".gridexcel", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/excel-query?${queryParams()}`;
});
$(".export-xls").on("click", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/excel?${queryParams()}`;
});
//export data
$(".export-search-prety").on("click", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/excel-query?zraws=0&zsearch=1&all=0&${queryParams()}`;
});
$(".export-search-raw").on("click", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/excel-query?ztype=0&zraws=1&zsearch=1&all=0&${queryParams()}`;
});
$(".export-all-prety").on("click", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/excel-query?ztype=0&zraws=0&zsearch=0&all=1&${queryParams()}`;
});
$(".export-all-raw").on("click", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/excel-query?ztype=0&zraws=1&zsearch=0&all=1&${queryParams()}`;
});
$(".export-pdf").on("click", function (e) {
    e.stopPropagation();
    toastr.info("Downloading..")
    location.href = `/${dataTableRoute}/excel-query?ztype=1&zraws=0&zsearch=0&all=0&${queryParams()}`;
});
$(".export-all-pdf").on("click", function (e) {
    e.stopPropagation();
    toastr.info("Sedang mengunduh..")
    location.href = `/${dataTableRoute}/excel-query?ztype=1&zraws=0&zsearch=0&all=1&${queryParams()}`;
});
$(".export-standart").on("click", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/excel-query?zstandart=1&zraws=0&zsearch=0&all=0&${queryParams()}`;
});
$(".export-standart-all").on("click", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/excel-query?zstandart=1&zraws=0&zsearch=0&all=1&${queryParams()}`;
});
$("body").on("click", ".myreport-grid", function (e) {
    e.stopPropagation();
    toastr.info("Downloading...")
    let id = $(this).data("id");
    location.href = `/myreport/${id}`;
});
// end custom print
$("body").on("click", ".gridimport", function (e) {
    e.stopPropagation();
    location.href = `/${dataTableRoute}/import`;
});
$("body").on("click", ".gridreload", function (e) {
    e.preventDefault();
    ajaxPost(`/${dataTableRoute}/reload`,{}, function (data) {
        location.href= `/${dataTableRoute}`;
    });
});
$("body").on("click", ".gridprint", function (e) {
    e.preventDefault();
    //$("#modalpopup").show();
    window.open(
        "/print_za/"+$(this).data('token'),
        '_blank'
    );
});
$("ul.gridsortable").sortable({
    group: 'gridsortable',
    isValidTarget: function ($item, container) {
        if ($item.is(".disabled"))
            return false;
        else
            return true;
    },
    onDrop: function ($item, container, _super) {
        const getidname = $item.parents().attr('id');
        if (getidname == "gridleft") {
            $item.find('span').addClass('fa-eye').removeClass('fa-eye-slash');
            $item.find('img').attr("src","/assets/icons/eye.svg");
        } else {
            $item.find('img').attr("src","/assets/icons/eye-off.svg");
        }
        _super($item, container);
    }
});
$(".grid-submit").on("click", function () {
    let leftvalue = [];
    $("#gridleft li").each(function (i) {
        const dataname = $(this).attr('data-name');
        if (dataname) {
            leftvalue.push(dataname);
        }
    });
    $('#serialize_left').val(JSON.stringify(leftvalue));
    let rightvalue = [];
    $("#gridright li").each(function (i) {
        const dataname = $(this).attr('data-name');
        if (dataname) {
            rightvalue.push(dataname);
        }
    });
    $('#serialize_right').val(JSON.stringify(rightvalue));
    $("#form-grid").submit();
});
$(".grid-reset").on("click", function(){
    ajaxDelete(`/${dataTableRoute}/grid`,{},function (data) {
        if (data.status == 0) {
            toastr.error(data.message, data.title);
        } else {
            $("#jsGrid").jsGrid("loadData");
            toastr.success(data.message, data.title);
        }
        location.href = '';
    });
});
submitForm('form-grid', '', `/${dataTableRoute}`);
$("input[name='_csrf']").val(document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
$("#dataTable_filter").hide();
$(function () {if(window.matchMedia("(max-width: 450px)").matches){$("#dataTable>thead>tr").eq(1).hide();} else {$("#dataTable>thead>tr").eq(1).show();}})
