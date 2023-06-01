window.addEventListener("load", initialize);

//Initializing Functions
function initialize() {

    $('[data-toggle="tooltip"]').tooltip()

    //add/clear/update button event handlers
    btnTAdd1.addEventListener("click", btnAddMCT);
    cmbReservation.addEventListener("change", cmbReservationCH);
    txtSearchName.addEventListener("keyup", btnSearchMC);


    privilages = httpRequest("../privilage?module=TABLEALLOWCATION", "GET");

    //Make arrays as genders,designations,civilstatuses and employeestatuses to get list for combop box
    tabledetails = httpRequest("../tabledetail/list", "GET");
    tablestatuses = httpRequest("../tablestatus/list", "GET");
    reservations = httpRequest("../reservation/list", "GET");

    //inner-materials array
    tableallocations = httpRequest("../tableallocation/list", "GET");

    //services should be implemented to get services then write services to get list
    //2.make controller and repository

    //colours
    valid = "3px solid #078D27B2";
    invalid = "3px solid red";
    initial = "3px solid #d6d6c2";
    updated = "3px solid #ff9900";
    active = "rgba(250,210,11,0.7)";



    loadFormT();
  

}

function cmbReservationCH(){


        reserveddate = httpRequest("/reservationhasservice/byreservation?reservationid=" + JSON.parse(cmbReservation.value).id, "GET");
        txtRDate.value=reserveddate.reserveddate;
        tableallocation.reserveddate=txtRDate.value;
        txtRDate.style.border=valid;

}

function loadFormT() {
    tableallocation = new Object();
    oldtableallocation = null;


    tableallocation.tableallocationHasTableddetailList = new Array();

    reservations = httpRequest("../reservation/listbydineinservice", "GET");

    fillCombo(cmbReservation, "Select a reservation", reservations, "reservationno", "");


    //fill and auto select autobind
    fillCombo(cmbTStatus, "Select sub menu status", tablestatuses, "name", "Available");
    tableallocation.tablestatus_id = JSON.parse(cmbTStatus.value);
    cmbTStatus.disabled = true;




    nextta = httpRequest("../tableallocation/nextta", "GET");
    txtTAcode.value = nextta.tableallocationcode;
    tableallocation.tableallocationcode = txtTAcode.value;
    txtTAcode.disabled = true;


    //text field empty
    txtRDate.value = "";
    txtRTime.value = "";
    txtGCount.value="";

    cmbReservation.value = "";


    setStyleT(initial);

    cmbTStatus.style.border = valid;

    txtTAcode.style.border = valid;


    disableButtonsT(false, true, true);

    refreshInnerForm();
}

function refreshInnerFormT() {

    tableallocationHastabledetail = new Object();
    oldtableallocationHastabledetail = null;


    //inner form
    //autofill combo box

    fillCombo(cmbInnerTableDetail, "Select no of Chairs", tabledetails, "nofchairs", "");
    cmbInnerTableDetail.style.border = initial;


    //Inner table
    fillInnerTable('tblInnertblAllocation',  tableallocation.tableallocationHasTableddetailList, innerModify, innerDelete, false);



}

function btnInnerAddMCT() {
    var itmext = false;

    for (var index in tableallocation.tableallocationHasTableddetailList) {
        if (tableallocation.tableallocationHasTableddetailList[index].tableallocation_id.tableallocationcode== tableallocationHasTableddetailList.tableallocation_id.tableallocationcode) {
            itmext = true;
            break;
        }
    }
    if (itmext) {
        swal({
            title: "Already exist!",
            icon: "warning",
            text: '\n',
            button: false,
            timer: 1200,
        });
    } else {
        tableallocation.tableallocationHasTableddetailList.push(tableallocationHastabledetail);
        refreshInnerFormT();
    }


}

function innerModify() {

}

function innerDelete(innerob, innerrow) {
    swal({
        title: "Are you sure to remove Table?",
        text: "\nItem Name : " + innerob.tabledetailed_id.tablename,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            tableallocation.tableallocationHasTableddetailList.splice(innerrow, 1);
            refreshInnerFormT();
        }
    });
}

function setStyleT(style) {


    txtTAcode.style.border=style;
    txtRDate.style.border=style;
    txtRTime.style.border=style;

    txtGCount.style.border=style;

    cmbTStatus.style.border=style;
    cmbReservation.style.border=style;
}

function disableButtonsT(add, upd, del) {

    if (add || !privilages.add) {
        btnAdd.setAttribute("disabled", "disabled");
        $('#btnAdd').css('cursor', 'not-allowed');
    } else {
        btnAdd.removeAttribute("disabled");
        $('#btnAdd').css('cursor', 'pointer')
    }

    if (upd || !privilages.update) {
        btnUpdate.setAttribute("disabled", "disabled");
        $('#btnUpdate').css('cursor', 'not-allowed');
    } else {
        btnUpdate.removeAttribute("disabled");
        $('#btnUpdate').css('cursor', 'pointer');
    }

    if (!privilages.update) {
        $(".buttonup").prop('disabled', true);
        $(".buttonup").css('cursor', 'not-allowed');
    } else {
        $(".buttonup").removeAttr("disabled");
        $(".buttonup").css('cursor', 'pointer');
    }

    if (!privilages.delete) {
        $(".buttondel").prop('disabled', true);
        $(".buttondel").css('cursor', 'not-allowed');
    } else {
        $(".buttondel").removeAttr("disabled");
        $(".buttondel").css('cursor', 'pointer');
    }

    // select deleted data row
    for (index in tableallocations) {
        if (tableallocations[index].tablestatus_id.name == "Deleted") {
            tblTableallocation.children[1].children[index].style.color = "#f00";
            tblTableallocation.children[1].children[index].style.border = "2px solid red";
            tblTableallocation.children[1].children[index].lastChild.children[1].disabled = true;
            tblTableallocation.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";
        }
    }
}

function getErrorsT() {

    var errors = "";
    addvalue = "";

    if (tableallocation.tableallocationcode == null) {
        errors = errors + "\n" + "Table allocation code Not Entered";
        txtTAcode.style.border = invalid;
    } else addvalue = 1;

    if (tableallocation.reserveddate == null) {
        errors = errors + "\n" + "Reserved date Not Entered";
        txtRDate.style.border = invalid;
    } else addvalue = 1;

    if (tableallocation.reservetime == null) {
        errors = errors + "\n" + "Reserved time Not Selected";
        txtRTime.style.border = invalid;
    } else addvalue = 1;

    if (tableallocation.reservation_id == null) {
        errors = errors + "\n" + "Reservation Not Selected";
        cmbReservation.style.border = invalid;
    } else addvalue = 1;

    if (tableallocation.guestcount == null) {
        errors = errors + "\n" + "RGuest Count Not Entered";
        txtGCount.style.border = invalid;
    } else addvalue = 1;


    // msg for fill data in innertable
    if (tableallocation.tableallocationHasTableddetailList.length == 0) {
        cmbInnerTableDetail.style.border = invalid;
        errors = errors + "\n" + "Table Details not added";

    } else addvalue = 1;


    return errors;

}

function btnAddMCT() {
    if (getErrorsT() == "") {
            savedataT();
    } else {
        swal({
            title: "You have following errors",
            text: "\n" + getErrorsT(),
            icon: "error",
            button: true,
        });

    }
}

function savedataT() {

    swal({
        title: "Are you sure to add following Sub menu...?",
        text:
            "\nTableallocation code: " + tableallocation.tableallocationcode +
            "\nReservation: " + JSON.parse(cmbReservation.value).reservationno +
            "\nReserved Date: " + tableallocation.reserveddate +
            "\nReserved Time : " + tableallocation.reservetime+
            "\nGuest Count: " + tableallocation.guestcount +
            "\nAdded date: " + tableallocation.addeddate,

        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            var response = httpRequest("/tableallocation", "POST", tableallocation);
            if (response == "0") {
                swal({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been Done \n Save SuccessFully..!',
                    text: '\n',
                    button: false,
                    timer: 1200
                });
                activepage = 1;
                loadSearchedTable();
                loadFormT();
                changeTab('table');
            } else swal({
                title: 'Save not Success... , You have following errors', icon: "error",
                text: '\n ' + response,
                button: true
            });
        }
    });

}

function btnClearMC() {
    //Get Cofirmation from the User window.confirm();
    checkerr = getErrorsT();

    if (oldtableallocation == null && addvalue == "") {
        loadFormT();
    } else {
        swal({
            title: "Form has some values, updates values... Are you sure to discard the form ?",
            text: "\n",
            icon: "warning", buttons: true, dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                loadFormT();
            }

        });
    }

}
