export class HttpRequests
{
  // eslint-disable-next-line
  public httpPostAsync(theUrl: string | undefined, params: any, callbackFunction: any, callback: any) 
  {
      const xmlHttp = new XMLHttpRequest();
  
      xmlHttp.onreadystatechange = function() 
      { 
          if (xmlHttp.readyState == 4) 
          {
              if (xmlHttp.status == 200) 
              {
                callback(JSON.parse(xmlHttp.responseText), callbackFunction);
              } 
              else 
              {
                callback( { err: true }, callbackFunction );
              }
          }
      }
  
      if( theUrl != undefined)
      {
        xmlHttp.open("POST", theUrl, true); // true for asynchronous 
      }
              
      if (params != null) 
      {
          xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xmlHttp.send(JSON.stringify(params));
      } 
      else 
      {
          xmlHttp.send(null);
      }
  }

}

  