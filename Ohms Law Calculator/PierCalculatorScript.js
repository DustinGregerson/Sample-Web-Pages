//  ^\d+$ positive whole numbers
//  ^\d+\.$|^\d+\.\d+$|^\.\d+$ finds positive decimal numbers

const regexIsValidNumber = / ^\d+$|^\d+\.$|^\d+\.\d+$|^\.\d+$ /

$(document).ready(() => {
    $("#Calc").click(() => {
        var inputs = $(":text");
        let atLeastTwoValid = false;
        let count = 0;
        //checks to see if at least two inputs were valid before the rest of the code will run
        for (let i = 0; i < inputs.length; i++) {
            if (ValidateData(inputs[i].value)) {
                count++;
                if (count == 2) {
                    atLeastTwoValid = true;
                    break;
                }
            }
        }
        if (atLeastTwoValid) {
            $(":text").removeClass();
            //all selecters grab the value from each textbox
            //first text input
            var ohms = $(":text:first").val();
            //selects all input elements that have text type
            //gt(0) grabs all ements greater than the zero idex and the first one from that is selected
            var amps = $(":text:gt(0):first").val();
            //selects all input elements that have text type
            //even selects all the even values of the query and the last of the evens
            //ohms 0 even:first
            //amps 1 odd
            //volds 2 even:last
            var volts = $(":text:even:last").val();
            //selects all input elements that have text type
            //then selects the last one that is last
            var watts = $(":text:last").val();

            //performs the calculations on the first two entered values that were valid
            Calc(ohms, amps, volts, watts);
        } else {
            
            //covers three jquary methods
            $(":text").each( (element)=>{
                    if(!ValidateData(inputs[element].value)){
                        $(":text:eq("+element+")").addClass("invalid");
                    }
                    else{
                        $(":text:eq("+element+")").removeClass("invalid");  
                    }
            });
            alert("you must enter at least two valid numbers to calculate");

        }


    });
    //clears the text feilds
    $("#Clear").click(() => {
        $(":text").removeClass();
        $(":text").val("");
    });

    //if the enter key is ever pressed the calc buttons event fires
    $(document).keypress((event) => {
        //even though the event.key is return a string. it is not compatiable with a normal string
        //so it must be cast to one for Enter to be compaired to "Enter"
        if ((event.key + "") == "Enter") {

            
            $("#Calc").trigger("click");
            
        }
    });
});

//this function is used to validate input if it fails to match agenst the regex it returns false
function ValidateData(data) {
    valid = false;
    //this search will return anything but negative one if a match was found
    if (data.search(regexIsValidNumber) != -1) {
        valid = true;
    }
    return valid;
}

function Calc(ohms, amps, volts, watts) {
    //used to point to the indexes that have valid values
    let index1 = 0;
    let index2 = 0;

    //holds the inputs valid or not the preivous check made shure there are at least two valid
    let values = [];

    //adds the inputs to the array
    values.push(ohms);
    values.push(amps);
    values.push(volts);
    values.push(watts);
    let count = 0;

    //this finds what indexes have valid input
    //based off the indexes diffrent calculations are performed
    for (let i = 0; i < values.length; i++) {
        if (ValidateData(values[i])) {
            count++;
            if (count == 1) {
                index1 = i;
            }
            if (count == 2) {
                index2 = i;
                break;
            }
        }
    }
    //points to first index with valid input
    switch (index1) {
        case 0:
            //points to the second index with valid input
            switch (index2) {
                case 1:
                    //has ohms and amps

                    //finds volts
                    values[2] = amps * ohms;

                    //finds watts
                    values[3] = values[2] * amps;
                    break;
                case 2:
                    //has ohms and volts

                    //finds amps
                    values[1] = volts / ohms;
                    //finds watts
                    values[3] = values[1] * volts;
                    break;
                case 3:
                    //has ohms and watts

                    //finds volts
                    values[2] = Math.sqrt(watts * ohms);
                    //finds amps
                    values[1] = Math.sqrt(watts / ohms);
                    break;
            }
            break;
        case 1:
            switch (index2) {
                case 2:
                    //has amps and volts

                    //finds ohms
                    values[0] = volts / amps;
                    //finds watts
                    values[3] = volts * amps;
                    break;
                case 3:
                    //has amps and watts

                    //finds volts
                    values[2] = watts / amps;
                    //finds ohms
                    values[0] = values[2] / amps;

                    break;
            }
            break;
        case 2:
            switch (index2) {
                case 3:
                    //has volts and watts

                    //finds amps
                    values[1] = watts / volts;

                    //find ohms
                    values[0] = volts / values[1];
                    break;
            }
            break;
    }
    //selects all text feilds
    var inputs = $(":text");
    for (let i = 0; i < values.length; i++) {
        //assigns the new values to the inputs
        inputs[i].value = "" + values[i];
    }

}