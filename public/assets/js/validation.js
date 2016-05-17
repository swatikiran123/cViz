function formValidation()
{
    var firstname = document.registration.firstname;
    var lastname = document.registration.lastname;
    var passid = document.registration.password;
    var uemail = document.registration.email;
    // validateFirstname(firstname);
    // validateLastname(lastname);
    // validateEmail(uemail);
    // validatePassword(passid,7,15);

    if(validateFirstname(firstname) && validateLastname(lastname) && validateEmail(uemail) && validatePassword(passid,7,15))
    {    
    return true;
    }

    else
    {
        return false;
    }
}


function validateFirstname(fld) {
    var error = "";
    var illegalChars = /\W/; // allow letters, numbers, and underscores

    if (fld.value == "") {
        error = "First Name is mandatory field.\n";
        document.getElementById("fname1").innerHTML ="<span style=\"color:#cc0000\">" + "First Name is mandatory field." + "</span>";
        return false;
    } 
     else {
        fld.style.background = 'White';
    }
    return true;
}

function validateLastname(fld) {
    var error = "";
    var illegalChars = /\W/; // allow letters, numbers, and underscores

    if (fld.value == "") {
        error = "Last Name is mandatory field.\n";
        // document.registration.lname1 = error;
        document.getElementById("lname1").innerHTML = "<span style=\"color:#cc0000\">" + "Last Name is mandatory field." + "</span>";
        return false;

    } 
     else {
        fld.style.background = 'White';
    }
    return true;
}

function validatePassword(fld) {
    var error = "";
    var illegalChars = /[\W_]/; // allow only letters and numbers

    if (fld.value == "") {
        error = "Password is mandatory field.\n";
        // document.registration.password1 = error;
        document.getElementById("password1").innerHTML = "<span style=\"color:#cc0000\">" + "Password is mandatory field." + "</span>";
        return false;

    } else if (fld.value.length < 7) {
        error = "The password should contain minimum 8 characters\n";
        // document.registration.password1 = error;
        document.getElementById("password1").innerHTML = "<span style=\"color:#cc0000\">" + "The password should contain minimum 8 characters"+ "</span>";
        return false;

    }
    else if (fld.value.length > 15) {
        error = "The password should should be less than 15 characters\n";
        // document.registration.password1 = error;
        document.getElementById("password1").innerHTML = "<span style=\"color:#cc0000\">" + "The password should should be less than 15 characters."+ "</span>";
        return false;
    } 
     else {
        fld.style.background = 'White';
    }
    return true;
}

function validateEmail(fld)
{    
    var error = "";
    var illegalChars = /\W/; // allow letters, numbers, and underscores

    if (fld.value == "") {
        error = "Email is mandatory field.\n";
        // document.registration.email1 = error;
        document.getElementById("email1").innerHTML = "<span style=\"color:#cc0000\">" + "Email is mandatory field."+ "</span>";
        return false;
    } 

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(fld.value)) {
        // fld.style.background = 'Yellow';
        error = "Please provide a valid email address.\n";
        // document.registration.email1 = error;
        document.getElementById("email1").innerHTML = "<span style=\"color:#cc0000\">" + "Email is mandatory field."+ "</span>";
        return false;
    }

    return true;
}