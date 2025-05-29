import HERO_BG from "../tour-img.svg";
import NewsLetter1 from "../newsLetter1.png";
import { cloneElement, useEffect, useState } from "react";
import { fonts } from "../helpers/fonts";
import NewsLetterPreviewer from "./NewsLetterPreviewer";
import { event } from "jquery";

function rgbToHex(rgb_string) {
    //"rgb(255,255,255)"
    let __proper = rgb_string.replaceAll("rgb(","").replaceAll(")","");
    __proper=__proper.split(",");
    let r=parseInt(__proper[0].trim());
    let g=parseInt(__proper[1].trim());
    let b=parseInt(__proper[2].trim());
  const toHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return "#" + toHex(r) + toHex(g) + toHex(b);
}

const NewsLetterEditor = (props) => {

    const {
        isEditMode
    } = props;

    const buttonUrlOnInput = (e) => {
        setCurrentElemToolsState({
            ...currentElemToolsState,
            buttonElemUrl: e.target.value
        });
    }

    const [ currentElemToolsState, setCurrentElemToolsState ] = useState({
        isBold: false,
        isItalic: false,
        isUnderline: false,
        isHighlighted: false,
        highlightColor: "#FFF700",
        textAlign: "",
        fontSize: 11,
        textColor: "",
        font: fonts[0],
        containerBackground: "",
        buttonElemUrl: "https://yourwebsiteurl.com",
        currentElem: null,
        hero_background: "",
    });
    const [ lastSelection, setLastSelection ] = useState(null);
    const [ lastRange, setLastRange ] = useState(null);
    const [ lastFocusedElement, setLastFocusedElement ] = useState(null);
    const [ newSettingsSpan, setNewSettingsSpan ] = useState(null);
    const [currentDesign, setCurrentDesign] = useState({
        editable_react_version: <NewsLetterPreviewer 
                                    isEditMode={isEditMode}
                                    currentElemToolsState={currentElemToolsState}
                                    buttonUrlOnInput={buttonUrlOnInput}
                                />,
        string_snap_shot: "",
        changes_history: [

        ],
        hero_background: ""
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
            }

            newSettingsSpan.contentEditable=true;
            newSettingsSpan.tabIndex="-1";
            newSettingsSpan.classList.add('highlighted');

            newSettingsSpan.appendChild(lastRange.extractContents());
            lastRange.insertNode(newSettingsSpan);
        }

    }, [newSettingsSpan]);

    useEffect(()=>{
        if(newSettingsSpan)
            newSettingsSpan.classList.remove('highlighted');
    }, [lastRange]);

    useEffect(()=>{
        setTimeout(()=>{

            setCurrentElemToolsState({
                ...currentElemToolsState,
                //hero_background: HERO_BG
            });

            // Last Highlighted Text
            let highlightable_elems = document.getElementsByClassName("nl-highlightable-text");
            Array.from(highlightable_elems).forEach(each=>{
                each.addEventListener('mouseup', (event) => {
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
                        isUnderline: (computedStyle.textDecoration.includes("none solid")),
                        font: (computedStyle.fontFamily),
                        fontSize: parseInt((computedStyle.fontSize).replaceAll("px","")),
                    });
                    
                });
            });

            // Last focused Element
            let focusable_elems = document.getElementsByClassName("nl-focusable-text");
            Array.from(focusable_elems).forEach(each=>{
                each.addEventListener('focus', (event) => {
                    // Get the computed style of the element
                    const computedStyle = window.getComputedStyle(event.target);
                    setLastFocusedElement(event.target);
                    setCurrentElemToolsState({
                        ...currentElemToolsState,
                        //fontSize: parseInt((computedStyle.fontSize).replaceAll("px","")),
                    });
                }, true);
            });

            let focusable_container_elems = document.getElementsByClassName("nl-focusable-container-elem");
            Array.from(focusable_container_elems).forEach(each=>{
                each.addEventListener('focus', (event) => {
                    // Get the computed style of the element
                    const computedStyle = window.getComputedStyle(event.target);
                    setLastFocusedElement(event.target);
                    setCurrentElemToolsState({
                        ...currentElemToolsState,
                        containerBackground: rgbToHex(computedStyle.backgroundColor)
                    });
                }, true);
            });

        }, 1500);
        setTimeout(()=>{
            // Initial Save
            onSave();
        }, 2000);
    }, []);

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

    const toolsBackgroundColorOnInput = (e) => {
        e.preventDefault();
        setCurrentElemToolsState({
            ...currentElemToolsState,
            containerBackground: e.target.value
        });
        if(lastFocusedElement)
            lastFocusedElement.style.backgroundColor=e.target.value;
    }

    const toolsTextColorOnchange = (e) => {
        setCurrentElemToolsState({
            ...currentElemToolsState,
            textColor: e.target.value
        });
        newSettingsSpan.style.color=e.target.value;
    }

    const toolsHighlightColorOnInput = (e) => {
        e.preventDefault();
        setCurrentElemToolsState({
            ...currentElemToolsState,
            highlightColor: e.target.value
        });
        
        newSettingsSpan.style.backgroundColor=e.target.value;
        //lastRange.surroundContents(span);
    }

    const getHighlightedText = () => {
        const selection = window.getSelection();
        alert(selection);
        return selection.toString();
    }

    const boldTextOnClick = () => {

        let fontWeight="";
        let _bool=false;
        if(currentElemToolsState.isBold){
            fontWeight="initial";
            _bool=false;
        }else{
            fontWeight="bolder";
            _bool=true;
        }
        newSettingsSpan.style.fontWeight=fontWeight;
        setCurrentElemToolsState({
            ...currentElemToolsState,
            isBold: _bool,
        });
        //lastSelection.removeAllRanges(); // Clear selection
    }

    const underlineTextOnClick = () => {
        newSettingsSpan.style.textDecoration="underline";
        setCurrentElemToolsState({
            ...currentElemToolsState,
            isUnderline: true,
        });
    }

    const italizeTextOnClick = () => {
        let fontStyle="initial";
        let _bool=false;
        if(currentElemToolsState.isItalic){
            fontStyle="initial";
            _bool=false;
        }else{
            fontStyle="italic";
            _bool=true;
        }
        newSettingsSpan.style.fontStyle=fontStyle;
        //newSettingsSpan.classList.remove('highlighted');
        setCurrentElemToolsState({
            ...currentElemToolsState,
            isItalic: _bool,
        });
    }

    const alignTextOnclick = (type=1) => {
        // 1 => left, 2 => center, 3 => right, 4 => justify
        if(type===1){
            if(lastFocusedElement)
                lastFocusedElement.style.textAlign="left";
            setCurrentElemToolsState({
                ...currentElemToolsState,
                textAlign: "left"
            });
        }else if(type===2){
            if(lastFocusedElement)
                lastFocusedElement.style.textAlign="center";
            setCurrentElemToolsState({
                ...currentElemToolsState,
                textAlign: "center"
            });
        }else if(type===3){
            if(lastFocusedElement)
                lastFocusedElement.style.textAlign="right";
            setCurrentElemToolsState({
                ...currentElemToolsState,
                textAlign: "right"
            });
        }else if(type===4){
            if(lastFocusedElement)
                lastFocusedElement.style.textAlign="justify";
            setCurrentElemToolsState({
                ...currentElemToolsState,
                textAlign: "justify"
            });
        }

    }

    const fontSizeOnInput = (e) => {
        setCurrentElemToolsState({
            ...currentElemToolsState,
            fontSize: e.target.value
        });
        if(newSettingsSpan)
            newSettingsSpan.style.fontSize=(e.target.value+"px");
        //lastRange.surroundContents(span);
    }

    const incrementFont = () => {
        const __size = (currentElemToolsState?.fontSize+1);
        setCurrentElemToolsState({
            ...currentElemToolsState,
            fontSize: __size
        });
        if(newSettingsSpan)
            newSettingsSpan.style.fontSize=(__size+"px");
    }

    const decrementFont = () => {
        const __size = (currentElemToolsState?.fontSize-1);
        setCurrentElemToolsState({
            ...currentElemToolsState,
            fontSize: __size
        });
        if(newSettingsSpan)
            newSettingsSpan.style.fontSize=(__size+"px");
    }

    const fontOnInput = (e) => {
        setCurrentElemToolsState({
            ...currentElemToolsState,
            fontFamily: e.target.value
        });
        if(newSettingsSpan)
            newSettingsSpan.style.fontFamily=e.target.value;
    }

    const onSave = () => {
        let __page = document.getElementById("news_letter_current_editable_page").innerHTML;
        let _cloned=cloneElement(currentDesign?.editable_react_version);
        let __history=[...currentDesign?.changes_history, _cloned];
        console.log(_cloned);
        setCurrentDesign({
            ...currentDesign,
            string_snap_shot: __page,
            changes_history: __history,
        });
    }

    const unDo = () => {
        let __history = currentDesign?.changes_history;
        let __page = __history.pop();
        console.log(__page)
        if(__page){
            setCurrentDesign({
                ...currentDesign,
                editable_react_version: __page, //<div dangerouslySetInnerHTML={{ __html: __page }} />,
                string_snap_shot: __page,
                changes_history: __history,
            });
        }
    }

    return <div style={{background: "white", padding: 5, borderRadius: 9}}>
        {
            isEditMode &&
            <div className="nl-editor-top-tools-container" style={{display: "flex", justifyContent: "center", alignItems: "center", background: "rgb(237, 237, 237)"}}>
                <div style={{display: "flex", borderRight: "1px solid rgba(0,0,0,0.1)", marginRight: 10, paddingRight: 10}}>
                    <div onClick={onSave} disabled style={{padding: 10, borderRadius: 4}} className="tool-tip-parent">
                        <i className="fa-solid fa-floppy-disk"></i>
                        <div className="tool-tip"
                            style={{color: "black", background: "white", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                            Save Changes
                        </div>
                    </div>
                    <div onClick={unDo} disabled style={{padding: 10, borderRadius: 4}} className="tool-tip-parent">
                        <i className="fa-solid fa-rotate-left"></i>
                        <div className="tool-tip"
                            style={{color: "black", background: "white", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                            Undo Changes
                        </div>
                    </div>
                    <div disabled style={{padding: 10, borderRadius: 4}} className="tool-tip-parent">
                        <i className="fa-solid fa-rotate-right"></i>
                        <div className="tool-tip"
                            style={{color: "black", background: "white", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                            Redo Changes
                        </div>
                    </div>
                </div>
                <div disabled onClick={boldTextOnClick}  style={{padding: 10, borderRadius: 4, background: currentElemToolsState?.isBold ? "rgba(0,0,0,0.07)" : "none"}} className="tool-tip-parent">
                    <i className="fa-solid fa-bold"></i>
                    <div className="tool-tip"
                        style={{color: "black", background: "white", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                        Bold Text
                    </div>
                </div>
                <div disabled onClick={italizeTextOnClick} style={{padding: 10, borderRadius: 4, background: currentElemToolsState?.isItalic ? "rgba(0,0,0,0.07)" : "none"}} className="tool-tip-parent">
                    <i className="fa-solid fa-italic"></i>
                    <div className="tool-tip"
                        style={{color: "black", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                        Italize Text
                    </div>
                </div>
                <div disabled onClick={underlineTextOnClick} style={{padding: 10, borderRadius: 4, background: currentElemToolsState?.isUnderline ? "rgba(0,0,0,0.07)" : "none"}} className="tool-tip-parent">
                    <i className="fa-solid fa-underline"></i>
                    <div className="tool-tip"
                        style={{color: "black", fontSize: 12, minWidth: 100, textAlign: "center"}}>
                        Underline Text
                    </div>
                </div>
                <div style={{width: 40}} className="tool-tip-parent">
                    <div style={{textAlign: "center"}}>
                        <label htmlFor="nl_editor_text_color_input">
                            <p style={{position: "relative", zIndex: 1}}>
                                <i className="fa-solid fa-a"></i>
                            </p>
                        </label>
                        <p style={{marginTop: -10}}>
                            <input onInput={toolsTextColorOnchange}
                                id="nl_editor_text_color_input"
                                type="color" name="toolsColor" 
                                value={currentElemToolsState?.textColor} 
                                style={{height: 5, border: "none", padding: 0, margin: "auto", width: 30}}
                            />
                        </p>
                    </div>
                    <div className="tool-tip"
                        style={{color: "black", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                        Text Color
                    </div>
                </div>
                <div style={{padding: 10, textAlign: "center"}} className="tool-tip-parent">
                        <label htmlFor="nl_editor_highlighter_color_input">
                            <p style={{position: "relative", zIndex: 1}}>
                                <i className="fa-solid fa-highlighter"></i>
                            </p>
                        </label>
                        <p style={{marginTop: -10}}>
                            <input onInput={toolsHighlightColorOnInput}
                                id="nl_editor_highlighter_color_input"
                                type="color" name="toolsColor" 
                                value={currentElemToolsState?.highlightColor} 
                                style={{height: 5, border: "none", padding: 0, margin: "auto", width: 30}}
                            />
                        </p>
                    <div className="tool-tip"
                        style={{color: "black", fontSize: 12, minWidth: 100, textAlign: "center"}}>
                        Text Highlight
                    </div>
                </div>
                <div className="tool-tip-parent" style={{display: "flex", alignItems: "center", borderLeft: "1px solid rgba(0,0,0,0.1)", marginLeft: 10, marginRight: 10, padding: "0 10px"}}>
                    <div onClick={decrementFont} style={{marginRight: 10}}>
                        <i className="fa-solid fa-minus"></i>
                    </div>
                    <input onInput={fontSizeOnInput}
                        value={currentElemToolsState?.fontSize} 
                        type="number"
                        style={{padding: 5, width: 60, textAlign: "center"}} />
                    <div onClick={incrementFont} style={{marginLeft: 10}}>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <div className="tool-tip"
                        style={{color: "black", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                        Font Size
                    </div>
                </div>
                <div className="tool-tip-parent" style={{display: "flex", borderLeft: "1px solid rgba(0,0,0,0.1)", marginLeft: 10, marginRight: 10, padding: "0 10px"}}>
                    <select onInput={fontOnInput}
                        style={{border: "none", background: "none", padding: 10}}>
                        {
                            fonts?.map(each=>{
                                return <option value={each}>
                                        {each}</option>
                            })
                            
                        }
                    </select>
                    <div className="tool-tip"
                        style={{color: "black", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                        Font
                    </div>
                </div>
                <div style={{display: "flex", borderLeft: "1px solid rgba(0,0,0,0.1)", marginLeft: 10, marginRight: 10, padding: "0 10px"}}>
                    <div onClick={()=>alignTextOnclick(1)} className="tool-tip-parent" style={{padding: 5}}>
                        <i className="fa-solid fa-align-left"></i>
                        <div className="tool-tip"
                            style={{color: "black", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                            Align Left
                        </div>
                    </div>
                    <div onClick={()=>alignTextOnclick(2)} className="tool-tip-parent" style={{padding: 5}}>
                        <i className="fa-solid fa-align-center"></i>
                        <div className="tool-tip"
                            style={{color: "black", fontSize: 12, minWidth: 90, textAlign: "center"}}>
                            Align Center
                        </div>
                    </div>
                    <div onClick={()=>alignTextOnclick(3)} className="tool-tip-parent" style={{padding: 5}}>
                        <i className="fa-solid fa-align-right"></i>
                        <div className="tool-tip"
                            style={{color: "black", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                            Align Right
                        </div>
                    </div>
                    <div onClick={()=>alignTextOnclick(4)} className="tool-tip-parent" style={{padding: 5}}>
                        <i className="fa-solid fa-align-justify"></i>
                        <div className="tool-tip"
                            style={{color: "black", fontSize: 12, minWidth: 90, textAlign: "center"}}>
                            Align Justify
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", alignItems: "center", borderLeft: "1px solid rgba(0,0,0,0.1)", marginRight: 10, padding: "0 10px"}}>
                    <p style={{marginRight: 10, fontSize: 11}}>
                        <label htmlFor="nl_editor_container_background_input" 
                            style={{color: "rgba(0,0,0,0.4"}}>
                            Background:</label>
                    </p>
                    <input id="nl_editor_container_background_input"
                        onInput={toolsBackgroundColorOnInput}
                        type="color" name="favcolor" 
                        value={currentElemToolsState?.containerBackground} />
                </div>
            </div>
        }
        <div style={{display: "flex", justifyContent: "center"}}>
            {
                isEditMode &&
                <div style={{width: "calc(100% - 750px)", background: "rgba(0,0,0,0.07)"}}>
                    <h1 style={{margin: 15, maxWidth: 200, color: "rgb(110, 0, 97)", display: "none"}}>
                        Pick a Template to Design Your News Letter!</h1>
                    <div style={{display: "flex", backgroundColor: "rgb(69, 0, 61)", justifyContent: "center"}}>
                        <p style={{padding: 15, fontSize: 13, cursor: "pointer", color: "yellow", textDecoration: "underline"}}>
                            All Categories
                        </p>
                        <p style={{padding: 15, fontSize: 13, cursor: "pointer", color: "white"}}>
                            Category 1
                        </p>
                        <p style={{padding: 15, fontSize: 13, cursor: "pointer", color: "white"}}>
                            Category 2
                        </p>
                        <p style={{padding: 15, fontSize: 13, cursor: "pointer", color: "white"}}>
                            Category 3
                        </p>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", padding: 3}}>
                        <div style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NewsLetter1}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                <div style={{backgroundColor: "green", color: "white", top: 0, right: 0, borderRadius: "100%", position: "absolute", width: 25, height: 25, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <i className="fa-solid fa-check"></i>
                                </div>
                            </div>
                        </div>
                        <div style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NewsLetter1}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                
                            </div>
                        </div>
                        <div style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NewsLetter1}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                
                            </div>
                        </div>
                        <div style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NewsLetter1}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                
                            </div>
                        </div>
                        <div style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NewsLetter1}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                
                            </div>
                        </div>
                        <div style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NewsLetter1}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                
                            </div>
                        </div>
                        <div style={{backgroundColor: "rgb(223, 229, 232)", margin: 2, width: "calc(33% - 3px)", padding: "10px 5px", borderRadius: 8}}>
                            <div style={{backgroundImage: `url('${NewsLetter1}')`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                                    cursor: "pointer", position: "relative", height: 250}}>
                                
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                !isEditMode &&
                <div style={{padding: 5}}>
                    <h1 style={{margin: 15, maxWidth: 200, color: "rgb(110, 0, 97)"}}>
                        Preview News Letter Before Send!</h1>
                    <div style={{marginTop: 10, textDecoration: "underline", cursor: "pointer"}}>
                        <i style={{marginRight: 10}} className="fa-solid fa-pencil"></i>
                        Got Back to Edit
                    </div>
                </div>
            }
            <div id="news_letter_current_editable_page" style={{maxWidth: 650, background: "rgba(0,0,0,0.07)", borderLeft: isEditMode ? "1px solid rgba(0, 0, 0, 0.1)" : "none"}}>
                {currentDesign?.editable_react_version}
            </div>
            {
                isEditMode &&
                <div style={{width: 150, padding: 10, textAlign: "center", backgroundColor: "rgb(55, 7, 49)"}}>
                    <p style={{fontSize: 13, padding: 10, color: "orange", textDecoration: "underline"}}>
                        Elements</p>
                    <div draggable style={{padding: 10, color: "white", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                        <p style={{fontSize: 13}}>
                            <i style={{marginRight: 10}} className="fa-solid fa-link"></i>
                            Button</p>
                    </div>
                    <div draggable style={{padding: 10, color: "white", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                        <p style={{fontSize: 13}}>
                            <i style={{marginRight: 10}} className="fa-solid fa-paragraph"></i>
                            Paragraph</p>
                    </div>
                    <div draggable style={{padding: 10, color: "white", borderBottom: "1px solid rgba(255,255,255,0.1)"}}>
                        <p style={{fontSize: 13}}>
                            <i style={{marginRight: 10}} className="fa-solid fa-heading"></i>
                            Heading</p>
                    </div>
                </div>
            }
        </div>
    </div>

}

export default NewsLetterEditor;