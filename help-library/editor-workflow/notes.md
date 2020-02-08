https://stackoverflow.com/questions/21700364/adding-click-event-listener-to-elements-with-the-same-class
You should use querySelectorAll. It returns NodeList, however querySelector returns only the first found element:

ternary: 
return (isMember ? '$2.00' : '$10.00');
return (text.includes(subString) ? containsSubStr = true : containsSubStr = false);