import LOGO_PLACEHOLDER from "../LOGO_PLACEHOLDER.jpg";
import HERO_BG from "../tour-img.svg";
import NewsLetter1 from "../newsLetter1.png";
import { useEffect, useState } from "react";
import { fonts } from "../helpers/fonts";

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

    const [currentDesign, setCurrentDesign] = useState({
        default_theme: {},
        hero_background: ""
    });
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
    });
    const [ lastSelection, setLastSelection ] = useState(null)
    const [ lastRange, setLastRange ] = useState(null);
    const [ lastFocusedElement, setLastFocusedElement ] = useState(null);

    useEffect(()=>{
        setTimeout(()=>{
            setCurrentDesign({
                ...currentDesign,
                //hero_background: HERO_BG
            });
            
            // Last Highlighted Text
            let highlightable_elems = document.getElementsByClassName("nl-highlightable-text");
            Array.from(highlightable_elems).forEach(each=>{
                each.addEventListener('mouseup', (event) => {
                    let selection = window.getSelection();
                    setLastSelection(selection)
                    if (selection.rangeCount > 0) {
                        setLastRange(selection.getRangeAt(0));
                    }
                    const computedStyle = window.getComputedStyle(event.target);
                    console.log(computedStyle)
                    setCurrentElemToolsState({
                        ...currentElemToolsState,
                        textColor: rgbToHex(computedStyle.color),
                        isBold: (parseInt(computedStyle.fontWeight) > 500),
                        isItalic: (computedStyle.fontStyle==="italic"),
                        isUnderline: (computedStyle.textDecoration.includes("none solid")),
                        font: (computedStyle.fontFamily),
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
                        fontSize: parseInt((computedStyle.fontSize).replaceAll("px","")),
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
    }

    const toolsHighlightColorOnInput = (e) => {
        e.preventDefault();
        setCurrentElemToolsState({
            ...currentElemToolsState,
            highlightColor: e.target.value
        });
    }

    const toolsHighlightColorOnSet = (e) => {
        e.preventDefault();
        const span = document.createElement('span');
        span.contentEditable=true;
        span.tabIndex="-1";
        span.style.backgroundColor=currentElemToolsState?.highlightColor;
        
        const treeWalker = document.createTreeWalker(
            lastRange.commonAncestorContainer,
            global.NodeFilter.SHOW_ELEMENT,
            null,
            false
        );
        
        let node;
        while ((node = treeWalker.nextNode())) {
            node.style.backgroundColor=currentElemToolsState?.highlightColor;
        }

        span.appendChild(lastRange.extractContents());
        lastRange.insertNode(span);
        //lastRange.surroundContents(span);
    }

    const toolsTextColorOnSet = () => {
        const span = document.createElement('span');
        span.contentEditable=true;
        span.tabIndex="-1";
        span.style.color=currentElemToolsState?.textColor;
        
        const treeWalker = document.createTreeWalker(
            lastRange.commonAncestorContainer,
            global.NodeFilter.SHOW_ELEMENT,
            null,
            false
        );
        
        let node;
        while ((node = treeWalker.nextNode())) {
            node.style.color=currentElemToolsState?.textColor;
        }

        span.appendChild(lastRange.extractContents());
        lastRange.insertNode(span);
        //lastRange.surroundContents(span);
    }

    const getHighlightedText = () => {
        const selection = window.getSelection();
        alert(selection);
        return selection.toString();
    }

    const boldTextOnClick = () => {
        //lastFocusedElement.style.fontWeight="bolder";
        const span = document.createElement('span');
        span.contentEditable=true;
        span.tabIndex="-1";
        span.style.fontWeight="bolder";
        span.appendChild(lastRange.extractContents());
        lastRange.insertNode(span);
        //lastRange.surroundContents(span);
        setCurrentElemToolsState({
            ...currentElemToolsState,
            isBold: true,
        });
        /*
            span.style.color = 'black';
            span.style.fontStyle = 'italic';
        */
        
        //lastSelection.removeAllRanges(); // Clear selection
    }

    const underlineTextOnClick = () => {
        const span = document.createElement('span');
        span.contentEditable=true;
        span.tabIndex="-1";
        span.style.textDecoration="underline";
        span.appendChild(lastRange.extractContents());
        lastRange.insertNode(span);
        setCurrentElemToolsState({
            ...currentElemToolsState,
            isUnderline: true,
        });
    }

    const italizeTextOnClick = () => {
        const span = document.createElement('span');
        span.contentEditable=true;
        span.tabIndex="-1";
        span.style.fontStyle="italic";
        span.appendChild(lastRange.extractContents());
        lastRange.insertNode(span);
        setCurrentElemToolsState({
            ...currentElemToolsState,
            isItalic: true,
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
        if(lastFocusedElement)
            lastFocusedElement.style.fontSize=(e.target.value+"px");
        //lastRange.surroundContents(span);
    }

    const incrementFont = () => {
        const __size = (currentElemToolsState?.fontSize+1);
        setCurrentElemToolsState({
            ...currentElemToolsState,
            fontSize: __size
        });
        if(lastFocusedElement)
            lastFocusedElement.style.fontSize=(__size+"px");
    }

    const decrementFont = () => {
        const __size = (currentElemToolsState?.fontSize-1);
        setCurrentElemToolsState({
            ...currentElemToolsState,
            fontSize: __size
        });
        if(lastFocusedElement)
            lastFocusedElement.style.fontSize=(__size+"px");
    }

    const buttonUrlOnInput = (e) => {
        setCurrentElemToolsState({
            ...currentElemToolsState,
            buttonElemUrl: e.target.value
        });
    }

    const fontOnInput = (e) => {
        setCurrentElemToolsState({
            ...currentElemToolsState,
            fontFamily: e.target.value
        });
        if(lastFocusedElement)
            lastFocusedElement.style.fontFamily=e.target.value;
    }

    return <div style={{background: "white", padding: 5, borderRadius: 9}}>
        {
            isEditMode &&
            <div className="nl-editor-top-tools-container" style={{display: "flex", justifyContent: "center", alignItems: "center", background: "rgb(237, 237, 237)"}}>
                <div style={{display: "flex", borderRight: "1px solid rgba(0,0,0,0.1)", marginRight: 10, paddingRight: 10}}>
                    <div disabled style={{padding: 10, borderRadius: 4}} className="tool-tip-parent">
                        <i className="fa-solid fa-floppy-disk"></i>
                        <div className="tool-tip"
                            style={{color: "black", background: "white", fontSize: 12, minWidth: 80, textAlign: "center"}}>
                            Save Changes
                        </div>
                    </div>
                    <div disabled style={{padding: 10, borderRadius: 4}} className="tool-tip-parent">
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
                            <p onClick={toolsTextColorOnSet} style={{position: "relative", zIndex: 1}}>
                                <i className="fa-solid fa-a"></i>
                            </p>
                        </label>
                        <p style={{marginTop: -10}}>
                            <input onBlur={toolsTextColorOnSet}
                                onInput={toolsTextColorOnchange}
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
                        <p onClick={toolsHighlightColorOnSet} style={{position: "relative", zIndex: 1}}>
                            <i className="fa-solid fa-highlighter"></i>
                        </p>
                        <p style={{marginTop: -10}}>
                            <input onBlur={toolsHighlightColorOnSet}
                                onInput={toolsHighlightColorOnInput}
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
                <div style={{width: "calc(100% - 650px)", background: "rgba(0,0,0,0.07)"}}>
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
            <div style={{maxWidth: 650, background: "rgba(0,0,0,0.07)", borderLeft: isEditMode ? "1px solid rgba(0, 0, 0, 0.1)" : "none"}}>
                <table style={{width: "100%", borderSpacing: 0, backgroundColor: "white"}}>
                    <tbody>
                        <tr>
                            <td>
                                <div className="nl-focusable-container-elem" tabIndex="-1" style={{background: "black", padding: 10}}>
                                    <p className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{color: "white", fontSize: 13, textAlign: "center"}}>
                                        Sed ut perspiciatis unde omnis iste natus error?</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="nl-focusable-container-elem" tabIndex="-1" style={{display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgb(133, 193, 239)", padding: "25px 20px"}}>
                                    <img style={{height: 40, marginRight: 10}} src={LOGO_PLACEHOLDER} />
                                    <h3 className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode}>
                                        Company Name
                                    </h3>
                                </div>
                                <div className="nl-focusable-container-elem" tabIndex="-1" style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: "crimson"}}>
                                    <p className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode} style={{margin: "0 15px", color: "white"}}>
                                        Text Examp</p>
                                    <p className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode} style={{margin: "0 15px", color: "white"}}>
                                        Text Examp</p>
                                    <p className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode} style={{margin: "0 15px", color: "white"}}>
                                        Text Examp</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{backgroundImage: `url('${currentDesign?.hero_background}')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", 
                                        borderBottomLeftRadius: 50, borderBottomRightRadius: 50, overflow: "hidden", height: 400}}>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{padding: 20}}>
                                    <h1 className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{fontSize: 33, fontWeight: "bolder", textAlign: "center"}}>
                                        Travel Safe!</h1>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{padding: 10}}>
                                    <p className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{textAlign: "center"}}>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                                    </p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>
                                    <div className="nl-focusable-container-elem nl-button-container" tabIndex="-1" contentEditable={isEditMode} style={{cursor: "pointer", width: 300, margin: "auto", backgroundColor: "black", color: "white", borderRadius: 50, padding: 20, textAlign: "center"}}>
                                        Book Now
                                        <div className="nl-button-settings-container">
                                            <p style={{fontSize: 13, color: "black", textAlign: "left"}}>
                                                <i style={{marginRight: 5}} className="fa-solid fa-globe"></i>
                                                Edit Button Link:</p>
                                            <div>
                                                <input onInput={buttonUrlOnInput}
                                                    style={{marginTop: 5, border: "none", backgroundColor: "rgba(0,0,0,0.07)", minWidth: 300, padding: 10, borderRadius: 50}} 
                                                    value={currentElemToolsState?.buttonElemUrl} 
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{padding: 10, marginTop: 10}}>
                                    <h3 className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{textAlign: "center", color: "crimson", fontWeight: "bolder", marginBottom: 10}}>
                                        Important Notice
                                    </h3>
                                    <p className="nl-highlightable-text nl-focusable-text" tabIndex="-1" contentEditable={isEditMode} style={{textAlign: "center", color: "red"}}>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium t voluptatem accusantium doloremque
                                    </p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div tabIndex="-1" className="nl-focusable-container-elem" style={{background: "skyblue", padding: "30px 10px", marginTop: 20}}>
                                    <p style={{textAlign: "center"}}>
                                        <i style={{marginRight: 10}} className="fa-solid fa-envelope"></i>
                                        <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                            youremail@server.com
                                        </span>
                                    </p>
                                    <p style={{textAlign: "center", marginTop: 5}}>
                                        <i style={{marginRight: 10}} className="fa-solid fa-phone"></i>
                                        <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                            +1 234 322 3433
                                        </span>
                                    </p>
                                    <p style={{textAlign: "center", marginTop: 5}}>
                                        <i style={{marginRight: 10}} className="fa-solid fa-globe"></i>
                                        <span className="nl-highlightable-text" tabIndex="-1" contentEditable={isEditMode}>
                                            https://yourwebsite.com
                                        </span>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

}

export default NewsLetterEditor;