
$("body").on("change", "#division_id", function () {chains("division_id","department","department_id","division_id","CONCAT(title)", $("#department_id").val());});
if($("#department_id").val()){
    chains("division_id","department","department_id","division_id","CONCAT(title)", $("#department_id").val());
}
$("body").on("change", "#department_id", function () {chains("department_id","section","section_id","department_id","CONCAT(title)", $("#section_id").val());});
if($("#section_id").val()){chains("department_id","section","section_id","department_id","CONCAT(title)", $("#section_id").val());}

$(function () {

    $(".isfile").each(function (index, value) {
        var filename = $(this).attr("data-filename") || "";
        var id = $(this).attr("data-id");
        if (filename.length > 3) {
            var ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
            if (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "bmp" || ext == "webp") {
                $("#file"+id).attr("src","/uploads/restaurant/"+filename).attr("height","100px");
            } else {
                $("#file"+id).attr("src","/img/file.png").attr("height","100px");
            }
            $("#file"+id).on("click", function () {
                location.href = "/uploads/restaurant/"+filename;
            });
        }
        if($(this).data("required") == true) {
            var imageElement = "#file"+id;
            if(!$(imageElement).attr("src")) {
                $("#"+id).attr("required",true);
            }
        }
    });
});
