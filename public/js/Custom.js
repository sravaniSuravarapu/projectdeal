function beginRequest(e, t) {}

function endRequest(e, t) {
    $(".chzn-select").chosen({
        disable_search_threshold: 10,
        no_results_text: "Oops, nothing found!",
        width: "100%"
    }), handleDatePickers()
}
var handleDatePickers = function() {
    var e = new Date;
    e.setDate(e.getDate() - 0), $(".date-picker").datepicker({
        startDate: e,
        autoclose: !0
    }), jQuery().datepicker && ($(".date-picker").datepicker({
        rtl: !1,
        autoclose: !0
    }), $("body").removeClass("modal-open"))
};
jQuery(document).ready(function() {
    handleDatePickers(), jQuery(".content_form input").tooltip()
}), $(document).ready(function() {
    $("#quote-carousel").carousel({
        pause: !0,
        interval: 4e3
    })
}), Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function(e, t) {
    $("#TextBox_deadline").datepicker()
});
var pageRequest = Sys.WebForms.PageRequestManager.getInstance();
pageRequest.add_beginRequest(beginRequest), pageRequest.add_endRequest(endRequest);