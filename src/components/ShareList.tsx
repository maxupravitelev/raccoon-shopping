import React from "react";

const ShareList = ({ listId, setColor }) => {
    const handleShareList = () => {
      let copyListURL =
        "https://raccoon-shopping.herokuapp.com/api/lists/:" + listId;
  
      
      // create empty textarea for copy&pasting  
      let tmp = document.createElement("textarea");
      tmp.value = copyListURL;
      tmp.style.height = "0";
      tmp.style.overflow = "hidden";
      tmp.style.position = "fixed";
      document.body.appendChild(tmp);
      tmp.focus();
  
      tmp.select();
      tmp.setSelectionRange(0, 99999);
  
      document.execCommand("copy");
  
      alert("adress of List copied to clipboard: " + tmp.value);
      document.body.removeChild(tmp);
  
    };

    return (
      <div style={{ display: "block", margin: "0 auto", textAlign: "center" }}>
        <button
          onClick={handleShareList}
          style={setColor}
          // disabled={true}
          aria-label="Share via Link"
        >
          Share List
        </button>
        <br />
        <br />
  
        <div className="share-button" style={{ textAlign: "center" }}>
          {/* <div> List-ID: {listId}</div> */}
  
          {/* <a href={"https://raccoon-shopping.herokuapp.com/api/lists/:" + listId}>
            {"#" + listId}
          </a> */}
        </div>
      </div>
    );
  };

  export default ShareList;