
function verify(usn)
{
    if(usn.length != 10)
     { 
         return false;
    }
    else
    {
        var regExp = new RegExp('1ay[0-9]{2}is|cs|me|bt|ae|cv|ee|ec|mi|ct|au[0-9]{3}','i');
        if(usn.match(regExp))
            return true;
        else
            return false;
    }
}