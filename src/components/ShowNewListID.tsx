import React from "react";


const ShowNewListID = ({ newListId }) => {
    if (newListId === 0) {
      return <div></div>;
    } else {
      return (
        <div style={{ display: "block", margin: "0 auto", textAlign: "center" }}>
          <a
            href={"http://shopping-assistent.herokuapp.com/?listId:" + newListId}
          >
            <button>Open New List</button>
          </a>
          {/* <a href="#"><button>Open new list</button></a> */}
          <br />
          <br />
        </div>
      );
    }
  };

  export default ShowNewListID;