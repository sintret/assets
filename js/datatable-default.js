var draw ={};
var dataTable = $('#dataTable').DataTable({
    responsive: true,
    processing: true,
    serverSide: true,
    dom: 'Blrftip',
    "language": {
        "paginate": {
            "previous": '<img src="/assets/tiny/arr-left.svg" class="icons-bg-black" >',
            "next": '<img src="/assets/tiny/arr-right.svg" class="icons-bg-black" >',
        }
    },
    search: {
        return: false
    },
    ajax: {
        url : `/${dataTableRoute}/list`,
        type : "POST",
        headers : {
            'CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        data : function (d) {
            d.fields = dataTableFields;
            draw = d;
        }
    },
    orderCellsTop: true,
    fixedHeader: false,
    order: [[ 0, "desc" ]],
    initComplete: function () {
        let api = this.api();
        api
            .columns()
            .eq(0)
            .each(function (colIdx) {
                var cell = $('.filters th').eq(
                    $(api.column(colIdx).header()).index()
                );
                var title = $(cell).text();
                $(
                    dataTableTypes[dataTableFields[colIdx]],
                    $('.filters th').eq($(api.column(colIdx).header()).index())
                )
                    .off('keyup change')
                    .on('keyup change', function (e) {
                        e.stopPropagation();
                        $(this).attr('title', $(this).val());
                        const cursorPosition = this.selectionStart;
                        const val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        const searchVal = val;
                        api
                            .column(colIdx)
                            .search(
                                val ? $(this).is("input") ? '%'+val+'%' : val : '', true, false
                            )
                            .draw();
                    });
            });
    }
});

function queryParams() {
    let params = {};
    draw.columns.forEach(function (item, index) {
        params[draw.fields[index]] = item.search.value;
    });
    params.pageIndex = parseInt(draw.start) + 1;
    params.pageSize = parseInt(draw.length);
    let sortField = draw.fields[draw.order[0].column];
    if(sortField == "no" || sortField=="actionColumn") {
        sortField = "id";
    }
    params.sortField = sortField;
    params.sortOrder = draw.order[0].dir;
    return jQuery.param(params);
}
