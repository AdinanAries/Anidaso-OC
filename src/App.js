import './App.css';

import HERO_BG from "./news-letter-bg1.jpg";
import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage';
import FullPageLoader from './components/FullPageLoader';
import CreatePasswordPage from "./pages/CreatePasswordPage";
import { verifyUserToken } from './services/sessionServices';
import { fetchAccountInfo } from './services/accountServices';
import { fetchNewsLetterStateByAgentAndTemplateName } from './services/newsLetterServices';
import { useEffect, useState } from 'react';
import { dashboardInits } from './helpers/inits';
import NewsLetterPreviewerClassicLetter from './components/NewsLetterPreviewerClassicLetter';
import { fonts } from "./helpers/fonts";
import { rgbToHex } from './helpers/helper-functions';

function App() {

  const [ currentElemToolsState, setCurrentElemToolsState ] = useState({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isHighlighted: false,
    highlightColor: "#FFF700",
    textAlign: "left",
    fontSize: 11,
    textColor: "",
    font: fonts[0],
    containerBackground: "",
    currentElem: null,
    background_image: HERO_BG,
    boxModel: {
      disply: "block",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "row",
      margin: 0,
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
      marginSide: 1,
      padding: 0,
      paddingTop: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingSide: 1,
    }
  });

  const [ lastSelection, setLastSelection ] = useState(null);
  const [ lastRange, setLastRange ] = useState(null);
  const [ lastFocusedElement, setLastFocusedElement ] = useState(null);
  const [ newSettingsSpan, setNewSettingsSpan ] = useState(null);
  const [ lastFocusedIcon, setlastFocusedIcon ] = useState(null);

  const containerFocusEvent = (event) => {
      // Get the computed style of the element
      const computedStyle = window.getComputedStyle(event.target);
      setLastFocusedElement(event.target);
      setCurrentElemToolsState({
          ...currentElemToolsState,
          containerBackground: rgbToHex(computedStyle.backgroundColor),
          boxModel: {
              ...currentElemToolsState?.boxModel,
              padding: parseInt((computedStyle.padding).replaceAll("px","")),
              paddingLeft: parseInt((computedStyle.paddingLeft).replaceAll("px","")),
              paddingRight: parseInt((computedStyle.paddingRight).replaceAll("px","")),
              paddingTop: parseInt((computedStyle.paddingTop).replaceAll("px","")),
              paddingBottom: parseInt((computedStyle.paddingBottom).replaceAll("px","")),
              margin: parseInt((computedStyle.margin).replaceAll("px","")),
              marginLeft: parseInt((computedStyle.marginLeft).replaceAll("px","")),
              marginRight: parseInt((computedStyle.marginRight).replaceAll("px","")),
              marginTop: parseInt((computedStyle.marginTop).replaceAll("px","")),
              marginBottom: parseInt((computedStyle.marginBottom).replaceAll("px","")),
          }
      });
  }

  const textFocusEvent = (event) => {
      // Get the computed style of the element
      const computedStyle = window.getComputedStyle(event.target);
      setLastFocusedElement(event.target);
      setCurrentElemToolsState({
          ...currentElemToolsState,
          boxModel: {
              ...currentElemToolsState?.boxModel,
              padding: parseInt((computedStyle.padding).replaceAll("px","")),
              margin: parseInt((computedStyle.margin).replaceAll("px",""))
          }
      });
  }

  const textHighlightEvent = (event) => {
      let selection = window.getSelection();
      setLastSelection(selection);
      if (selection.rangeCount > 0) {
          if(selection.toString().length > 0){
              setLastRange(selection.getRangeAt(0));
              const span = document.createElement('span');
              setNewSettingsSpan(span);
          }else{
              setLastRange(null);
          }
      }
      
      const computedStyle = window.getComputedStyle(event.target);
      console.log(computedStyle);
      setCurrentElemToolsState({
          ...currentElemToolsState,
          textColor: rgbToHex(computedStyle.color),
          isBold: (parseInt(computedStyle.fontWeight) > 500),
          isItalic: (computedStyle.fontStyle==="italic"),
          isUnderline: (computedStyle.textDecoration.includes("underline")),
          textAlign: (computedStyle.textAlign),
          font: (computedStyle.fontFamily),
          fontSize: parseInt((computedStyle.fontSize).replaceAll("px","")),
          boxModel: {
              ...currentElemToolsState?.boxModel,
              padding: parseInt((computedStyle.padding).replaceAll("px","")),
              margin: parseInt((computedStyle.margin).replaceAll("px",""))
          }
      });
  }

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item);
  };

  const removeElement = (e) => {
    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.style.display="none";
  }

  const removeSpansFromSelection = () => {

    if (!lastSelection || lastSelection.rangeCount === 0) {
      return;
    }

    const selectedText = lastRange.extractContents();

    const tempDiv = document.createElement('div');
    tempDiv.appendChild(selectedText);

    const spans = tempDiv.querySelectorAll('span');
    spans.forEach(span => {
      const parent = span.parentNode;
      while (span.firstChild) {
          parent.insertBefore(span.firstChild, span);
      }
      parent.removeChild(span);
    });

    lastRange.deleteContents();
    lastRange.insertNode(tempDiv.firstChild);
    lastSelection.removeAllRanges();
    lastSelection.addRange(lastRange);
  }

  const handleDrop = (e) => {
      
    e.preventDefault();
    const droppedItem = e.dataTransfer.getData('text/plain');
    
    let delete_div = document.createElement('div');
    delete_div.classList.add("nl-page-elem-delete-button");
    delete_div.addEventListener("click", removeElement);
    delete_div.innerHTML=`<i class="fa-solid fa-trash-can"></i>`;

    if(droppedItem==="button"){
        let outer_div = document.createElement("div");
        outer_div.classList.add("nl-focusable-container-elem");
        outer_div.tabIndex=-1;
        let focusable_div = document.createElement("div");
        let anchor = document.createElement("a");
        let title_p = document.createElement("p");
        let button_settings_div = document.createElement("div");

        let url_field_title = document.createElement("p");
        let url_input_field_container = document.createElement("div");
        let url_input_field = document.createElement("p");

        focusable_div.classList.add("nl-focusable-container-elem", "nl-button-container");
        focusable_div.tabIndex=-1;
        focusable_div.style.cursor = "pointer";
        focusable_div.style.width = "300px";
        focusable_div.style.textAlign = "center";
        
        anchor.target="_blank";
        anchor.textDecoration = "none";
        anchor.classList.add("nl-button-hyper-tag");
        anchor.style.textDecoration="none";
        anchor.onclick=()=>false;
        anchor.href = "";

        title_p.tabIndex=-1;
        title_p.contentEditable=true;
        title_p.style.backgroundColor = "black"; 
        title_p.style.borderRadius = "50px";
        title_p.style.padding = "20px";
        title_p.style.color = "white";
        title_p.innerText="Title Here";
        
        button_settings_div.classList.add("nl-button-settings-container");
        
        url_field_title.contentEditable=false;
        url_field_title.style.fontSize = "13px"; 
        url_field_title.style.color = "black"; 
        url_field_title.style.textAlign = "left";
        url_field_title.innerHTML = `
                            <i style="marginR-right: 5px" class="fa-solid fa-globe"></i>
                            Edit Button Link:</p>`;
        
        url_input_field.classList.add("nl-button-url-input-elem");
        url_input_field.contentEditable=true;
        url_input_field.style.marginTop = "5px"; 
        url_input_field.style.border = "none"; 
        url_input_field.style.backgroundColor = "rgba(0,0,0,0.07)"; 
        url_input_field.style.minWidth = "300px"; 
        url_input_field.style.padding = "10px"; 
        url_input_field.style.borderRadius = "50px";
        
        focusable_div.addEventListener('focus', (event) => {
            containerFocusEvent(event);
        }, true);

        outer_div.addEventListener('focus', (event) => {
            containerFocusEvent(event);
        }, true);

        url_input_field_container.appendChild(url_input_field);
        button_settings_div.appendChild(url_field_title);
        button_settings_div.appendChild(url_input_field_container);
        anchor.appendChild(title_p);
        focusable_div.appendChild(anchor);
        focusable_div.appendChild(button_settings_div);
        outer_div.appendChild(delete_div);
        outer_div.appendChild(focusable_div);
        e.target.appendChild(outer_div);
    }

    if(droppedItem==="div"){
        let div = document.createElement('div');
        div.classList.add("nl-focusable-container-elem");
        div.style.cursor = "pointer"; 
        div.style.width = "100%";
        div.style.minHeight = "40px";
        div.style.background = "rgba(129, 236, 255, 0.1)";
        div.tabIndex = -1;

        div.addEventListener('focus', (event) => {
            containerFocusEvent(event);
        }, true);

        div.appendChild(delete_div);
        e.target.appendChild(div);
    }

    if(droppedItem==="p"){
        let outer_div = document.createElement("div");
        let _p = document.createElement("p");   

        outer_div.classList.add("nl-focusable-container-elem");
        outer_div.tabIndex=-1;
        outer_div.style.display="flex";
        outer_div.style.padding="10px";
        outer_div.style.justifyContent="center";
        outer_div.style.alignItems="center";
        
        _p.classList.add("nl-highlightable-text", "nl-focusable-text");
        _p.innerHTML="add paragraph text here";
        _p.tabIndex=-1;
        _p.contentEditable=true;

        _p.addEventListener('focus', (event) => {
            textFocusEvent(event);
        }, true);

        _p.addEventListener('mouseup', (event) => {
            textHighlightEvent(event);
        });

        outer_div.appendChild(delete_div);
        outer_div.appendChild(_p)
        e.target.appendChild(outer_div);
    }

    if(droppedItem==="h1"){
        let outer_div = document.createElement("div");
        let _h1 = document.createElement("h1");

        outer_div.classList.add("nl-focusable-container-elem");
        outer_div.tabIndex=-1;
        outer_div.style.display="flex";
        outer_div.style.padding="10px";
        outer_div.style.justifyContent="center";
        outer_div.style.alignItems="center";
        
        _h1.classList.add("nl-highlightable-text", "nl-focusable-text"); // Add class here
        _h1.innerHTML="add heading text here";
        _h1.tabIndex=-1;
        _h1.contentEditable=true;

        _h1.addEventListener('focus', (event) => {
            textFocusEvent(event);
        }, true);

        _h1.addEventListener('mouseup', (event) => {
            textHighlightEvent(event);
        });
        
        outer_div.appendChild(delete_div);
        outer_div.appendChild(_h1)
        e.target.appendChild(outer_div);
    }

    if(droppedItem==="img"){

        let outer_div = document.createElement("div");
        let _img = document.createElement("img");

        outer_div.classList.add("nl-focusable-container-elem");
        outer_div.tabIndex=-1;
        outer_div.style.display="flex";
        outer_div.style.justifyContent="center";
        outer_div.style.alignItems="center";

        _img.style.width="300px";
        _img.innerHTML="add heading text here";
        _img.tabIndex=-1;
        _img.src="https://picsum.photos/300";

        outer_div.appendChild(_img);
        outer_div.appendChild(delete_div);
        e.target.appendChild(outer_div);
    }

    e.target.classList.remove("dnd_drop_zone_hover");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.target.classList.add("dnd_drop_zone_hover");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.target.classList.remove("dnd_drop_zone_hover");
  }

  const handleDragEnd = (e) => {
      
  }

  const bindNewsLetterElemEvents = () => {
    // Last Highlighted Text
    let highlightable_elems = document.getElementsByClassName("nl-highlightable-text");
    Array.from(highlightable_elems).forEach(each=>{
      each.addEventListener('mouseup', (event) => {
          textHighlightEvent(event);
      });
    });

    // Last focused Element
    let focusable_elems = document.getElementsByClassName("nl-focusable-text");
    Array.from(focusable_elems).forEach(each=>{
      each.addEventListener('focus', (event) => {
          textFocusEvent(event);
      }, true);
    });

    let focusable_container_elems = document.getElementsByClassName("nl-focusable-container-elem");
    Array.from(focusable_container_elems).forEach(each=>{
      each.addEventListener('focus', (event) => {
          containerFocusEvent(event);
      }, true);

      let focusable_icon_container_elems = document.getElementsByClassName("nl-focusable-icon-container-elem");
      Array.from(focusable_icon_container_elems).forEach(each=>{
          each.addEventListener('focus', (event) => {
              // Get the computed style of the element
              const computedStyle = window.getComputedStyle(event.target);
              setlastFocusedIcon(event.target);
              setCurrentElemToolsState({
                  ...currentElemToolsState,
                  textColor: rgbToHex(computedStyle.color),
              });
          }, true);
      });
    });
  }

  const applyNewsLetterChanges = () => {
    let __page = "";
    if(document.getElementById("news_letter_current_editable_page")){
      __page=document.getElementById("news_letter_current_editable_page").innerHTML;
      //let _cloned=cloneElement(currentDesign?.editable_react_version);
      if(__page){
        let __history=[...currentDesign?.changes_history, __page];
        setCurrentDesign({
            ...currentDesign,
            string_snap_shot: __page,
            changes_history: __history,
        });
      }
    }
  }

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [ currentDesign, setCurrentDesign ] = useState({
    db_obj: {},
    string_snap_shot: "",
    changes_history: [],
    redo_changes_stack: [],
    background_image: "",
    current_template: "classicletter",
  });

  useEffect(()=>{

    if(lastRange){

        let treeWalker = document.createTreeWalker(
            lastRange.commonAncestorContainer,
            global.NodeFilter.SHOW_ELEMENT,
            null,
            false
        );

        let node;
        while ((node = treeWalker.nextNode())) {
            // Todo add other styling resets...
            node.style.background="none";//e.target.value;
            node.style.fontWeight="inherit";
            node.style.fontSize="inherit";
            node.style.fontFamily="inherit";
            node.style.textDecoration="inherit";
            node.style.fontStyle="inherit";
            //node.style.textDecoration="none";
        }

        if(newSettingsSpan){
            newSettingsSpan.contentEditable=true;
            newSettingsSpan.tabIndex="-1";
            newSettingsSpan.classList.add('highlighted');
            newSettingsSpan.style.fontFamily= (newSettingsSpan.style.fontFamily || "inherit");
            newSettingsSpan.appendChild(lastRange.extractContents());
        }

        lastRange.insertNode(newSettingsSpan);
    }

  }, [newSettingsSpan]);

  useEffect(()=>{
    if(newSettingsSpan)
        newSettingsSpan.classList.remove('highlighted');
    setlastFocusedIcon(null);
  }, [lastRange]);

  useEffect(()=>{
    setTimeout(()=>{

      /*setCurrentElemToolsState({
          ...currentElemToolsState,
          background_image: HERO_BG
      });*/
      bindNewsLetterElemEvents();

    }, 1500);
    /*setTimeout(()=>{
        // Initial Save
        onSave();
    }, 2000);*/
  }, [currentDesign]);

  useEffect(()=>{
    // Verify Login Here
    (async()=>{
      if(localStorage.getItem("user_token")){
        // Verify Token
        let res = await verifyUserToken();
        if(res.valid){
          setIsLoggedIn(true);
          let usr = await fetchAccountInfo();
          if(usr?.pages_can_access_info){
            usr.pages_can_access_constants = usr?.pages_can_access_info?.map(each=>each?.constant);
            usr.resources_can_access_constants = usr?.resources_can_access_info?.map(each=>each?.constant);
            usr.resources_can_access_actions_constants = usr?.resources_can_access_actions_info?.map(each=>each?.constant);
          }
          setUserDetails(usr);
          const __ns_res=await fetchNewsLetterStateByAgentAndTemplateName(usr?._id, "classicletter");
          let nl_init_template=__ns_res?.saved_state;
          if(!nl_init_template){
            nl_init_template = NewsLetterPreviewerClassicLetter({
              userDetails: usr,
              isEditMode: true,
              currentElemToolsState,
            });
          }
          setCurrentDesign({
            ...currentDesign,
            db_obj: __ns_res,
            string_snap_shot: nl_init_template,
            changes_history: [nl_init_template],
          });
          setIsLoading(false);
          setTimeout(()=>{
            dashboardInits();
          }, 300);
        }else{
          localStorage.removeItem("user_token");
          setIsLoading(false);
        }
      }else{
        setIsLoading(false);
      }
    })();

    window.handleDrop=handleDrop;
    window.handleDragOver=handleDragOver;
    window.handleDragLeave=handleDragLeave;
    window.handleDragEnd=handleDragEnd;
    window.removeElement=removeElement;
  }, []);

  return (
    <div className="App">
      {
        (!isLoading) &&
        (
          loggedIn ?
            (
              !userDetails?.make_new_password ?
              <Dashboard 
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                currentDesign={currentDesign}
                setCurrentDesign={setCurrentDesign}
                handleDragStart={handleDragStart}
                removeElement={removeElement}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDragEnd={handleDragEnd}
                containerFocusEvent={containerFocusEvent}
                textFocusEvent={textFocusEvent}
                textHighlightEvent={textHighlightEvent}
                lastSelection={lastSelection}
                setLastSelection={setLastSelection}
                lastRange={lastRange} 
                setLastRange={setLastRange}
                lastFocusedElement={lastFocusedElement} 
                setLastFocusedElement={setLastFocusedElement}
                newSettingsSpan={newSettingsSpan} 
                setNewSettingsSpan={setNewSettingsSpan}
                lastFocusedIcon={lastFocusedIcon} 
                setlastFocusedIcon={setlastFocusedIcon}
                currentElemToolsState={currentElemToolsState} 
                setCurrentElemToolsState={setCurrentElemToolsState}
                bindNewsLetterElemEvents={bindNewsLetterElemEvents}
                applyNewsLetterChanges={applyNewsLetterChanges}
              /> : 
              <CreatePasswordPage 
                userDetails={userDetails}
                setUserDetails={setUserDetails}
              />
            ) :
            <LoginPage />
        )
      }
      {
        isLoading && <FullPageLoader />
      }
    </div>
  );
}

export default App;
