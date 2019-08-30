var GUser1ContentBox = document.getElementById("User1Content"),
    GUser2ContentBox = document.getElementById("User2Content"),

    GInputUser = {
      User1 : "MessageUser1",
      User2 : "MessageUser2"
    },

    GMsgDate = pvtReturnDate();

window.onload = function()
{
  /* 
   Description: OnLoad of the Webpage it calls the pvtShowMsgOnCLear() 
    function with argument as true which shows the No Messages text 
    in Both Message BoxArea
  */
  pvtShowMsgOnCLear(true);

}

function pvtReturnDate()
{
  /*
   Description: This function separates the current Date into its different
     paramteres like day,year,month,hours,minutes and return a string in 
     specific date format as required
  */
  var LDate = new Date(),
      LYear = LDate.getFullYear(),

      LMonthArray = ["January","February","March","April","May","June","July"
              ,"August","September","October","November","December"],
      LMonth = LMonthArray[LDate.getMonth()],
      LDay = LDate.getDate(),

      LTime = LDate.toLocaleTimeString(),

      //this variable will get the time into required format
      LTimeFormat = [LTime.split(':')[0],LTime.split(':')[1]].join(':'),
      LCurrentDate = LDay + " " + LMonth + " "+ LYear + "," + LTimeFormat + 
                     ' ' + LTime.split(' ')[1];
  return LCurrentDate;
}

function HandleOnSendMessageBtnClick(p_strInputId)
{
  /*
   Description: this function send the message from respected user to both Users 
     content Box and hides the no messages text from User Content Box.

   Parameters: 1) p_strInput (type: String) - It holds InputId of the inputted message.
  */

  if(typeof(p_strInputId) === "undefined")
  {
    return;
  }

  var LMessage = document.getElementById(p_strInputId);

  //checks if input message is empty then show alert message to write message
  if((LMessage.value).trim() === "")
  {
    LMessage.style.border = "2px solid red";
    LMessage.value = "";
    LMessage.focus();
  }
  //otherwise it checks that which user writes the message
  else{
    switch(p_strInputId)
    {
    case GInputUser.User1 : 
      pvtCreateMessageBlock(LMessage.value, "LiMessage1", "LiMessage2",
                            "<b>User1: </b>" + " " + LMessage.value,"LiMessageUser1", "LiMessageUser2");
      break;
    case GInputUser.User2 : 
      pvtCreateMessageBlock("<b>User2: </b>" + " " + LMessage.value, "LiMessageUser1", "LiMessageUser2",
                            LMessage.value, "LiMessage1", "LiMessage2");
      break;
    }
    pvtHideNoMsgOnEntry(p_strInputId);
    LMessage.style.border = "none";
  } 
}

function pvtCreateMessageBlock(p_strPText, p_strPClassName, p_strDateClassName,
                               p_strOtherPText, p_strOtherPClassName, p_strOtherDateClassName)
{
  /*
   Description: This function creates two Message Block and displays it in Both
     Users Content Box.

   Parameters: 1) p_strPText(Type: String) - Message From Respected User.
               2) p_strPClassName(Type: String) - ClassName for Respected User Message.
               3) p_strDateClassName(Type: string) - ClassName for Respected User Date.
               4) p_strOtherPText(Type: string) - Message for Another User.
               5) p_strOtherPClassName(type: String) - ClassName for Another User Message. 
               6) p_strOtherDateClassName(Type: String) - ClassName for Another User Date. 
  */
  
  if((typeof(p_strPText) === "undefined") || (typeof(p_strPClassName) === "undefined") ||
    (typeof(p_strDateClassName) === "undefined") || (typeof(p_strOtherPText) === "undefined") ||
    (typeof(p_strOtherPClassName) === "undefined") || (typeof(p_strOtherDateClassName) === "undefined"))
  {
    return;
  }

  var LNewDivElement, LNewPElement1, LNewPElement1;
  
  //Message Block Appended in Respected User View.
  LNewDivElement = pvtCreateNewHTMLElement("div", "", "MessageBlock");

  LNewPElement1 = pvtCreateNewHTMLElement("p", p_strPText, p_strPClassName);
  LNewDivElement.appendChild(LNewPElement1);

  LNewPElement2 = pvtCreateNewHTMLElement("p", GMsgDate, p_strDateClassName);
  LNewDivElement.appendChild(LNewPElement2);

  GUser1ContentBox.appendChild(LNewDivElement);
  LNewDivElement.scrollIntoView();

  //Message Block Appended in Another User View.
  LNewDivElement = pvtCreateNewHTMLElement("div", "", "MessageBlock");

  LNewPElement1 = pvtCreateNewHTMLElement("p", p_strOtherPText, p_strOtherPClassName);
  LNewDivElement.appendChild(LNewPElement1);

  LNewPElement2 = pvtCreateNewHTMLElement("p", GMsgDate, p_strOtherDateClassName);
  LNewDivElement.appendChild(LNewPElement2);

  GUser2ContentBox.appendChild(LNewDivElement);
  LNewDivElement.scrollIntoView();
}

       
function HandleOnClearBtnClick(p_strIdentifyUser)
{
  /*
   Description: This function Clear the Chats From Respected User and displays 
    No Messages Text.
   
    Parameters : 1) p_strIdentifyUser(Type: String) - get Which User clicks the Clear button.
  */  
  
  if(typeof(p_strIdentifyUser) === "undefined")
  {
    return;
  }

  switch(p_strIdentifyUser)
  {
    case "User1" : 
      GUser1ContentBox.innerHTML = "";
      pvtShowMsgOnCLear(false,GUser1ContentBox);
      break;

    case "User2" : 
      GUser2ContentBox.innerHTML = "";
      pvtShowMsgOnCLear(false,GUser2ContentBox);
      break;
  }
  
}

function pvtCreateNewHTMLElement(p_strElementName, p_strText, p_strClassName)
{
  /*
   Description : This Function creates the new Html element according to user Values
     and assign it Text and ClassName.

   Parameters : 1) p_strElementName(Type: String) - Hold Htmlelement name want to create.
                2) p_strText(Type: String) - used to set the text of Element.
                3) p_strClassName(Type: String) - to assign ClassName for Created Element
          
    Returns : LNewElement as created new Html Element.
  */
  
  if((typeof(p_strElementName) === "undefined") || (typeof(p_strText) === "undefined") ||
    (typeof(p_strClassName) === "undefined"))
  {
    return;
  }
  var LNewElement;
  LNewElement = document.createElement(p_strElementName);
  LNewElement.innerHTML = p_strText;
  if(p_strClassName === "")
  {
    return LNewElement;
  }
  LNewElement.className = p_strClassName;
  return LNewElement;
}


function pvtShowMsgOnCLear(p_boolOnLoadClear, p_objContentNode = "")
{
  /*
   Description : This function Shows the No Messages Text on Chat Box if both 
     Chats are empty then display it in both Chat Box otherwise in respected 
     Chat Box.
 
   Parameters : 1) p_boolOnLoadClear(Type: Boolean) - Identifies Both Users 
                     Chat Box empty or not.
                2) p_objContentNode(Type: string) - Get Respected User Chat
                     Box to append No Message Text. 
 */
  if((typeof(p_boolOnLoadClear) === "undefined") || (typeof(p_objContentNode) === "undefined"))
  {
    return;
  }
  var LNoMsgElement1  = pvtCreateNewHTMLElement("div","No Messages","NoMsg"),
      LNoMsgElement2  = pvtCreateNewHTMLElement("div","No Messages","NoMsg");
  
  switch(p_boolOnLoadClear)
  {
    case true : 
      GUser1ContentBox.appendChild(LNoMsgElement1);
      GUser2ContentBox.appendChild(LNoMsgElement2);
    break;
    
    case false:
      p_objContentNode.appendChild(LNoMsgElement1);
      break;
  }
}

function pvtHideNoMsgOnEntry(p_strInputId)
{
  /*
   Description: This Function Hides the No Messages Element From Respected
     User Chat Box.

    Parameters: 1) p_strInputId(Type: String) - To Identify Input Box From Respected User.
  */
  
  if(typeof(p_strInputId) === "undefined")
  {
    return;
  }

  var LNoMsgElement = document.getElementsByClassName("NoMsg"),
      LMessage = document.getElementById(p_strInputId);
  LNoMsgElement[0].style.display = "none";
  LNoMsgElement[1].style.display = "none";
  LMessage.value = "";
  LMessage.focus();
}

function HandleOnSendOnEnterKeyPress(event,p_strInputId)
{
  /*
   Description: This Function executes when enter key is pressed and send message 
     to both Chat Box.
     
   Parameters: 1) p_strInputId(Type: String) - Get Input Id from Respected User.
  */

  if(typeof(p_strInputId) === "undefined")
  {
    return;
  }

  var LBtnPress = event.which,
      LMessageInput = document.getElementById(p_strInputId);
  if(LBtnPress === 13)
  {
    if((LMessageInput.value).trim() === "")
    {
      LMessageInput.style.border = "2px solid red";
      LMessageInput.value = "";
      LMessageInput.focus();
    }
    else
    {
      HandleOnSendMessageBtnClick(p_strInputId);
    }
  } 
}



